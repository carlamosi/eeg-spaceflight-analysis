import type { RefObject } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal';
import ChartWrapper from './ChartWrapper';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
  ResponsiveContainer, BarChart, Bar, Legend,
} from 'recharts';
import {
  TAR_timeseries, alertThreshold, P300_data, astronaut_alpha_power,
} from '../data/empiricalData';

// Stylized SVG scalp topography for Alpha DMN power
function AlphaTopography() {
  // 10-20 electrode positions (normalized to SVG 200x200)
  const electrodes = [
    { id: 'Fp1', cx: 80,  cy: 30,  power: 0.3 },
    { id: 'Fp2', cx: 120, cy: 30,  power: 0.3 },
    { id: 'F7',  cx: 45,  cy: 60,  power: 0.2 },
    { id: 'F3',  cx: 78,  cy: 58,  power: 0.35 },
    { id: 'Fz',  cx: 100, cy: 52,  power: 0.4 },
    { id: 'F4',  cx: 122, cy: 58,  power: 0.35 },
    { id: 'F8',  cx: 155, cy: 60,  power: 0.2 },
    { id: 'T7',  cx: 30,  cy: 100, power: 0.25 },
    { id: 'C3',  cx: 70,  cy: 97,  power: 0.5 },
    { id: 'Cz',  cx: 100, cy: 92,  power: 0.55 },
    { id: 'C4',  cx: 130, cy: 97,  power: 0.5 },
    { id: 'T8',  cx: 170, cy: 100, power: 0.25 },
    { id: 'P7',  cx: 45,  cy: 140, power: 0.65 },
    { id: 'P3',  cx: 78,  cy: 137, power: 0.85 },
    { id: 'Pz',  cx: 100, cy: 133, power: 0.90 },
    { id: 'P4',  cx: 122, cy: 137, power: 0.85 },
    { id: 'P8',  cx: 155, cy: 140, power: 0.65 },
    { id: 'O1',  cx: 78,  cy: 168, power: 0.80 },
    { id: 'Oz',  cx: 100, cy: 172, power: 0.75 },
    { id: 'O2',  cx: 122, cy: 168, power: 0.78 },
  ];

  // Interpolate between text-muted (low) and accent-violet (high)
  const getColor = (power: number) => {
    // power 0..1 -> color
    const r = Math.round(139 * power + 74 * (1 - power));
    const g = Math.round(111 * power + 85 * (1 - power));
    const b = Math.round(245 * power + 104 * (1 - power));
    return `rgb(${r},${g},${b})`;
  };

  const dmnChannels = new Set(['P3', 'Pz', 'P4', 'Oz', 'O1', 'O2']);

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 200 210" style={{ width: '180px', flexShrink: 0 }} aria-label="Alpha power topography scalp map">
        {/* Head outline */}
        <ellipse cx="100" cy="103" rx="82" ry="90" fill="none" stroke="var(--border)" strokeWidth="1.5" />
        {/* Nose */}
        <path d="M90 16 Q100 6 110 16" fill="none" stroke="var(--border)" strokeWidth="1.2" />
        {/* Ears */}
        <path d="M18 95 Q10 103 18 111" fill="none" stroke="var(--border)" strokeWidth="1.2" />
        <path d="M182 95 Q190 103 182 111" fill="none" stroke="var(--border)" strokeWidth="1.2" />

        {electrodes.map(el => (
          <g key={el.id}>
            {dmnChannels.has(el.id) && (
              <circle cx={el.cx} cy={el.cy} r="10" fill="none" stroke="var(--accent-violet)" strokeWidth="1" strokeOpacity="0.4" />
            )}
            <circle cx={el.cx} cy={el.cy} r="5" fill={getColor(el.power)} />
            <text x={el.cx} y={el.cy + 16} textAnchor="middle" fill="var(--text-muted)" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              {el.id}
            </text>
          </g>
        ))}
      </svg>

      {/* Color scale legend */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <span className="font-mono" style={{ fontSize: '9px', color: 'var(--accent-violet)' }}>High</span>
        <div
          style={{
            width: '12px',
            height: '80px',
            background: 'linear-gradient(to bottom, #8b6ff5, #4a5568)',
            borderRadius: '6px',
          }}
        />
        <span className="font-mono" style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Low</span>
      </div>
    </div>
  );
}

// Custom tooltip for TAR chart
const TARTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '10px 14px' }}>
      <p className="font-mono" style={{ fontSize: '12px', color: 'var(--accent-blue)' }}>
        TAR: {payload[0]?.value?.toFixed(3)}
      </p>
    </div>
  );
};

export default function DataSection() {
  const { ref, isVisible } = useScrollReveal();

  // Downsample TAR for chart performance
  const tarSampled = TAR_timeseries.filter((_, i) => i % 3 === 0);

  return (
    <section
      id="data"
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
            <span className="section-label">03 / The Data</span>
            <h2 className="font-dm" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 600, color: 'var(--text-primary)' }}>
              Analysis on spaceflight analog EEG data
            </h2>

            {/* Dataset callout */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                flexWrap: 'wrap',
                alignSelf: 'flex-start',
              }}
            >
              <span className="font-dm" style={{ fontSize: '15px', color: 'var(--text-primary)' }}>
                Dataset: NEUROSPAT ISS (Pusil et al. 2023) & PhysioNet
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: '11px',
                  color: 'var(--accent-green)',
                  background: 'rgba(29,184,138,0.10)',
                  border: '1px solid var(--accent-green)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '2px 8px',
                }}
              >
                Empirical Research Data
              </span>
            </div>
            <p className="font-dm" style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '680px' }}>
              Integrating actual findings from 5 astronauts aboard the International Space Station (Neurospat experiment) alongside validated fatigue trial datasets.
            </p>
          </motion.div>

          {/* 2x2 chart grid */}
          <motion.div
            variants={fadeUpVariants}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
              gap: '20px',
            }}
          >
            {/* Panel 1: TAR trajectory */}
            <ChartWrapper
              title="TAR Temporal Trajectory"
              badge="Biomarker 01"
              caption="Source: HDBR analog session · Welch PSD · Frontal channels (Fz, F3, F4)"
              height={240}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tarSampled} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="minute"
                    tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}
                    tickLine={false}
                    axisLine={false}
                    label={{ value: 'Time (min)', position: 'insideBottom', offset: -4, fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}
                    tickLine={false}
                    axisLine={false}
                    domain={[1.0, 3.2]}
                    width={36}
                  />
                  <Tooltip content={<TARTooltip />} />
                  <ReferenceLine
                    y={alertThreshold}
                    stroke="var(--accent-red)"
                    strokeDasharray="4 4"
                    label={{ value: 'Alert threshold', position: 'insideTopRight', fontSize: 10, fill: 'var(--accent-red)', fontFamily: 'JetBrains Mono' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="TAR"
                    stroke="var(--accent-blue)"
                    strokeWidth={1.5}
                    dot={false}
                    activeDot={{ r: 4, fill: 'var(--accent-blue)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartWrapper>

            {/* Panel 2: Alpha topography */}
            <ChartWrapper
              title="Alpha Power Distribution"
              badge="Biomarker 02"
              caption="DMN-relevant posterior channels highlighted (P3, Pz, P4, Oz)"
              height={240}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <AlphaTopography />
              </div>
            </ChartWrapper>

            {/* Panel 3: P300 waveform */}
            <ChartWrapper
              title="P300 ERP Component"
              badge="Biomarker 03"
              caption="Pz electrode · 2-stimulus oddball paradigm · Cebolla et al. 2022 parameters"
              height={240}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={P300_data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="ms"
                    tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}
                    tickLine={false}
                    axisLine={false}
                    label={{ value: 'Time post-stimulus (ms)', position: 'insideBottom', offset: -4, fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}
                    tickLine={false}
                    axisLine={false}
                    label={{ value: 'µV', angle: -90, position: 'insideLeft', fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}
                    width={32}
                  />
                  <Tooltip
                    contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontFamily: 'JetBrains Mono', fontSize: '11px' }}
                    labelStyle={{ color: 'var(--text-muted)' }}
                  />
                  <ReferenceLine x={0} stroke="var(--border-bright)" strokeWidth={1} />
                  {/* P300 window shading via reference area would need ReferenceArea — using dashed lines instead */}
                  <ReferenceLine x={250} stroke="var(--accent-teal)" strokeDasharray="2 4" strokeWidth={1} />
                  <ReferenceLine x={500} stroke="var(--accent-teal)" strokeDasharray="2 4" strokeWidth={1} />
                  <Legend
                    iconType="plainline"
                    formatter={(value) => <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)' }}>{value}</span>}
                  />
                  <Line type="monotone" dataKey="baseline" name="Baseline" stroke="var(--accent-teal)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="inflight" name="In-flight" stroke="var(--accent-amber)" strokeWidth={1.5} strokeDasharray="5 4" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartWrapper>

            {/* Panel 4: Astronaut Alpha Power */}
            <ChartWrapper
              title="Alpha Power: Baseline vs In-flight (5 Astronauts)"
              caption="Significant reduction (p < 0.001) in Default Mode Network · Source: Pusil et al. 2023"
              height={240}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={astronaut_alpha_power} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="subject"
                    tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}
                    tickLine={false}
                    axisLine={false}
                    width={36}
                    tickFormatter={v => `${(v * 100).toFixed(0)}%`}
                  />
                  <Tooltip
                    contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontFamily: 'JetBrains Mono', fontSize: '11px' }}
                    formatter={(v: unknown) => [`${((v as number) * 100).toFixed(1)}%`]}
                  />
                  <Legend
                    iconType="square"
                    formatter={(value) => <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)' }}>{value}</span>}
                  />
                  <Bar dataKey="baseline" name="Pre-flight" fill="var(--accent-blue)" fillOpacity={0.8} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="inflight" name="In-flight" fill="var(--accent-amber)" fillOpacity={0.8} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
