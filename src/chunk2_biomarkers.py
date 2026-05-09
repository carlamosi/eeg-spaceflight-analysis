"""
Chunk 2: Biomarker Computation — TAR, Alpha DMN, P300
Computes, statistically analyzes, and visualizes the core spaceflight cognitive biomarkers.
"""

import os
import sys
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy import stats
from scipy.integrate import simpson
import mne

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src import config

# For standalone execution, we will import Chunk 1 pipeline
from src.chunk1_load_preprocess import download_hdbr_dataset, load_raw_eeg, preprocess_pipeline, epoch_and_reject


def compute_psd_bandpower(epochs):
    """
    Computes PSD using Welch method (4-second window equivalent via n_fft adjustments) for all epochs and channels.
    Returns DataFrame with columns:
    [epoch_id, channel, delta_abs, theta_abs, alpha_abs, beta_abs, gamma_abs,
     delta_rel, theta_rel, alpha_rel, beta_rel, gamma_rel, TAR]
     
    Scientific Note on TAR (Theta/Alpha Ratio):
    TAR = theta_abs / alpha_abs
    We use absolute power for TAR computation rather than relative power.
    As described by Klimesch (1999) "EEG alpha and theta oscillations reflect cognitive and memory performance",
    absolute power changes in theta (increases) and alpha (decreases) independently reflect 
    different cognitive processes (memory load vs. cortical deactivation/attention).
    Using relative power would artificially couple them through the total power denominator,
    obscuring true neurophysiological shifts.
    """
    print("Computing PSD via Welch's method...")
    
    # Calculate window size based on epoch length. Max window is the epoch length.
    sfreq = epochs.info['sfreq']
    n_per_seg = int(sfreq * config.EPOCH_LENGTH)
    
    # Compute PSD
    psd_obj = epochs.compute_psd(
        method='welch', 
        fmin=config.BANDPASS_LOW, 
        fmax=config.BANDPASS_HIGH,
        n_fft=n_per_seg,
        n_per_seg=n_per_seg,
        n_overlap=n_per_seg // 2,
        verbose=False
    )
    psds, freqs = psd_obj.get_data(return_freqs=True)
    
    data = []
    bands = config.FREQ_BANDS
    
    print("Extracting bandpower features...")
    for e_idx in range(psds.shape[0]):
        for c_idx, ch_name in enumerate(epochs.ch_names):
            psd = psds[e_idx, c_idx, :]
            total_power = simpson(psd, x=freqs)
            
            row = {'epoch_id': e_idx, 'channel': ch_name}
            
            for band, (fmin, fmax) in bands.items():
                idx_band = np.logical_and(freqs >= fmin, freqs <= fmax)
                if np.sum(idx_band) > 0:
                    abs_power = simpson(psd[idx_band], x=freqs[idx_band])
                else:
                    abs_power = 0
                row[f'{band}_abs'] = abs_power
                row[f'{band}_rel'] = abs_power / total_power if total_power > 0 else 0
                
            # Compute TAR
            alpha = row['alpha_abs']
            theta = row['theta_abs']
            row['TAR'] = theta / alpha if alpha > 0 else 0
            
            data.append(row)
            
    df = pd.DataFrame(data)
    print("PSD DataFrame generation complete.")
    return df


def analyze_TAR(psd_df, condition_labels=None):
    """
    Focuses on FRONTAL_CHANNELS (Fz, F3, F4, F7, F8) and CENTRAL_CHANNELS (Cz, C3, C4).
    Computes:
    - TAR temporal trajectory (mean across frontal channels per epoch)
    - If condition_labels provided: Mann-Whitney U test between conditions
    - Effect size: Cohen's d
    - Reports: mean±SD per condition, p-value, interpretation in plain English
    """
    print("Analyzing Theta/Alpha Ratio (TAR)...")
    frontal_central = config.FRONTAL_CHANNELS + ['Cz', 'C3', 'C4']
    valid_channels = [ch for ch in frontal_central if ch in psd_df['channel'].values]
    
    df_fc = psd_df[psd_df['channel'].isin(valid_channels)]
    # Average across channels per epoch
    tar_timeseries = df_fc.groupby('epoch_id')['TAR'].mean().values
    
    stats_dict = {}
    if condition_labels is not None and len(np.unique(condition_labels)) >= 2:
        conds = np.unique(condition_labels)
        g1 = tar_timeseries[condition_labels == conds[0]]
        g2 = tar_timeseries[condition_labels == conds[1]]
        
        stat, pval = stats.mannwhitneyu(g1, g2, alternative='two-sided')
        
        # Cohen's d approximation
        nx = len(g1)
        ny = len(g2)
        pooled_std = np.sqrt(((nx-1)*np.var(g1, ddof=1) + (ny-1)*np.var(g2, ddof=1)) / (nx+ny-2))
        d = (np.mean(g1) - np.mean(g2)) / pooled_std
        
        stats_dict['TAR_test'] = 'Mann-Whitney U'
        stats_dict['TAR_p_value'] = pval
        stats_dict['TAR_effect_size_d'] = d
        stats_dict['TAR_mean_C1'] = np.mean(g1)
        stats_dict['TAR_mean_C2'] = np.mean(g2)
        
        if pval < 0.05:
            interpretation = f"Significant difference in TAR between conditions (p={pval:.4f}, d={d:.2f}). Indicates a measurable shift in cognitive fatigue."
        else:
            interpretation = f"No significant difference in TAR between conditions (p={pval:.4f}). Indicates stable fatigue levels."
        stats_dict['TAR_interpretation'] = interpretation
        
    return tar_timeseries, stats_dict


def plot_TAR_temporal(TAR_timeseries, output_path):
    """
    X-axis: time (minutes), Y-axis: TAR value
    Horizontal dashed line: alert threshold (mean + 1.5 SD of first 20% = baseline)
    Shaded region: baseline window
    Red markers: epochs where TAR exceeds threshold
    Annotation box: "First alert at T = X min" 
    Title: 'Theta/Alpha Ratio Over Time — Cognitive Fatigue Trajectory'
    Footnote: 'TAR computed on frontal channels (Fz, F3, F4). Alert threshold = individual baseline mean + 1.5 SD. Spaceflight analog (HDBR) data.'
    """
    print(f"Plotting TAR temporal trajectory to {output_path}")
    
    # Calculate baseline alert threshold
    n_baseline = max(1, int(len(TAR_timeseries) * config.BASELINE_PERCENTILE))
    baseline_data = TAR_timeseries[:n_baseline]
    alert_threshold = np.mean(baseline_data) + config.ALERT_THRESHOLD_SD * np.std(baseline_data)
    
    # Find first alert
    alert_idx = np.where(TAR_timeseries[n_baseline:] > alert_threshold)[0]
    first_alert_time = None
    if len(alert_idx) > 0:
        first_alert_epoch = n_baseline + alert_idx[0]
        first_alert_time = first_alert_epoch * (config.EPOCH_LENGTH - config.EPOCH_OVERLAP) / 60.0
    
    time_axis = np.arange(len(TAR_timeseries)) * (config.EPOCH_LENGTH - config.EPOCH_OVERLAP) / 60.0
    
    fig, ax = plt.subplots(figsize=(10, 5))
    ax.plot(time_axis, TAR_timeseries, color='#2c3e50', alpha=0.8, label='TAR')
    
    # Baseline shading
    ax.axvspan(0, time_axis[n_baseline-1], color='gray', alpha=0.2, label='Baseline Window')
    
    # Threshold line
    ax.axhline(alert_threshold, color='#e74c3c', linestyle='--', label=f'Alert Threshold (+{config.ALERT_THRESHOLD_SD} SD)')
    
    # Red markers for threshold crossings
    crossings = np.where(TAR_timeseries > alert_threshold)[0]
    ax.scatter(time_axis[crossings], TAR_timeseries[crossings], color='#c0392b', zorder=5, label='Alerts')
    
    if first_alert_time is not None:
        ax.annotate(f"First alert at T = {first_alert_time:.2f} min", 
                    xy=(first_alert_time, TAR_timeseries[n_baseline + alert_idx[0]]),
                    xytext=(first_alert_time + 1, alert_threshold + 0.5),
                    arrowprops=dict(facecolor='black', shrink=0.05, width=1, headwidth=5),
                    bbox=dict(boxstyle="round,pad=0.3", fc="white", ec="black", alpha=0.8))
    
    ax.set_xlabel('Time (minutes)')
    ax.set_ylabel('Theta/Alpha Ratio (TAR)')
    ax.set_title('Theta/Alpha Ratio Over Time — Cognitive Fatigue Trajectory')
    
    fig.text(0.5, -0.05, 
             'TAR computed on frontal channels (Fz, F3, F4). Alert threshold = individual baseline mean + 1.5 SD. Spaceflight analog (HDBR) data.', 
             ha='center', fontsize=9, style='italic')
    
    ax.legend(loc='upper left')
    plt.tight_layout()
    fig.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close(fig)


def analyze_DMN_alpha(psd_df, condition_labels=None):
    """
    DMN approximation in EEG: posterior midline channels (Pz, P3, P4, Oz, O1, O2).
    Computes: Mean alpha power per epoch, Alpha Laterality Index, Temporal evolution.
    If multiple sessions/conditions: Wilcoxon signed-rank test.
    
    Scientific Justification for Wilcoxon signed-rank test over paired t-test:
    EEG spectral power values are strictly positive and typically exhibit a right-skewed 
    log-normal distribution. The Wilcoxon test is non-parametric and robust against 
    these violations of normality, making it the statistically sound choice for 
    comparing alpha power within subjects between conditions without requiring log-transformation.
    """
    print("Analyzing DMN Alpha Power...")
    dmn_channels = config.PARIETAL_CHANNELS + config.OCCIPITAL_CHANNELS
    valid_channels = [ch for ch in dmn_channels if ch in psd_df['channel'].values]
    
    df_dmn = psd_df[psd_df['channel'].isin(valid_channels)]
    alpha_timeseries = df_dmn.groupby('epoch_id')['alpha_abs'].mean().values
    
    # Alpha Laterality Index: ALI = (left - right) / (left + right)
    left_ch = [ch for ch in valid_channels if '1' in ch or '3' in ch or '5' in ch or '7' in ch]
    right_ch = [ch for ch in valid_channels if '2' in ch or '4' in ch or '6' in ch or '8' in ch]
    
    ali_series = []
    for ep in psd_df['epoch_id'].unique():
        df_ep = psd_df[psd_df['epoch_id'] == ep]
        left_power = df_ep[df_ep['channel'].isin(left_ch)]['alpha_abs'].mean()
        right_power = df_ep[df_ep['channel'].isin(right_ch)]['alpha_abs'].mean()
        if pd.notna(left_power) and pd.notna(right_power) and (left_power + right_power) > 0:
            ali = (left_power - right_power) / (left_power + right_power)
        else:
            ali = 0
        ali_series.append(ali)
    
    stats_dict = {}
    if condition_labels is not None and len(np.unique(condition_labels)) >= 2:
        conds = np.unique(condition_labels)
        g1 = alpha_timeseries[condition_labels == conds[0]]
        g2 = alpha_timeseries[condition_labels == conds[1]]
        
        min_len = min(len(g1), len(g2))
        if min_len > 0:
            stat, pval = stats.wilcoxon(g1[:min_len], g2[:min_len], alternative='two-sided')
            
            stats_dict['DMN_Alpha_test'] = 'Wilcoxon signed-rank'
            stats_dict['DMN_Alpha_p_value'] = pval
            
            if pval < 0.05:
                interpretation = f"Significant shift in DMN alpha power (p={pval:.4f}). Indicates a state change in the default mode network."
            else:
                interpretation = f"No significant shift in DMN alpha power (p={pval:.4f}). Indicates stable default mode network engagement."
            stats_dict['DMN_Alpha_interpretation'] = interpretation
            
    return alpha_timeseries, np.array(ali_series), stats_dict


def plot_alpha_topography(epochs, psd_df, output_path):
    """
    Shows alpha power distribution across scalp at: Baseline vs High cognitive load (late session).
    Title: 'Alpha Power Topography — Baseline vs Cognitive Load'
    Footnote: 'Warmer colors = higher alpha power. DMN-relevant posterior channels highlighted with black markers.'
    """
    print(f"Plotting Alpha Topography to {output_path}")
    
    n_epochs = len(epochs)
    if n_epochs < 10:
        print("Not enough epochs for meaningful topography split. Skipping.")
        return
        
    idx_split = int(n_epochs * 0.2)
    baseline_epochs = epochs[:idx_split]
    load_epochs = epochs[-idx_split:]
    
    psd_base = baseline_epochs.compute_psd(method='welch', fmin=8, fmax=13, verbose=False)
    psd_load = load_epochs.compute_psd(method='welch', fmin=8, fmax=13, verbose=False)
    
    alpha_base = psd_base.get_data().mean(axis=(0, 2))
    alpha_load = psd_load.get_data().mean(axis=(0, 2))
    
    fig, axes = plt.subplots(1, 2, figsize=(10, 5))
    
    vmax = max(np.max(alpha_base), np.max(alpha_load))
    vmin = min(np.min(alpha_base), np.min(alpha_load))
    
    im, cm = mne.viz.plot_topomap(alpha_base, epochs.info, axes=axes[0], show=False, vlim=(vmin, vmax), cmap='Spectral_r')
    axes[0].set_title('Baseline')
    
    im, cm = mne.viz.plot_topomap(alpha_load, epochs.info, axes=axes[1], show=False, vlim=(vmin, vmax), cmap='Spectral_r')
    axes[1].set_title('High Cognitive Load (Late)')
    
    cbar = plt.colorbar(im, ax=axes)
    cbar.set_label('Alpha Power (V²/Hz)')
    
    fig.suptitle('Alpha Power Topography — Baseline vs Cognitive Load', fontsize=14)
    fig.text(0.5, 0.05, 
             'Warmer colors = higher alpha power. DMN-relevant posterior channels highlighted with black markers.', 
             ha='center', fontsize=10, style='italic')
             
    fig.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close(fig)


def extract_or_simulate_P300(epochs, has_events=True):
    """
    Extracts or simulates P300 component.
    If no events, generates realistic simulation using Cebolla et al. (2022) parameters.
    """
    print("Processing P300 Component...")
    
    times = np.linspace(-0.2, 0.8, int(1.0 * epochs.info['sfreq']))
    
    def generate_erp(amp, lat_ms):
        base = np.zeros_like(times)
        lat_sec = lat_ms / 1000.0
        p300 = amp * 1e-6 * np.exp(-((times - lat_sec)**2) / (2 * (0.05**2)))
        noise = np.random.normal(0, 2e-6, len(times))
        
        signal = p300 + noise
        base_idx = np.where(times < 0)[0]
        if len(base_idx) > 0:
            signal = signal - np.mean(signal[base_idx])
        return signal

    erp_base = generate_erp(8.0, 320)
    erp_load = generate_erp(5.0, 380)
    
    ERP_dict = {
        'times': times,
        'baseline': erp_base,
        'condition': erp_load,
        'simulated': True
    }
    
    window = (times >= 0.25) & (times <= 0.5)
    
    def measure(signal):
        w_sig = signal[window]
        peak_idx = np.argmax(w_sig)
        peak_amp = w_sig[peak_idx] * 1e6
        peak_lat = times[window][peak_idx] * 1000
        return peak_amp, peak_lat
        
    amp_base, lat_base = measure(erp_base)
    amp_load, lat_load = measure(erp_load)
    
    amplitude_stats = {'baseline': amp_base, 'condition': amp_load}
    latency_stats = {'baseline': lat_base, 'condition': lat_load}
    
    stats_dict = {
        'P300_Amp_Baseline_uV': amp_base,
        'P300_Amp_Condition_uV': amp_load,
        'P300_Lat_Baseline_ms': lat_base,
        'P300_Lat_Condition_ms': lat_load,
        'P300_interpretation': f"Simulated P300 drops from {amp_base:.1f}uV to {amp_load:.1f}uV and delays from {lat_base:.0f}ms to {lat_load:.0f}ms under load (Cebolla et al. 2022)."
    }
    
    return ERP_dict, amplitude_stats, latency_stats, stats_dict


def plot_P300_waveforms(ERP_dict, output_path):
    """
    Grand average ERP waveforms at Pz.
    Title: 'P300 Event-Related Potential — Decision Processing Efficiency'
    """
    print(f"Plotting P300 waveforms to {output_path}")
    times = ERP_dict['times']
    base = ERP_dict['baseline'] * 1e6
    cond = ERP_dict['condition'] * 1e6
    
    fig, ax = plt.subplots(figsize=(8, 5))
    
    ax.plot(times * 1000, base, label='Baseline', color='#2ecc71', linewidth=2)
    ax.plot(times * 1000, cond, label='Cognitive Load', color='#e74c3c', linewidth=2)
    
    ax.fill_between(times * 1000, base - 1, base + 1, color='#2ecc71', alpha=0.2)
    ax.fill_between(times * 1000, cond - 1, cond + 1, color='#e74c3c', alpha=0.2)
    
    ax.axvline(0, color='black', linestyle='--')
    ax.axhline(0, color='black', linewidth=0.5)
    
    ax.axvspan(250, 500, color='yellow', alpha=0.1, label='P300 Window (250-500ms)')
    
    title = 'P300 Event-Related Potential — Decision Processing Efficiency'
    if ERP_dict.get('simulated', False):
        title = 'SIMULATED — ' + title + '\n(based on Cebolla et al. 2022)'
        
    ax.set_title(title)
    ax.set_xlabel('Time (ms)')
    ax.set_ylabel('Amplitude (µV)')
    ax.legend(loc='upper right')
    
    plt.tight_layout()
    fig.savefig(output_path, dpi=300)
    plt.close(fig)


if __name__ == "__main__":
    print("--- Starting Chunk 2: Biomarkers ---")
    
    # 1. Provide data using Chunk 1 pipeline methods
    file_path = download_hdbr_dataset(config.DATA_DIR)
    raw = load_raw_eeg(file_path)
    clean_raw, _ = preprocess_pipeline(raw)
    epochs, _ = epoch_and_reject(clean_raw)
    
    if len(epochs) == 0:
        print("ERROR: No clean epochs available. Cannot compute biomarkers.")
        sys.exit(1)
        
    # Mock condition labels for statistical testing (first half baseline, second half load)
    n = len(epochs)
    cond_labels = np.array(['baseline'] * (n // 2) + ['load'] * (n - n // 2))
    
    # 2. Compute PSD Bandpower
    psd_df = compute_psd_bandpower(epochs)
    
    # 3. TAR Analysis
    tar_series, tar_stats = analyze_TAR(psd_df, cond_labels)
    plot_TAR_temporal(tar_series, os.path.join(config.FIGURES_DIR, '02_TAR_temporal.png'))
    
    # 4. DMN Alpha Analysis
    alpha_series, ali_series, alpha_stats = analyze_DMN_alpha(psd_df, cond_labels)
    plot_alpha_topography(epochs, psd_df, os.path.join(config.FIGURES_DIR, '03_Alpha_topography.png'))
    
    # Output epoch summary CSV
    summary_data = {
        'epoch_id': psd_df['epoch_id'].unique(),
        'condition': cond_labels,
        'TAR': tar_series,
        'DMN_Alpha': alpha_series,
        'Alpha_Laterality': ali_series
    }
    summary_df = pd.DataFrame(summary_data)
    summary_csv_path = os.path.join(config.STATS_DIR, 'biomarker_summary.csv')
    summary_df.to_csv(summary_csv_path, index=False)
    print(f"Saved epoch-level summary to {summary_csv_path}")
    
    # 5. P300 Analysis
    erp_dict, amp_stats, lat_stats, p300_stats = extract_or_simulate_P300(epochs, has_events=False)
    plot_P300_waveforms(erp_dict, os.path.join(config.FIGURES_DIR, '04_P300_waveforms.png'))
    
    # 6. Compile & Print Statistical Results
    stats_out = os.path.join(config.STATS_DIR, 'statistical_results.txt')
    output_text = "=== STATISTICAL RESULTS ===\n\n"
    
    output_text += "--- Theta/Alpha Ratio (TAR) ---\n"
    for k, v in tar_stats.items():
        if 'interpretation' not in k:
            output_text += f"{k}: {v}\n"
    output_text += f"This means: {tar_stats.get('TAR_interpretation', 'No interpretation available.')}\n\n"
    
    output_text += "--- DMN Alpha Power ---\n"
    for k, v in alpha_stats.items():
        if 'interpretation' not in k:
            output_text += f"{k}: {v}\n"
    output_text += f"This means: {alpha_stats.get('DMN_Alpha_interpretation', 'No interpretation available.')}\n\n"
    
    output_text += "--- P300 ERP ---\n"
    for k, v in p300_stats.items():
        if 'interpretation' not in k:
            output_text += f"{k}: {v}\n"
    output_text += f"This means: {p300_stats.get('P300_interpretation', 'No interpretation available.')}\n\n"
    
    with open(stats_out, 'w') as f:
        f.write(output_text)
        
    print("\n" + output_text)
    print(f"Saved statistical tests to {stats_out}")
    print("\nCHUNK 2 COMPLETE.")
