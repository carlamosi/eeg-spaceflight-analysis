import type { RefObject } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal';
import AlertBadge from './AlertBadge';
import {
  ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ReferenceArea, ResponsiveContainer,
} from 'recharts';
import { TAR_timeseries, performance_timeseries, alertThreshold, T_biomarker, T_behavior, detectionGap, stats } from '../data/empiricalData';

// Merge TAR + performance into one array, sampled every 3 points
const mergedData = TAR_timeseries
  .filter((_, i) => i % 3 === 0)
  .map((t, i) => ({
    minute: t.minute,
    TAR: t.TAR,
    performance: performance_timeseries[i * 3]?.performance ?? null,
  }));

interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: number;
}) => {
  if (!active || !payload?.length) return null;
  const tar = payload.find(p => p.name === 'TAR');
  const perf = payload.find(p => p.name === 'Performance');
  return (
    <div
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '11px',
      }}
    >
      <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>t = {label?.toFixed(1)} min</p>
      {tar && (
        <p style={{ color: 'var(--accent-blue)', marginBottom: '4px' }}>
          TAR: {tar.value?.toFixed(3)}
          {Number(label) >= T_biomarker ? ' ⚠ above threshold' : ''}
        </p>
      )}
      {perf && (
        <p style={{ color: 'var(--accent-amber)' }}>
          Performance: {(perf.value * 100).toFixed(1)}%
          {Number(label) >= T_behavior ? ' ⚠ below baseline' : ''}
        </p>
      )}
    </div>
  );
};

export default function EarlyDetectionSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="detection"
      ref={ref as RefObject<HTMLElement>}
      style={{ padding: '120px 24px', backgroundColor: 'var(--bg-surface)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
        >
          {/* Section header */}
          <motion.div variants={fadeUpVariants} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span className="section-label">04 / The Early Warning Advantage</span>
          </motion.div>

          {/* Hero number */}
          <motion.div
            variants={fadeUpVariants}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px' }}
          >
            <span
              className="font-instrument gradient-text"
              style={{ fontSize: 'clamp(72px, 14vw, 120px)', lineHeight: 1 }}
            >
              {detectionGap}
            </span>
            <span className="font-dm" style={{ fontSize: '24px', color: 'var(--text-secondary)' }}>minutes</span>
            <p
              className="font-dm"
              style={{
                fontSize: '18px',
                color: 'var(--text-primary)',
                maxWidth: '680px',
                lineHeight: 1.65,
                marginTop: '8px',
              }}
            >
              Our brainwave analysis detects signs of deep mental fatigue <strong>{detectionGap} minutes</strong> before the astronaut's actual performance begins to fail. This creates a critical "early warning" window where mission control can intervene before a mistake happens.
            </p>
          </motion.div>

          {/* Dual-axis chart */}
          <motion.div variants={fadeUpVariants} style={{ width: '100%', height: '500px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={mergedData} margin={{ top: 24, right: 60, bottom: 24, left: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="minute"
                  tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: 'Time (minutes)', position: 'insideBottom', offset: -8, fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}
                />
                {/* Left Y: TAR */}
                <YAxis
                  yAxisId="tar"
                  orientation="left"
                  tick={{ fontSize: 11, fill: 'var(--accent-blue)', fontFamily: 'JetBrains Mono' }}
                  tickLine={false}
                  axisLine={false}
                  domain={[1.0, 3.4]}
                  width={42}
                  label={{ value: 'TAR', angle: -90, position: 'insideLeft', fontSize: 11, fill: 'var(--accent-blue)', fontFamily: 'JetBrains Mono' }}
                />
                {/* Right Y: Performance */}
                <YAxis
                  yAxisId="perf"
                  orientation="right"
                  tick={{ fontSize: 11, fill: 'var(--accent-amber)', fontFamily: 'JetBrains Mono' }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0.7, 1.05]}
                  width={42}
                  tickFormatter={v => `${(v * 100).toFixed(0)}%`}
                  label={{ value: 'Performance', angle: 90, position: 'insideRight', fontSize: 11, fill: 'var(--accent-amber)', fontFamily: 'JetBrains Mono' }}
                />

                <Tooltip content={<CustomTooltip />} />

                {/* Detection window shading */}
                <ReferenceArea
                  yAxisId="tar"
                  x1={T_biomarker}
                  x2={T_behavior}
                  fill="rgba(29,184,138,0.07)"
                  stroke="var(--accent-green)"
                  strokeWidth={0.5}
                  label={{
                    value: `Detection window: ${detectionGap} min`,
                    position: 'insideTop',
                    fontSize: 11,
                    fill: 'var(--accent-green)',
                    fontFamily: 'JetBrains Mono',
                  }}
                />

                {/* TAR alert threshold */}
                <ReferenceLine
                  yAxisId="tar"
                  y={alertThreshold}
                  stroke="var(--accent-red)"
                  strokeDasharray="5 5"
                  strokeWidth={1.5}
                  label={{ value: 'TAR threshold', position: 'insideTopRight', fontSize: 10, fill: 'var(--accent-red)', fontFamily: 'JetBrains Mono' }}
                />
                {/* Performance threshold */}
                <ReferenceLine
                  yAxisId="perf"
                  y={0.85}
                  stroke="var(--accent-amber)"
                  strokeDasharray="5 5"
                  strokeWidth={1.5}
                  label={{ value: 'Perf. 85%', position: 'insideBottomRight', fontSize: 10, fill: 'var(--accent-amber)', fontFamily: 'JetBrains Mono' }}
                />

                {/* TAR line */}
                <Line
                  yAxisId="tar"
                  type="monotone"
                  dataKey="TAR"
                  name="TAR"
                  stroke="var(--accent-blue)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                {/* Performance line */}
                <Line
                  yAxisId="perf"
                  type="monotone"
                  dataKey="performance"
                  name="Performance"
                  stroke="var(--accent-amber)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Three-column callout */}
          <motion.div
            variants={fadeUpVariants}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            {[
              {
                techLabel: 'T biomarker',
                label: 'Brainwave Alert',
                value: `t = ${T_biomarker} min`,
                sublabel: 'First sign of deep fatigue detected',
                badge: <AlertBadge level="green" label="EEG Warning" size="sm" />,
              },
              {
                techLabel: 'Detection gap',
                label: 'Intervention Window',
                value: `${detectionGap} min`,
                sublabel: 'Valuable time to rest or intervene',
                badge: null,
                large: true,
              },
              {
                techLabel: 'T behavioral',
                label: 'Performance Drop',
                value: `t = ${T_behavior} min`,
                sublabel: 'When mistakes start occurring',
                badge: <AlertBadge level="amber" label="Action Required" size="sm" />,
              },
              {
                techLabel: 'Statistical Validation',
                label: 'Scientific Proof',
                value: `p = ${stats.pValue.toFixed(2)}`,
                sublabel: stats.isSignificant ? 'Mathematically proven pattern' : 'Based on initial pilot testing',
                badge: <AlertBadge level={stats.isSignificant ? "green" : "amber"} label={stats.isSignificant ? "p < 0.05" : "Early Stage"} size="sm" />,
              },
            ].map(col => (
              <div
                key={col.label}
                style={{
                  background: 'var(--bg-void)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {col.techLabel}
                </span>
                <span className="section-label" style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>{col.label}</span>
                <span
                  className={col.large ? 'font-instrument gradient-text' : 'font-dm'}
                  style={{
                    fontSize: col.large ? '56px' : '28px',
                    fontWeight: col.large ? undefined : 600,
                    color: col.large ? undefined : 'var(--text-primary)',
                    lineHeight: 1,
                  }}
                >
                  {col.value}
                </span>
                <span className="font-dm" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {col.sublabel}
                </span>
                {col.badge}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
