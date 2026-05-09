import type { ReactNode } from 'react';

interface ChartWrapperProps {
  title: string;
  badge?: string;
  caption?: string;
  children: ReactNode;
  height?: number;
}

export default function ChartWrapper({ title, badge, caption, children, height = 240 }: ChartWrapperProps) {
  return (
    <div
      className="card-base"
      style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <h3 className="font-dm" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
          {title}
        </h3>
        {badge && (
          <span
            className="font-mono"
            style={{
              fontSize: '10px',
              color: 'var(--accent-green)',
              backgroundColor: 'rgba(29,184,138,0.10)',
              border: '1px solid var(--accent-green)',
              borderRadius: 'var(--radius-sm)',
              padding: '2px 8px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              whiteSpace: 'nowrap',
            }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Chart area */}
      <div style={{ height, width: '100%' }}>
        {children}
      </div>

      {/* Caption */}
      {caption && (
        <p className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          {caption}
        </p>
      )}
    </div>
  );
}
