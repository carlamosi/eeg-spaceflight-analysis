import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Animated EEG waveform component using RAF + canvas-like SVG approach
function EEGWaveform() {
  const pathRef1 = useRef<SVGPathElement>(null);
  const pathRef2 = useRef<SVGPathElement>(null);
  const pathRef3 = useRef<SVGPathElement>(null);
  const frameRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const W = 480;
    const H = 200;
    const cy = H / 2;

    // Seeded pseudo-random for consistent noise per frame
    let seed = 1;
    const rand = () => {
      seed ^= seed << 13;
      seed ^= seed >> 17;
      seed ^= seed << 5;
      return (seed >>> 0) / 0xffffffff - 0.5;
    };

    const buildPath = (
      amplitude: number,
      frequency: number,
      phaseOffset: number,
      t: number,
      noiseAmt: number,
      nPoints = 80
    ) => {
      seed = Math.floor(t * 100) ^ Math.floor(phaseOffset * 100);
      const pts: [number, number][] = [];
      for (let i = 0; i <= nPoints; i++) {
        const x = (i / nPoints) * W;
        const phase = (i / nPoints) * Math.PI * 2 * frequency + t + phaseOffset;
        const y = cy - amplitude * Math.sin(phase) - amplitude * 0.3 * Math.sin(phase * 2.1) + rand() * noiseAmt;
        pts.push([x, y]);
      }
      // Build smooth cubic bezier path
      let d = `M ${pts[0][0]} ${pts[0][1]}`;
      for (let i = 1; i < pts.length - 1; i++) {
        const cpx = (pts[i][0] + pts[i - 1][0]) / 2;
        const cpy = (pts[i][1] + pts[i - 1][1]) / 2;
        d += ` Q ${pts[i - 1][0]} ${pts[i - 1][1]} ${cpx} ${cpy}`;
      }
      d += ` L ${pts[pts.length - 1][0]} ${pts[pts.length - 1][1]}`;
      return d;
    };

    const animate = () => {
      tRef.current += 0.025;
      const t = tRef.current;
      if (pathRef1.current) pathRef1.current.setAttribute('d', buildPath(38, 3, 0, t, 3));
      if (pathRef2.current) pathRef2.current.setAttribute('d', buildPath(22, 4.5, Math.PI * 0.4, t, 2));
      if (pathRef3.current) pathRef3.current.setAttribute('d', buildPath(14, 6, Math.PI * 0.9, t, 1.5));
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
      <svg
        viewBox="0 0 480 200"
        style={{ width: '100%', overflow: 'visible' }}
        aria-label="Animated EEG waveforms showing three frequency bands"
      >
        {/* Grid lines */}
        {[50, 100, 150].map(y => (
          <line key={y} x1={0} y1={y} x2={480} y2={y} stroke="var(--border)" strokeWidth={0.5} />
        ))}

        {/* Threshold labels */}
        {[
          { y: 50, label: 'gamma' },
          { y: 100, label: 'alpha' },
          { y: 150, label: 'theta' },
        ].map(({ y, label }) => (
          <text
            key={label}
            x={6}
            y={y - 4}
            fill="var(--text-muted)"
            fontSize={10}
            fontFamily="JetBrains Mono, monospace"
          >
            {label}
          </text>
        ))}

        {/* Waveform 3 — teal, faint */}
        <path
          ref={pathRef3}
          fill="none"
          stroke="var(--accent-teal)"
          strokeWidth={1}
          strokeOpacity={0.25}
        />
        {/* Waveform 2 — violet, faint */}
        <path
          ref={pathRef2}
          fill="none"
          stroke="var(--accent-violet)"
          strokeWidth={1.5}
          strokeOpacity={0.35}
        />
        {/* Waveform 1 — blue, primary */}
        <path
          ref={pathRef1}
          fill="none"
          stroke="var(--accent-blue)"
          strokeWidth={2}
          strokeOpacity={0.9}
        />
      </svg>

      {/* Channel label */}
      <div
        className="font-mono"
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          fontSize: '11px',
          color: 'var(--text-muted)',
        }}
      >
        Fz · Pz · Oz
      </div>
    </div>
  );
}

const STAT_CARDS = [
  { value: '86B',  label: 'neurons in the human brain',   color: 'var(--accent-blue)'   },
  { value: '6mo',  label: 'average ISS mission duration', color: 'var(--accent-violet)' },
  { value: '3x',   label: 'cognitive biomarkers tracked', color: 'var(--accent-teal)'   },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{ minHeight: '100vh', backgroundColor: 'var(--bg-void)', paddingTop: '64px' }}
      className="dot-grid"
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '64px',
        }}
      >
        {/* Main two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '64px',
            alignItems: 'center',
            marginTop: '-4vh',
          }}
        >
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            <span
              className="font-mono"
              style={{ fontSize: '12px', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}
            >
              Spaceflight Neuroscience / 2026
            </span>

            <h1
              className="font-instrument"
              style={{
                fontSize: 'clamp(42px, 6vw, 72px)',
                lineHeight: 1.05,
                color: 'var(--text-primary)',
              }}
            >
              86 Billion Reasons to Monitor the Brain in Space
            </h1>

            <p
              className="font-dm"
              style={{
                fontSize: '18px',
                color: 'var(--text-secondary)',
                maxWidth: '520px',
                lineHeight: 1.7,
              }}
            >
              A continuous EEG monitoring protocol for long-duration spaceflight. The tools exist. The protocol does not. Yet.
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <a
                href="#data"
                className="font-dm"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: '40px',
                  padding: '0 20px',
                  backgroundColor: 'var(--accent-green)',
                  color: 'var(--bg-void)',
                  fontSize: '14px',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'filter 200ms ease, box-shadow 200ms ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1.1)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 24px var(--glow-green)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                }}
              >
                View the Analysis
              </a>

              <a
                href="https://github.com/camosi/eeg-spaceflight-analysis"
                target="_blank"
                rel="noopener noreferrer"
                className="font-dm"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: '40px',
                  padding: '0 20px',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  fontWeight: 400,
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-bright)',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'border-color 200ms ease, background-color 200ms ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent-green)';
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--glow-green)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border-bright)';
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                }}
              >
                Read the Paper
              </a>
            </div>
          </motion.div>

          {/* Right column: EEG waveform */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '32px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <EEGWaveform />
          </motion.div>
        </div>

        {/* Stat cards row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          {STAT_CARDS.map(card => (
            <div
              key={card.value}
              className="card-base"
              style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <span
                className="font-instrument"
                style={{ fontSize: '48px', color: card.color, lineHeight: 1 }}
              >
                {card.value}
              </span>
              <span
                className="font-dm"
                style={{ fontSize: '14px', color: 'var(--text-secondary)' }}
              >
                {card.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
