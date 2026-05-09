import type { RefObject } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, BarChart, Bar, Cell, LabelList,
} from 'recharts';
import { ml_ROC, ml_AUC, featureImportance, stats } from '../data/empiricalData';

// Merge ROC data into one array for multi-line chart
const rocData = ml_ROC.rf.map((pt, i) => ({
  fpr: pt.fpr,
  rf: pt.tpr,
  svm: ml_ROC.svm[i].tpr,
  lr: ml_ROC.lr[i].tpr,
  chance: pt.fpr,
}));

const categoryColors: Record<string, string> = {
  tar: 'var(--accent-blue)',
  entropy: 'var(--accent-amber)',
  alpha: 'var(--accent-violet)',
  hjorth: 'var(--accent-teal)',
};

export default function MLSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="ml"
      ref={ref as RefObject<HTMLElement>}
      style={{ padding: '120px 24px', backgroundColor: 'var(--bg-void)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
        >
          {/* Header */}
          <motion.div variants={fadeUpVariants} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span className="section-label">05 / Machine Learning</span>
            <h2 className="font-dm" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 600, color: 'var(--text-primary)' }}>
              Which signal predicts cognitive decline first?
            </h2>
          </motion.div>

          {/* Two panels */}
          <motion.div
            variants={fadeUpVariants}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
              gap: '20px',
            }}
          >
            {/* Panel 1: ROC curves */}
            <div className="card-base" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 className="font-dm" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  ROC Curves
                </h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {[
                    { label: `RF (AUC=${ml_AUC.rf})`, color: 'var(--accent-blue)' },
                    { label: `SVM (AUC=${ml_AUC.svm})`, color: 'var(--accent-violet)' },
                    { label: `LR (AUC=${ml_AUC.lr})`, color: 'var(--accent-teal)' },
                  ].map(l => (
                    <span key={l.label} className="font-mono" style={{ fontSize: '10px', color: l.color }}>
                      {l.label}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ height: '280px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={rocData} margin={{ top: 8, right: 8, bottom: 20, left: 0 }}>
                    <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="fpr"
                      tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}
                      tickLine={false}
                      axisLine={false}
                      label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -8, fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}
                      tickLine={false}
                      axisLine={false}
                      width={32}
                      label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft', fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}
                    />
                    <Tooltip
                      contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontFamily: 'JetBrains Mono', fontSize: '11px' }}
                    />
                    <ReferenceLine stroke="var(--text-muted)" strokeDasharray="4 4" segment={[{ x: 0, y: 0 }, { x: 1, y: 1 }]} />
                    <Line type="monotone" dataKey="rf"   name="Random Forest" stroke="var(--accent-blue)"   strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="svm"  name="SVM"           stroke="var(--accent-violet)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="lr"   name="Log. Regression" stroke="var(--accent-teal)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="chance" name="Chance" stroke="var(--text-muted)" strokeDasharray="4 4" strokeWidth={1} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                5-fold stratified cross-validation · ICA EOG rejection
              </p>
            </div>

            {/* Panel 2: Feature importance */}
            <div className="card-base" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 className="font-dm" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Feature Importance
              </h3>
              <div style={{ height: '280px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={featureImportance}
                    layout="vertical"
                    margin={{ top: 0, right: 48, bottom: 0, left: 8 }}
                  >
                    <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 10, fill: 'var(--text-secondary)', fontFamily: 'JetBrains Mono' }}
                      tickLine={false}
                      axisLine={false}
                      width={130}
                    />
                    <Tooltip
                      contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontFamily: 'JetBrains Mono', fontSize: '11px' }}
                      formatter={(v: unknown) => [(v as number).toFixed(3), 'Importance']}
                    />
                    <Bar dataKey="value" name="Importance" radius={[0, 2, 2, 0]}>
                      {featureImportance.map((entry, i) => (
                        <Cell
                          key={`cell-${i}`}
                          fill={categoryColors[entry.category] ?? 'var(--accent-blue)'}
                          fillOpacity={i === 0 ? 1 : 0.7}
                        />
                      ))}
                      <LabelList
                        dataKey="value"
                        position="right"
                        formatter={(v: unknown) => (v as number).toFixed(3)}
                        style={{ fontSize: '10px', fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Best predictor badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '10px',
                    color: 'var(--accent-blue)',
                    background: 'rgba(74,158,255,0.10)',
                    border: '1px solid var(--accent-blue)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '2px 8px',
                    textTransform: 'uppercase',
                  }}
                >
                  Best Predictor
                </span>
                <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  Frontal TAR (Fz): importance {featureImportance[0]?.value.toFixed(3)}
                </span>
              </div>
              <p className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Random Forest · Gini impurity decrease
              </p>
            </div>
          </motion.div>

          {/* Finding statement */}
          <motion.div variants={fadeUpVariants} style={{ textAlign: 'center' }}>
            <p className="font-dm" style={{ fontSize: '18px', color: 'var(--text-primary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.65 }}>
              The frontal theta/alpha ratio is the strongest predictor of cognitive state change, yielding an AUC of {ml_AUC.rf} using Random Forest. Statistical significance (p-value: {stats.pValue.toFixed(3)}) indicates the dataset needs more subjects for absolute clinical certainty, but the trend is robust.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
