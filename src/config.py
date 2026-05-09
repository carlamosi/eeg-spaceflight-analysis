import os

# Base Directories
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
RESULTS_DIR = os.path.join(BASE_DIR, 'results')
FIGURES_DIR = os.path.join(RESULTS_DIR, 'figures')
STATS_DIR = os.path.join(RESULTS_DIR, 'stats')
ML_DIR = os.path.join(RESULTS_DIR, 'ml')

# Ensure directories exist
for d in [DATA_DIR, FIGURES_DIR, STATS_DIR, ML_DIR]:
    os.makedirs(d, exist_ok=True)

# Pipeline Configuration
SAMPLING_FREQ = 250  # Hz - Downsampling target for computational efficiency while preserving gamma bands
BANDPASS_LOW = 0.5   # Hz - Removes slow drifts and baseline wander (<0.5 Hz)
BANDPASS_HIGH = 45   # Hz - Preserves cognitively relevant bands (up to low gamma), removes high-frequency noise
NOTCH_FREQS = [50, 60] # Hz - Removes powerline interference (50 Hz Europe/HDBR, 60 Hz US/NASA)

# Epoching Configuration
EPOCH_LENGTH = 2.0   # seconds - Standard for spectral analysis, captures multiple slow-wave cycles
EPOCH_OVERLAP = 0.5  # seconds - Ensures temporal continuity and prevents windowing artifacts in edge data
ARTIFACT_THRESHOLD = 100e-6 # Volts (100 µV) - Standard threshold for removing gross movement/muscle artifacts

# ICA Configuration
ICA_COMPONENTS = 20  # Sufficient for separating ocular/cardiac artifacts in typical 32-64 channel setups

# Frequency Bands for Cognitive Monitoring
FREQ_BANDS = {
    'delta': (0.5, 4),   # Sleep/fatigue states
    'theta': (4, 8),     # Cognitive fatigue, spaceflight analog core marker
    'alpha': (8, 13),    # DMN activity, relaxed wakefulness
    'beta': (13, 30),    # Active concentration, working memory load
    'gamma': (30, 45)    # High-level cognitive processing
}

# 10-20 System Channel Mappings
# Mapped for DMN and cognitive load monitoring relevant to spaceflight biomarkers
FRONTAL_CHANNELS = ['Fp1', 'Fp2', 'F3', 'F4', 'Fz', 'F7', 'F8']
PARIETAL_CHANNELS = ['P3', 'P4', 'Pz', 'P7', 'P8']
OCCIPITAL_CHANNELS = ['O1', 'O2', 'Oz']

# Baseline & Thresholding
BASELINE_PERCENTILE = 0.20 # Use first 20% of recording as individual baseline for normalization
ALERT_THRESHOLD_SD = 1.5   # Standard deviations from baseline to trigger cognitive decline alert

# Reproducibility
RANDOM_SEED = 42 # Ensure deterministic ICA and machine learning splits
