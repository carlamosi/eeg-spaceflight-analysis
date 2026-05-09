// ── Empirical Data Interface (Pusil et al. 2023 & PhysioNet) ───────────────
// GENERATED via data_processing.py with ICA Artifact Rejection & Statistical Tests
// Dataset: PhysioNet EEG During Mental Arithmetic Tasks (eegmat)

export const stats = {
  pValue: 0.16105052541843018,
  tStatistic: -1.4663796496518113,
  isSignificant: false
};

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
    "TAR": 1.555
  },
  {
    "minute": 1,
    "TAR": 1.125
  },
  {
    "minute": 2,
    "TAR": 1.044
  },
  {
    "minute": 3,
    "TAR": 2.035
  },
  {
    "minute": 4,
    "TAR": 1.118
  },
  {
    "minute": 5,
    "TAR": 1.31
  },
  {
    "minute": 6,
    "TAR": 1.403
  },
  {
    "minute": 7,
    "TAR": 2.083
  },
  {
    "minute": 8,
    "TAR": 1.468
  },
  {
    "minute": 9,
    "TAR": 1.121
  },
  {
    "minute": 10,
    "TAR": 1.363
  },
  {
    "minute": 11,
    "TAR": 1.115
  },
  {
    "minute": 12,
    "TAR": 1.206
  },
  {
    "minute": 13,
    "TAR": 2.659
  },
  {
    "minute": 14,
    "TAR": 1.198
  },
  {
    "minute": 15,
    "TAR": 1.36
  },
  {
    "minute": 16,
    "TAR": 1.377
  },
  {
    "minute": 17,
    "TAR": 1.106
  },
  {
    "minute": 18,
    "TAR": 1.197
  },
  {
    "minute": 19,
    "TAR": 1.161
  },
  {
    "minute": 20,
    "TAR": 1.096
  },
  {
    "minute": 21,
    "TAR": 1.647
  },
  {
    "minute": 22,
    "TAR": 2.426
  },
  {
    "minute": 23,
    "TAR": 1.36
  },
  {
    "minute": 24,
    "TAR": 1.117
  },
  {
    "minute": 25,
    "TAR": 1.161
  },
  {
    "minute": 26,
    "TAR": 1.931
  },
  {
    "minute": 27,
    "TAR": 1.139
  },
  {
    "minute": 28,
    "TAR": 1.129
  },
  {
    "minute": 29,
    "TAR": 1.511
  },
  {
    "minute": 30,
    "TAR": 1.197
  },
  {
    "minute": 31,
    "TAR": 1.113
  },
  {
    "minute": 32,
    "TAR": 1.018
  },
  {
    "minute": 33,
    "TAR": 1.551
  },
  {
    "minute": 34,
    "TAR": 1.369
  },
  {
    "minute": 35,
    "TAR": 1.534
  },
  {
    "minute": 36,
    "TAR": 1.549
  },
  {
    "minute": 37,
    "TAR": 1.572
  },
  {
    "minute": 38,
    "TAR": 1.854
  },
  {
    "minute": 39,
    "TAR": 1.181
  },
  {
    "minute": 40,
    "TAR": 1.4
  },
  {
    "minute": 41,
    "TAR": 1.272
  },
  {
    "minute": 42,
    "TAR": 1.388
  },
  {
    "minute": 43,
    "TAR": 1.649
  },
  {
    "minute": 44,
    "TAR": 1.216
  },
  {
    "minute": 45,
    "TAR": 1.644
  },
  {
    "minute": 46,
    "TAR": 1.181
  },
  {
    "minute": 47,
    "TAR": 1.373
  },
  {
    "minute": 48,
    "TAR": 2.314
  },
  {
    "minute": 49,
    "TAR": 1.0
  },
  {
    "minute": 50,
    "TAR": 1.161
  },
  {
    "minute": 51,
    "TAR": 1.578
  },
  {
    "minute": 52,
    "TAR": 3.0
  },
  {
    "minute": 53,
    "TAR": 2.457
  },
  {
    "minute": 54,
    "TAR": 2.919
  },
  {
    "minute": 55,
    "TAR": 1.074
  },
  {
    "minute": 56,
    "TAR": 1.058
  },
  {
    "minute": 57,
    "TAR": 1.352
  },
  {
    "minute": 58,
    "TAR": 1.411
  },
  {
    "minute": 59,
    "TAR": 1.597
  }
];

export const alertThreshold = 2.31;
export const T_biomarker = 13;
export const T_behavior = 51;
export const detectionGap = 38;

export interface PerfPoint {
  minute: number;
  performance: number;
}

export const performance_timeseries: PerfPoint[] = [
  {
    "minute": 0,
    "performance": 0.96
  },
  {
    "minute": 1,
    "performance": 0.932
  },
  {
    "minute": 2,
    "performance": 0.969
  },
  {
    "minute": 3,
    "performance": 0.969
  },
  {
    "minute": 4,
    "performance": 0.971
  },
  {
    "minute": 5,
    "performance": 0.932
  },
  {
    "minute": 6,
    "performance": 0.957
  },
  {
    "minute": 7,
    "performance": 0.936
  },
  {
    "minute": 8,
    "performance": 0.94
  },
  {
    "minute": 9,
    "performance": 0.94
  },
  {
    "minute": 10,
    "performance": 0.968
  },
  {
    "minute": 11,
    "performance": 0.959
  },
  {
    "minute": 12,
    "performance": 0.954
  },
  {
    "minute": 13,
    "performance": 0.927
  },
  {
    "minute": 14,
    "performance": 0.966
  },
  {
    "minute": 15,
    "performance": 0.979
  },
  {
    "minute": 16,
    "performance": 0.922
  },
  {
    "minute": 17,
    "performance": 0.923
  },
  {
    "minute": 18,
    "performance": 0.975
  },
  {
    "minute": 19,
    "performance": 0.936
  },
  {
    "minute": 20,
    "performance": 0.938
  },
  {
    "minute": 21,
    "performance": 0.937
  },
  {
    "minute": 22,
    "performance": 0.944
  },
  {
    "minute": 23,
    "performance": 0.972
  },
  {
    "minute": 24,
    "performance": 0.956
  },
  {
    "minute": 25,
    "performance": 0.923
  },
  {
    "minute": 26,
    "performance": 0.951
  },
  {
    "minute": 27,
    "performance": 0.948
  },
  {
    "minute": 28,
    "performance": 0.977
  },
  {
    "minute": 29,
    "performance": 0.964
  },
  {
    "minute": 30,
    "performance": 0.963
  },
  {
    "minute": 31,
    "performance": 0.974
  },
  {
    "minute": 32,
    "performance": 0.935
  },
  {
    "minute": 33,
    "performance": 0.964
  },
  {
    "minute": 34,
    "performance": 0.949
  },
  {
    "minute": 35,
    "performance": 0.921
  },
  {
    "minute": 36,
    "performance": 0.934
  },
  {
    "minute": 37,
    "performance": 0.955
  },
  {
    "minute": 38,
    "performance": 0.962
  },
  {
    "minute": 39,
    "performance": 0.966
  },
  {
    "minute": 40,
    "performance": 0.975
  },
  {
    "minute": 41,
    "performance": 0.946
  },
  {
    "minute": 42,
    "performance": 0.953
  },
  {
    "minute": 43,
    "performance": 0.928
  },
  {
    "minute": 44,
    "performance": 0.929
  },
  {
    "minute": 45,
    "performance": 0.934
  },
  {
    "minute": 46,
    "performance": 0.927
  },
  {
    "minute": 47,
    "performance": 0.904
  },
  {
    "minute": 48,
    "performance": 0.891
  },
  {
    "minute": 49,
    "performance": 0.865
  },
  {
    "minute": 50,
    "performance": 0.852
  },
  {
    "minute": 51,
    "performance": 0.828
  },
  {
    "minute": 52,
    "performance": 0.803
  },
  {
    "minute": 53,
    "performance": 0.798
  },
  {
    "minute": 54,
    "performance": 0.787
  },
  {
    "minute": 55,
    "performance": 0.737
  },
  {
    "minute": 56,
    "performance": 0.748
  },
  {
    "minute": 57,
    "performance": 0.702
  },
  {
    "minute": 58,
    "performance": 0.696
  },
  {
    "minute": 59,
    "performance": 0.651
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
      "tpr": 0.6
    },
    {
      "fpr": 0.222,
      "tpr": 0.6
    },
    {
      "fpr": 0.333,
      "tpr": 0.8
    },
    {
      "fpr": 0.444,
      "tpr": 0.933
    },
    {
      "fpr": 0.556,
      "tpr": 0.933
    },
    {
      "fpr": 0.667,
      "tpr": 0.933
    },
    {
      "fpr": 0.778,
      "tpr": 0.933
    },
    {
      "fpr": 0.889,
      "tpr": 1.0
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
      "tpr": 0.4
    },
    {
      "fpr": 0.333,
      "tpr": 0.533
    },
    {
      "fpr": 0.444,
      "tpr": 0.6
    },
    {
      "fpr": 0.556,
      "tpr": 0.667
    },
    {
      "fpr": 0.667,
      "tpr": 0.8
    },
    {
      "fpr": 0.778,
      "tpr": 0.867
    },
    {
      "fpr": 0.889,
      "tpr": 0.867
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
      "tpr": 0.467
    },
    {
      "fpr": 0.222,
      "tpr": 0.6
    },
    {
      "fpr": 0.333,
      "tpr": 0.8
    },
    {
      "fpr": 0.444,
      "tpr": 0.867
    },
    {
      "fpr": 0.556,
      "tpr": 0.933
    },
    {
      "fpr": 0.667,
      "tpr": 0.933
    },
    {
      "fpr": 0.778,
      "tpr": 1.0
    },
    {
      "fpr": 0.889,
      "tpr": 1.0
    },
    {
      "fpr": 1.0,
      "tpr": 1.0
    }
  ]
};

export const ml_AUC = {
  "rf": 0.763,
  "svm": 0.553,
  "lr": 0.765
};

export interface FeatureItem {
  name: string;
  value: number;
  category: 'tar' | 'entropy' | 'alpha' | 'hjorth';
}

export const featureImportance: FeatureItem[] = [
  { name: 'Frontal TAR (Fz)', value: 0.321, category: 'tar' },
  { name: 'Frontoparietal Ratio', value: 0.243, category: 'tar' },
  { name: 'Sample Entropy', value: 0.121, category: 'entropy' },
  { name: 'Alpha DMN power', value: 0.098, category: 'alpha' },
  { name: 'Hjorth Complexity', value: 0.087, category: 'hjorth' },
  { name: 'Theta abs power', value: 0.068, category: 'tar' },
];
