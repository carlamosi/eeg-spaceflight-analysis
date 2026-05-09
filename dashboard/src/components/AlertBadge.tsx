interface AlertBadgeProps {
  level: 'green' | 'amber' | 'red';
  label: string;
  size?: 'sm' | 'md';
}

const config = {
  green: { color: 'var(--accent-green)', bg: 'rgba(29,184,138,0.12)' },
  amber: { color: 'var(--accent-amber)', bg: 'rgba(232,160,48,0.12)' },
  red:   { color: 'var(--accent-red)',   bg: 'rgba(224,82,82,0.12)'  },
};

export default function AlertBadge({ level, label, size = 'md' }: AlertBadgeProps) {
  const { color, bg } = config[level];
  return (
    <span
      className="font-mono"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: size === 'sm' ? '11px' : '12px',
        color,
        backgroundColor: bg,
        border: `1px solid ${color}`,
        borderRadius: 'var(--radius-sm)',
        padding: size === 'sm' ? '2px 8px' : '4px 10px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: color,
          flexShrink: 0,
        }}
      />
      {label}
    </span>
  );
}
