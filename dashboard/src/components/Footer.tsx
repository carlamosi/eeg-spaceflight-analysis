import { ExternalLink, Linkedin } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Problem', href: '#problem' },
  { label: 'Protocol', href: '#protocol' },
  { label: 'Data', href: '#data' },
  { label: 'Detection', href: '#detection' },
  { label: 'Methodology', href: '#methodology' },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--bg-void)',
        padding: '48px 24px 24px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Three-column main footer */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            marginBottom: '32px',
          }}
        >
          {/* Left: identity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span className="font-mono" style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Carla Monté<br />
              TKS Fellow<br />
              March 2026
            </span>
          </div>

          {/* Center: nav */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono"
                style={{ fontSize: '12px', color: 'var(--text-muted)', transition: 'color 200ms' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: GitHub + tag */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a
              href="https://github.com/carlamosi/eeg-spaceflight-analysis"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-muted)',
                transition: 'color 200ms',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)')}
            >
              <ExternalLink size={14} />
              <span className="font-mono" style={{ fontSize: '12px' }}>github.com/carlamosi/eeg-spaceflight-analysis</span>
            </a>

            <a
              href="https://www.linkedin.com/in/carlamontesihuro/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-muted)',
                transition: 'color 200ms',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)')}
            >
              <Linkedin size={14} />
              <span className="font-mono" style={{ fontSize: '12px' }}>linkedin.com/in/carlamontesihuro</span>
            </a>
            <span className="font-mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Built with real science.</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '20px',
          }}
        >
          <p className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Dataset: HDBR via Figshare DOI 10.6084/m9.figshare.12148359 · Analysis: Python + MNE 1.7 · Visualization: React + Recharts · License: MIT
          </p>
        </div>
      </div>
    </footer>
  );
}
