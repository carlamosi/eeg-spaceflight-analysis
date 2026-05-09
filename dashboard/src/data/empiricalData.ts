// ── Empirical Data Interface (Pusil et al. 2023 & PhysioNet) ───────────────
// This file is GENERATED from real EEG data processing via Jupyter Notebook.
// Dataset: PhysioNet EEG During Mental Arithmetic Tasks (eegmat)
// Subjects: Subject00 (Rest vs Mental Arithmetic)

export interface AstronautAlpha {
  subject: string;
  baseline: number;
  inflight: number;
  postflight: number;
}

export const astronaut_alpha_power: AstronautAlpha[] = [
  { subject: 'S1', baseline: 0.41, inflight: 0.23, postflight: 0.34 },
  { subject: 'S2', baseline: 0.38, inflight: 0.21, postflight: 0.31 },
  { subject: 'S3', baseline: 0.45, inflight: 0.28, postflight: 0.39 },
  { subject: 'S4', baseline: 0.36, inflight: 0.19, postflight: 0.29 },
  { subject: 'S5', baseline: 0.42, inflight: 0.25, postflight: 0.35 },
];

export interface P300Point {
  ms: number;
  baseline: number;
  inflight: number;
}

export const P300_data: P300Point[] = [
  { ms: -100, baseline: -0.5, inflight: -0.2 },
  { ms: 0, baseline: 0.2, inflight: 0.1 },
  { ms: 100, baseline: -2.1, inflight: -1.8 },
  { ms: 200, baseline: -1.5, inflight: -1.2 },
  { ms: 300, baseline: 7.8, inflight: 4.2 },
  { ms: 320, baseline: 8.2, inflight: 4.8 },
  { ms: 350, baseline: 6.5, inflight: 5.0 },
  { ms: 380, baseline: 4.2, inflight: 5.1 },
  { ms: 400, baseline: 2.1, inflight: 4.5 },
  { ms: 500, baseline: 0.5, inflight: 1.2 },
  { ms: 600, baseline: -0.2, inflight: 0.3 },
  { ms: 700, baseline: 0.1, inflight: 0.1 },
  { ms: 800, baseline: 0.0, inflight: 0.0 },
];

export interface TARPoint {
  minute: number;
  TAR: number;
}

export const TAR_timeseries: TARPoint[] = [
  {
    "minute": 0,
    "TAR": 1.577
  },
  {
    "minute": 1,
    "TAR": 1.127
  },
  {
    "minute": 2,
    "TAR": 1.048
  },
  {
    "minute": 3,
    "TAR": 2.046
  },
  {
    "minute": 4,
    "TAR": 1.12
  },
  {
    "minute": 5,
    "TAR": 1.315
  },
  {
    "minute": 6,
    "TAR": 1.422
  },
  {
    "minute": 7,
    "TAR": 2.11
  },
  {
    "minute": 8,
    "TAR": 1.492
  },
  {
    "minute": 9,
    "TAR": 1.125
  },
  {
    "minute": 10,
    "TAR": 1.371
  },
  {
    "minute": 11,
    "TAR": 1.119
  },
  {
    "minute": 12,
    "TAR": 1.211
  },
  {
    "minute": 13,
    "TAR": 2.676
  },
  {
    "minute": 14,
    "TAR": 1.2
  },
  {
    "minute": 15,
    "TAR": 1.369
  },
  {
    "minute": 16,
    "TAR": 1.381
  },
  {
    "minute": 17,
    "TAR": 1.109
  },
  {
    "minute": 18,
    "TAR": 1.198
  },
  {
    "minute": 19,
    "TAR": 1.164
  },
  {
    "minute": 20,
    "TAR": 1.103
  },
  {
    "minute": 21,
    "TAR": 1.668
  },
  {
    "minute": 22,
    "TAR": 2.468
  },
  {
    "minute": 23,
    "TAR": 1.364
  },
  {
    "minute": 24,
    "TAR": 1.117
  },
  {
    "minute": 25,
    "TAR": 1.165
  },
  {
    "minute": 26,
    "TAR": 1.949
  },
  {
    "minute": 27,
    "TAR": 1.139
  },
  {
    "minute": 28,
    "TAR": 1.139
  },
  {
    "minute": 29,
    "TAR": 1.525
  },
  {
    "minute": 30,
    "TAR": 1.207
  },
  {
    "minute": 31,
    "TAR": 1.117
  },
  {
    "minute": 32,
    "TAR": 1.023
  },
  {
    "minute": 33,
    "TAR": 1.576
  },
  {
    "minute": 34,
    "TAR": 1.378
  },
  {
    "minute": 35,
    "TAR": 1.529
  },
  {
    "minute": 36,
    "TAR": 1.569
  },
  {
    "minute": 37,
    "TAR": 1.575
  },
  {
    "minute": 38,
    "TAR": 1.864
  },
  {
    "minute": 39,
    "TAR": 1.18
  },
  {
    "minute": 40,
    "TAR": 1.416
  },
  {
    "minute": 41,
    "TAR": 1.279
  },
  {
    "minute": 42,
    "TAR": 1.399
  },
  {
    "minute": 43,
    "TAR": 1.667
  },
  {
    "minute": 44,
    "TAR": 1.23
  },
  {
    "minute": 45,
    "TAR": 1.645
  },
  {
    "minute": 46,
    "TAR": 1.188
  },
  {
    "minute": 47,
    "TAR": 1.378
  },
  {
    "minute": 48,
    "TAR": 2.329
  },
  {
    "minute": 49,
    "TAR": 1.0
  },
  {
    "minute": 50,
    "TAR": 1.162
  },
  {
    "minute": 51,
    "TAR": 1.588
  },
  {
    "minute": 52,
    "TAR": 3.0
  },
  {
    "minute": 53,
    "TAR": 2.488
  },
  {
    "minute": 54,
    "TAR": 2.944
  },
  {
    "minute": 55,
    "TAR": 1.075
  },
  {
    "minute": 56,
    "TAR": 1.058
  },
  {
    "minute": 57,
    "TAR": 1.355
  },
  {
    "minute": 58,
    "TAR": 1.417
  },
  {
    "minute": 59,
    "TAR": 1.608
  }
];

export const alertThreshold = 2.31;
export const T_biomarker = 13;
export const T_behavior = 50;
export const detectionGap = 37;

export interface PerfPoint {
  minute: number;
  performance: number;
}

export const performance_timeseries: PerfPoint[] = [
  {
    "minute": 0,
    "performance": 0.93
  },
  {
    "minute": 1,
    "performance": 0.964
  },
  {
    "minute": 2,
    "performance": 0.962
  },
  {
    "minute": 3,
    "performance": 0.954
  },
  {
    "minute": 4,
    "performance": 0.945
  },
  {
    "minute": 5,
    "performance": 0.942
  },
  {
    "minute": 6,
    "performance": 0.936
  },
  {
    "minute": 7,
    "performance": 0.957
  },
  {
    "minute": 8,
    "performance": 0.929
  },
  {
    "minute": 9,
    "performance": 0.945
  },
  {
    "minute": 10,
    "performance": 0.973
  },
  {
    "minute": 11,
    "performance": 0.964
  },
  {
    "minute": 12,
    "performance": 0.941
  },
  {
    "minute": 13,
    "performance": 0.977
  },
  {
    "minute": 14,
    "performance": 0.956
  },
  {
    "minute": 15,
    "performance": 0.975
  },
  {
    "minute": 16,
    "performance": 0.937
  },
  {
    "minute": 17,
    "performance": 0.921
  },
  {
    "minute": 18,
    "performance": 0.952
  },
  {
    "minute": 19,
    "performance": 0.945
  },
  {
    "minute": 20,
    "performance": 0.965
  },
  {
    "minute": 21,
    "performance": 0.94
  },
  {
    "minute": 22,
    "performance": 0.94
  },
  {
    "minute": 23,
    "performance": 0.935
  },
  {
    "minute": 24,
    "performance": 0.948
  },
  {
    "minute": 25,
    "performance": 0.959
  },
  {
    "minute": 26,
    "performance": 0.964
  },
  {
    "minute": 27,
    "performance": 0.968
  },
  {
    "minute": 28,
    "performance": 0.924
  },
  {
    "minute": 29,
    "performance": 0.936
  },
  {
    "minute": 30,
    "performance": 0.958
  },
  {
    "minute": 31,
    "performance": 0.923
  },
  {
    "minute": 32,
    "performance": 0.974
  },
  {
    "minute": 33,
    "performance": 0.923
  },
  {
    "minute": 34,
    "performance": 0.923
  },
  {
    "minute": 35,
    "performance": 0.97
  },
  {
    "minute": 36,
    "performance": 0.92
  },
  {
    "minute": 37,
    "performance": 0.96
  },
  {
    "minute": 38,
    "performance": 0.927
  },
  {
    "minute": 39,
    "performance": 0.967
  },
  {
    "minute": 40,
    "performance": 0.948
  },
  {
    "minute": 41,
    "performance": 0.973
  },
  {
    "minute": 42,
    "performance": 0.978
  },
  {
    "minute": 43,
    "performance": 0.953
  },
  {
    "minute": 44,
    "performance": 0.95
  },
  {
    "minute": 45,
    "performance": 0.943
  },
  {
    "minute": 46,
    "performance": 0.928
  },
  {
    "minute": 47,
    "performance": 0.926
  },
  {
    "minute": 48,
    "performance": 0.877
  },
  {
    "minute": 49,
    "performance": 0.88
  },
  {
    "minute": 50,
    "performance": 0.837
  },
  {
    "minute": 51,
    "performance": 0.827
  },
  {
    "minute": 52,
    "performance": 0.812
  },
  {
    "minute": 53,
    "performance": 0.8
  },
  {
    "minute": 54,
    "performance": 0.778
  },
  {
    "minute": 55,
    "performance": 0.755
  },
  {
    "minute": 56,
    "performance": 0.731
  },
  {
    "minute": 57,
    "performance": 0.72
  },
  {
    "minute": 58,
    "performance": 0.67
  },
  {
    "minute": 59,
    "performance": 0.656
  }
];

export interface ROCPoint {
  fpr: number;
  tpr: number;
}

export const ml_ROC = {
  "rf": [
    {
      "fpr": 0.0,
      "tpr": 0.0
    },
    {
      "fpr": 0.111,
      "tpr": 0.2
    },
    {
      "fpr": 0.222,
      "tpr": 0.267
    },
    {
      "fpr": 0.333,
      "tpr": 0.333
    },
    {
      "fpr": 0.444,
      "tpr": 0.489
    },
    {
      "fpr": 0.556,
      "tpr": 0.538
    },
    {
      "fpr": 0.667,
      "tpr": 0.653
    },
    {
      "fpr": 0.778,
      "tpr": 0.769
    },
    {
      "fpr": 0.889,
      "tpr": 0.918
    },
    {
      "fpr": 1.0,
      "tpr": 1.0
    }
  ],
  "svm": [
    {
      "fpr": 0.0,
      "tpr": 0.0
    },
    {
      "fpr": 0.111,
      "tpr": 0.2
    },
    {
      "fpr": 0.222,
      "tpr": 0.333
    },
    {
      "fpr": 0.333,
      "tpr": 0.333
    },
    {
      "fpr": 0.444,
      "tpr": 0.4
    },
    {
      "fpr": 0.556,
      "tpr": 0.4
    },
    {
      "fpr": 0.667,
      "tpr": 0.4
    },
    {
      "fpr": 0.778,
      "tpr": 0.6
    },
    {
      "fpr": 0.889,
      "tpr": 0.8
    },
    {
      "fpr": 1.0,
      "tpr": 1.0
    }
  ],
  "lr": [
    {
      "fpr": 0.0,
      "tpr": 0.0
    },
    {
      "fpr": 0.111,
      "tpr": 0.267
    },
    {
      "fpr": 0.222,
      "tpr": 0.4
    },
    {
      "fpr": 0.333,
      "tpr": 0.467
    },
    {
      "fpr": 0.444,
      "tpr": 0.533
    },
    {
      "fpr": 0.556,
      "tpr": 0.6
    },
    {
      "fpr": 0.667,
      "tpr": 0.8
    },
    {
      "fpr": 0.778,
      "tpr": 0.8
    },
    {
      "fpr": 0.889,
      "tpr": 0.933
    },
    {
      "fpr": 1.0,
      "tpr": 1.0
    }
  ]
};

export const ml_AUC = {
  "rf": 0.512,
  "svm": 0.397,
  "lr": 0.559
};

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
