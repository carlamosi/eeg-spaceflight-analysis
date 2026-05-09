import { motion } from 'framer-motion';
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal';
import BiomarkerCard from './BiomarkerCard';
import AlertBadge from './AlertBadge';

// Inline SVG icons for biomarker cards
const WaveIcon = ({ color }: { color: string }) => (
  <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden="true">
    <path d="M2 10 Q5 2 8 10 Q11 18 14 10 Q17 2 20 10 Q23 18 26 10" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

// Alert pipeline flow diagram
function AlertFlowDiagram() {
  const nodes = [
    { id: 'baseline', label: 'BASELINE', sub: 'Pre-launch individual profile' },
    { id: 'session', label: 'SESSION EEG', sub: '20 min, 3x per week' },
    { id: 'processing', label: 'PROCESSING', sub: 'vs. personal baseline' },
    { id: 'index', label: 'COGNITIVE INDEX', sub: 'Alert level computed', isCenter: true },
    { id: 'response', label: 'RESPONSE', sub: 'Crew + ground team' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        overflowX: 'auto',
        padding: '32px 24px',
        background: 'var(--bg-void)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {nodes.map((node, i) => (
        <div key={node.id} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
          {/* Node */}
          {node.isCenter ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                padding: '20px 24px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-bright)',
                borderRadius: 'var(--radius-lg)',
                minWidth: '160px',
              }}
            >
              <span className="font-mono" style={{ fontSize: '11px', color: 'var(--accent-green)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {node.label}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                <AlertBadge level="green" label="Normal range" size="sm" />
                <AlertBadge level="amber" label="Moderate: review" size="sm" />
                <AlertBadge level="red" label="Priority review" size="sm" />
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                padding: '16px 20px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                minWidth: '120px',
                textAlign: 'center',
              }}
            >
              <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                {node.label}
              </span>
              <span className="font-dm" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {node.sub}
              </span>
            </div>
          )}

          {/* Arrow between nodes */}
          {i < nodes.length - 1 && (
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px', flexShrink: 0 }}>
              <svg width="24" height="12" viewBox="0 0 24 12" fill="none" aria-hidden="true">
                <path d="M0 6 H20 M16 2 L20 6 L16 10" stroke="var(--border-bright)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const BIOMARKER_CARDS = [
  {
    accentColor: 'var(--accent-blue)',
    tag: 'BIOMARKER 01',
    title: 'Theta / Alpha Ratio',
    metric: 'TAR = theta / alpha power',
    body: 'Elevated TAR in frontal channels signals cognitive fatigue before behavioral performance drops. Independent of mood or cooperation.',
  },
  {
    accentColor: 'var(--accent-violet)',
    tag: 'BIOMARKER 02',
    title: 'Alpha Power in DMN',
    metric: 'Posterior parieto-occipital channels',
    body: 'Reduction in alpha power in the default mode network mirrors changes seen in early neurodegenerative research, detectable months before symptoms.',
  },
  {
    accentColor: 'var(--accent-teal)',
    tag: 'BIOMARKER 03',
    title: 'P300 Component',
    metric: 'Latency and amplitude at Pz',
    body: 'Longer latency and reduced amplitude mean the brain takes longer to evaluate relevant information. Measured in astronauts aboard the ISS (Cebolla et al. 2022).',
  },
];

export default function ProtocolSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="protocol"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: '120px 24px', backgroundColor: 'var(--bg-surface)' }}
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
            <span className="section-label">02 / The Protocol</span>
            <h2 className="font-dm" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 600, color: 'var(--text-primary)', maxWidth: '600px', lineHeight: 1.25 }}>
              Three biomarkers. One continuous signal. One alert system.
            </h2>
          </motion.div>

          {/* Biomarker cards */}
          <motion.div
            variants={fadeUpVariants}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {BIOMARKER_CARDS.map(card => (
              <BiomarkerCard
                key={card.tag}
                {...card}
                icon={<WaveIcon color={card.accentColor} />}
              />
            ))}
          </motion.div>

          {/* Alert flow */}
          <motion.div variants={fadeUpVariants}>
            <p className="font-dm" style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Alert Pipeline
            </p>
            <AlertFlowDiagram />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
