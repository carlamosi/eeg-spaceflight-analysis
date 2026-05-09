import { motion } from 'framer-motion';
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal';
import type { RefObject } from 'react';
import { EyeOff, Clock, Activity } from 'lucide-react';

const TIMELINE = [
  {
    num: '01',
    title: 'Space changes the brain: Astronauts return with measurable changes in brain structure.',
    citation: 'Hupfeld et al., 2020',
  },
  {
    num: '02',
    title: 'A "silent" decline: Mental fatigue can build up even when performance scores seem normal.',
    citation: 'Salazar et al., 2023',
  },
  {
    num: '03',
    title: 'Missing the signal: Current check-ups are rare (only 3 tests for a 6-month mission).',
    citation: 'Basner et al., 2015',
  },
  {
    num: '04',
    title: 'No easy way back: On a Mars mission, every second counts and evacuation is impossible.',
    citation: '',
  },
];

const CALLOUT_ROWS = [
  { tech: 'Masked impairment', icon: <EyeOff size={18} />, text: 'Brain fatigue often hides behind a "focused" exterior' },
  { tech: 'Sampling bias', icon: <Clock size={18} />, text: 'Weeks of mental "drift" go unnoticed between check-ups' },
  { tech: 'Neural compensation', icon: <Activity size={18} />, text: 'The brain works twice as hard just to maintain normal performance' },
];

export default function ProblemSection() {
  const { ref, isVisible } = useScrollReveal();
  const sectionRef = ref as RefObject<HTMLElement>;

  return (
    <section
      id="problem"
      ref={sectionRef}
      style={{ padding: '120px 24px', backgroundColor: 'var(--bg-void)' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
        >
          {/* Section header */}
          <motion.div variants={fadeUpVariants} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span className="section-label">01 / The Problem</span>
            <h2 className="font-dm" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 600, color: 'var(--text-primary)', maxWidth: '700px', lineHeight: 1.2 }}>
              The most complex system on board has no real-time monitoring
            </h2>
          </motion.div>

          {/* Two-column layout */}
          <motion.div
            variants={fadeUpVariants}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '48px',
              alignItems: 'start',
            }}
          >
            {/* Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {TIMELINE.map((item, i) => (
                <div key={item.num} style={{ display: 'flex', gap: '16px' }}>
                  {/* Left: number + line */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '13px',
                        color: 'var(--accent-green)',
                        lineHeight: '28px',
                        flexShrink: 0,
                      }}
                    >
                      {item.num}
                    </span>
                    {i < TIMELINE.length - 1 && (
                      <div
                        style={{
                          width: '1px',
                          flex: 1,
                          minHeight: '32px',
                          borderLeft: '1px dashed var(--border)',
                          marginTop: '4px',
                        }}
                      />
                    )}
                  </div>

                  {/* Right: content */}
                  <div style={{ paddingBottom: i < TIMELINE.length - 1 ? '32px' : '0' }}>
                    <p className="font-dm" style={{ fontSize: '16px', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: item.citation ? '6px' : '0' }}>
                      {item.title}
                    </p>
                    {item.citation && (
                      <p className="font-dm" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        {item.citation}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right callout */}
            <div
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
              }}
            >
              <p
                className="font-dm"
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '16px',
                }}
              >
                What current monitoring misses
              </p>

              {CALLOUT_ROWS.map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px 0',
                    borderBottom: i < CALLOUT_ROWS.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <div style={{ color: 'var(--accent-green)', flexShrink: 0 }}>{row.icon}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {row.tech}
                    </span>
                    <p className="font-dm" style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                      {row.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
