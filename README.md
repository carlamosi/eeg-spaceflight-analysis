# 86 Billion Reasons to Monitor the Brain in Space

**Carla Monté Sihuro | TKS Fellow | March 2026**

![Python](https://img.shields.io/badge/Python-3.11-3776ab?style=flat-square&logo=python&logoColor=white)
![MNE](https://img.shields.io/badge/MNE-1.7.0-4a9eff?style=flat-square)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-1db88a?style=flat-square)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel)

---

## Abstract

Long-duration spaceflight imposes measurable structural and functional changes on the human brain, yet current monitoring protocols consist of fewer than three standardized cognitive tests per six-month mission. This repository presents a continuous EEG-based cognitive monitoring protocol validated on the NASA/ESA Head-Down Tilt Bed Rest (HDBR) analog dataset. Three biomarkers are computed and tracked in real time: the frontal theta/alpha ratio (TAR), posterior alpha power in DMN-relevant channels, and the P300 event-related potential component. The central finding is that the frontal TAR exceeded a personalized alert threshold 23 minutes before behavioral performance dropped below the 85% individual baseline, producing a detection window that no periodic test-based approach can provide. A machine learning classification pipeline (Random Forest AUC = 0.84, permutation p < 0.01) confirms the TAR as the strongest single predictor of cognitive state change. This work demonstrates that the technical infrastructure for continuous neurophysiological monitoring already exists and argues for its integration into spaceflight human factors protocols.

---

## Scientific Background

| Paper | Finding | Relevance to protocol |
|---|---|---|
| Pusil et al., *npj Microgravity* (2023) | Persistent EEG spectral changes in cosmonauts after ISS missions, including frontal theta increase | Validates TAR as a post-flight biomarker; this protocol extends detection to in-flight |
| Cebolla et al., *Frontiers in Physiology* (2022) | P300 latency increases and amplitude reduction measured in ISS astronauts during oddball tasks | Provides empirical ISS parameters for P300 simulation and threshold calibration |
| Petit et al., *npj Microgravity* (2019) | DMN alpha suppression during task conditions detectable from posterior EEG | Validates posterior alpha as a DMN load indicator in microgravity-relevant conditions |
| Hupfeld et al., *Science Advances* (2020) | Structural white matter changes after 6-month ISS missions, persisting months post-return | Motivates pre-symptomatic monitoring: structural damage follows functional decline |
| Basner et al., *Lancet Neurology* (2015) | Cognitive performance degrades monotonically with sleep loss in spaceflight analog conditions | Provides the drift-diffusion behavioral model used in early detection simulation |

---

## Dataset

**Head-Down Tilt Bed Rest (HDBR) — Figshare DOI: [10.6084/m9.figshare.12148359](https://doi.org/10.6084/m9.figshare.12148359)**

HDBR is the primary terrestrial analog for microgravity-induced physiological changes. Participants lie at a -6 degree head-down tilt for 30 to 60 days, inducing cephalic fluid shifts, vestibular adaptation, and cognitive fatigue trajectories closely matching those observed in spaceflight.

**Why not NEUROSPAT (the ISS dataset)?**
NEUROSPAT (Principal Investigator: Prof. Guy Cheron, ULB) contains genuine ISS EEG recordings from astronauts. Access requires IRB approval from both ESA and NASA, which is not feasible for independent research at this stage. A 2025 paper in *Scientific Reports* directly validates HDBR as a spectral analog of NEUROSPAT data, making it the appropriate starting point.

---

## The Protocol

| Biomarker | Computation | Alert Threshold | Clinical Precedent |
|---|---|---|---|
| Theta/Alpha Ratio (TAR) | Welch PSD (4s window, 50% overlap) on Fz, F3, F4, Cz. TAR = absolute theta / absolute alpha power | Individual mean + 1.5 SD, computed from first 20% of session | Klimesch (1999): absolute power decoupling in working memory load |
| Alpha Power, DMN | Mean Welch alpha power across P3, Pz, P4, Oz | Individual mean minus 1.5 SD | Petersen and Posner (2012): posterior alpha reflects DMN engagement |
| P300 Latency/Amplitude | Oddball ERP at Pz, 250 to 500 ms window | Latency increase >40 ms or amplitude decrease >30% from baseline | Polich (2007): P300 as cognitive processing speed index |

---

## Key Finding

> **The frontal theta/alpha ratio exceeded the individual alert threshold at t = 34 minutes. Behavioral performance did not drop below the 85% individual baseline until t = 57 minutes. The detection window is 23 minutes.**

This gap is the protocol's core scientific contribution. Periodic behavioral testing, occurring at most once per session, cannot detect this window. Continuous EEG monitoring can.

---

## Reproduce the Analysis

```bash
git clone https://github.com/camosi/eeg-spaceflight-analysis
cd eeg-spaceflight-analysis
pip install -r requirements.txt

# Run each chunk independently
python src/chunk1_load_preprocess.py   # Data loading, filtering, ICA, epoching
python src/chunk2_biomarkers.py        # TAR, Alpha DMN, P300 computation
python src/chunk3_early_detection.py  # Sliding window detection gap analysis
python src/chunk4_personalization.py  # Individual vs. population baselines
python src/chunk4_ml.py               # ML classification pipeline

# Run the web dashboard
cd dashboard
npm install
npm run dev
```

---

## Repository Structure

```
eeg-spaceflight-analysis/
│
├── requirements.txt                   # Pinned Python dependencies (MNE, scikit-learn, antropy)
│
├── src/
│   ├── config.py                      # All scientific parameters: freq bands, channels, thresholds
│   ├── chunk1_load_preprocess.py      # EEG loading, bandpass/notch filtering, ICA, epoching
│   ├── chunk2_biomarkers.py           # Welch PSD, TAR, DMN alpha, P300 extraction + stats
│   ├── chunk3_early_detection.py      # Sliding window TAR, behavioral proxy, detection gap
│   ├── chunk4_personalization.py      # Individual vs. population threshold comparison
│   └── chunk4_ml.py                   # Random Forest/SVM/LR classification, permutation test
│
├── results/
│   ├── figures/                       # All publication-quality figures (PNG, 300 DPI)
│   └── stats/
│       ├── biomarker_summary.csv      # Per-subject biomarker statistics
│       └── statistical_results.txt   # Mann-Whitney U, Cohen d, AUC values
│
└── dashboard/                         # React 18 + Vite + TypeScript web interface
    ├── src/
    │   ├── components/                # Section components: Hero, Protocol, Data, Detection, ML
    │   ├── data/demoData.ts           # Typed realistic demo data for all charts
    │   ├── hooks/useScrollReveal.ts   # IntersectionObserver scroll entrance hook
    │   ├── App.tsx                    # Root layout assembly
    │   └── index.css                  # Design system: CSS variables, Google Fonts, reset
    ├── vercel.json                    # SPA rewrites for Vercel static deploy
    └── vite.config.ts                 # Vite + Tailwind v4 plugin config
```

---

## Results

Figures are generated by each chunk script and saved to `results/figures/`.

| Figure | Source | Description |
|---|---|---|
| `tar_trajectory.png` | chunk3 | TAR sliding window with alert threshold and detection annotation |
| `early_detection_hero.png` | chunk3 | Dual-axis TAR + performance plot showing 23-minute gap |
| `personalization_comparison.png` | chunk4 | 3-subject panel: individual vs. population false alarm rates |
| `ml_roc_curves.png` | chunk4_ml | ROC curves for RF, SVM, LR with AUC annotations |
| `feature_importance.png` | chunk4_ml | Top 8 features by Gini impurity decrease |

---

## Limitations

- **Sample size**: The HDBR dataset contains fewer than 15 subjects. Findings are directional. A minimum of 30 subjects in a pre-registered study would be required for publication.
- **Proxy data**: HDBR simulates microgravity but is not spaceflight. Vestibular, radiation, and social isolation effects are not replicated. NEUROSPAT requires ESA/NASA IRB approval.
- **Simulated P300**: Where event markers were unavailable, the P300 waveform was simulated using Cebolla et al. (2022) ISS parameters. Genuine oddball paradigm data is required for validation.
- **Behavioral metric**: Performance degradation was modeled using a drift-diffusion proxy (Van Dongen et al., 2003 parameters). Real psychomotor vigilance task data would strengthen the detection gap claim.

---

## Next Steps

1. **HERA analog validation**: Apply protocol to NASA HERA (Human Exploration Research Analog) dataset, which includes longer isolation and team dynamics.
2. **NEUROSPAT data access**: Contact Prof. Guy Cheron (ULB) and submit formal data access request to ESA. IRB pathway estimated at 6 to 12 months.
3. **ESA OSIP submission**: Submit protocol as a research proposal to the ESA Open Space Innovation Platform (OSIP) call for cognitive monitoring technologies.
4. **Real-time implementation**: Port TAR computation to MNE-Realtime for closed-loop feedback during analog studies.

---

## Contact

**Carla Monté Sihuro**
[carlamonte.dev](https://carlamonte.dev) | [github.com/camosi](https://github.com/camosi)

---

## Citation

```bibtex
@misc{monte2026eegspaceflight,
  author       = {Mont{\'e} Sihuro, Carla},
  title        = {Continuous EEG Cognitive Monitoring Protocol for Long-Duration Spaceflight},
  year         = {2026},
  publisher    = {GitHub},
  journal      = {GitHub repository},
  howpublished = {\url{https://github.com/camosi/eeg-spaceflight-analysis}},
  note         = {TKS Fellow research project. Dataset: HDBR via Figshare DOI 10.6084/m9.figshare.12148359}
}
```

---

## License

MIT License. See `LICENSE` for details.

Dataset (HDBR): Available under the terms of the original Figshare deposit. Cite the original depositors when using in published work.
