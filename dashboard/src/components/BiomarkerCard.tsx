import type { ReactNode } from 'react';

interface BiomarkerCardProps {
  accentColor: string;
  tag: string;
  title: string;
  metric: string;
  body: string;
  icon: ReactNode;
}

export default function BiomarkerCard({ accentColor, tag, title, metric, body, icon }: BiomarkerCardProps) {
  return (
    <div
      style={{
        background: 'var(--bg-void)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 200ms ease, transform 200ms ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = accentColor;
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: '3px', backgroundColor: accentColor }} />

      <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Icon */}
        <div style={{ color: accentColor }}>{icon}</div>

        {/* Title */}
        <h3 className="font-dm" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)' }}>
          {title}
        </h3>

        {/* Metric */}
        <p className="font-mono" style={{ fontSize: '12px', color: accentColor, letterSpacing: '0.05em' }}>
          {metric}
        </p>

        {/* Body */}
        <p className="font-dm" style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
          {body}
        </p>

        {/* Bottom tag */}
        <span
          className="font-mono"
          style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginTop: '8px',
          }}
        >
          {tag}
        </span>
      </div>
    </div>
  );
}
