// ── Demo data for all dashboard charts ──────────────────────────────────────
// Generated to reflect realistic EEG dynamics from HDBR analog sessions.
// Progressive TAR increase modeled after Van Dongen et al. (2003) fatigue curve.

// ── TAR Timeseries ──────────────────────────────────────────────────────────
export interface TARPoint {
  minute: number;
  TAR: number;
}

function generateTAR(): TARPoint[] {
  const points: TARPoint[] = [];
  const seed = 42;
  let rng = seed;
  const lcg = () => {
    rng = (rng * 1664525 + 1013904223) & 0xffffffff;
    return (rng >>> 0) / 0xffffffff;
  };

  for (let i = 0; i < 180; i++) {
    const minute = i / 3; // 0 to 59.67 minutes, 3 samples/min
    // Logistic growth from 1.4 to 2.8 with noise
    const growth = 1.4 + 1.4 / (1 + Math.exp(-0.07 * (minute - 40)));
    const noise = (lcg() - 0.5) * 0.18;
    points.push({ minute: parseFloat(minute.toFixed(2)), TAR: parseFloat((growth + noise).toFixed(3)) });
  }
  return points;
}

export const TAR_timeseries: TARPoint[] = generateTAR();
export const alertThreshold = 2.31;
export const T_biomarker = 34; // minutes — EEG alert first triggered
export const T_behavior = 57; // minutes — behavioral degradation detected
export const detectionGap = 23; // minutes

// ── Performance Timeseries ────────────────────────────────────────────────
export interface PerfPoint {
  minute: number;
  performance: number;
}

function generatePerformance(): PerfPoint[] {
  const points: PerfPoint[] = [];
  let rng = 99;
  const lcg = () => {
    rng = (rng * 1664525 + 1013904223) & 0xffffffff;
    return (rng >>> 0) / 0xffffffff;
  };

  for (let i = 0; i < 180; i++) {
    const minute = parseFloat((i / 3).toFixed(2));
    let perf: number;
    if (minute < 44) {
      perf = 0.98 + (lcg() - 0.5) * 0.02;
    } else {
      const decay = 0.98 - 0.19 * (1 - Math.exp(-0.06 * (minute - 44)));
      perf = decay + (lcg() - 0.5) * 0.02;
    }
    points.push({ minute, performance: parseFloat(Math.max(0, Math.min(1, perf)).toFixed(3)) });
  }
  return points;
}

export const performance_timeseries: PerfPoint[] = generatePerformance();

// ── P300 Waveforms ────────────────────────────────────────────────────────
export interface P300Point {
  ms: number;
  baseline: number;
  inflight: number;
}

function generateP300(): P300Point[] {
  const points: P300Point[] = [];
  for (let ms = -200; ms <= 800; ms += 10) {
    // Baseline: peak at 320ms, 8.2µV
    const bPeak = 8.2 * Math.exp(-Math.pow((ms - 320) / 80, 2));
    const bN1 = -2.1 * Math.exp(-Math.pow((ms - 100) / 40, 2));
    const bN2 = -1.5 * Math.exp(-Math.pow((ms - 200) / 50, 2));
    const baseline = parseFloat((bPeak + bN1 + bN2).toFixed(3));

    // In-flight: peak at 382ms, 5.1µV (delayed and attenuated)
    const fPeak = 5.1 * Math.exp(-Math.pow((ms - 382) / 90, 2));
    const fN1 = -1.8 * Math.exp(-Math.pow((ms - 110) / 45, 2));
    const fN2 = -1.2 * Math.exp(-Math.pow((ms - 210) / 55, 2));
    const inflight = parseFloat((fPeak + fN1 + fN2).toFixed(3));

    points.push({ ms, baseline, inflight });
  }
  return points;
}

export const P300_data: P300Point[] = generateP300();

// ── Band Power ────────────────────────────────────────────────────────────
export interface BandPowerSet {
  band: string;
  baseline: number;
  load: number;
}

export const bandPower_data: BandPowerSet[] = [
  { band: 'Delta', baseline: 0.12, load: 0.10 },
  { band: 'Theta', baseline: 0.18, load: 0.31 },
  { band: 'Alpha', baseline: 0.35, load: 0.22 },
  { band: 'Beta',  baseline: 0.28, load: 0.30 },
  { band: 'Gamma', baseline: 0.07, load: 0.07 },
];

export const bandPower_baseline = { delta: 0.12, theta: 0.18, alpha: 0.35, beta: 0.28, gamma: 0.07 };
export const bandPower_load = { delta: 0.10, theta: 0.31, alpha: 0.22, beta: 0.30, gamma: 0.07 };

// ── ML ROC Curves ─────────────────────────────────────────────────────────
export interface ROCPoint {
  fpr: number;
  tpr: number;
}

function generateROC(auc: number, seed: number): ROCPoint[] {
  const pts: ROCPoint[] = [{ fpr: 0, tpr: 0 }];
  let rng = seed;
  const lcg = () => {
    rng = (rng * 1664525 + 1013904223) & 0xffffffff;
    return (rng >>> 0) / 0xffffffff;
  };
  for (let i = 1; i <= 19; i++) {
    const fpr = i / 20;
    const tpr = Math.min(1, auc * 2 * fpr - fpr * fpr + (lcg() - 0.5) * 0.04);
    pts.push({ fpr: parseFloat(fpr.toFixed(2)), tpr: parseFloat(Math.max(fpr, tpr).toFixed(3)) });
  }
  pts.push({ fpr: 1, tpr: 1 });
  return pts;
}

export const ml_ROC = {
  rf: generateROC(0.84, 7),
  svm: generateROC(0.79, 13),
  lr: generateROC(0.73, 31),
};

export const ml_AUC = { rf: 0.84, svm: 0.79, lr: 0.73 };

// ── Feature Importance ────────────────────────────────────────────────────
export interface FeatureItem {
  name: string;
  value: number;
  category: 'tar' | 'entropy' | 'alpha' | 'hjorth';
}

export const featureImportance: FeatureItem[] = [
  { name: 'Frontal TAR (Fz)', value: 0.187, category: 'tar' },
  { name: 'TAR slope (10-min)', value: 0.143, category: 'tar' },
  { name: 'Sample Entropy', value: 0.121, category: 'entropy' },
  { name: 'Alpha DMN power', value: 0.098, category: 'alpha' },
  { name: 'Hjorth Complexity', value: 0.087, category: 'hjorth' },
  { name: 'Frontal TAR (F3)', value: 0.076, category: 'tar' },
  { name: 'Theta abs power', value: 0.068, category: 'tar' },
  { name: 'Permutation Entropy', value: 0.054, category: 'entropy' },
];
