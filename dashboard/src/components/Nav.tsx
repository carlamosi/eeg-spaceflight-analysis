import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Problem', href: '#problem' },
  { label: 'Protocol', href: '#protocol' },
  { label: 'Data', href: '#data' },
  { label: 'Detection', href: '#detection' },
  { label: 'Methods', href: '#methodology' },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '64px',
          backgroundColor: scrolled ? 'rgba(4,5,10,0.92)' : 'var(--bg-void)',
          borderBottom: '1px solid var(--border)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'background-color 300ms ease, backdrop-filter 300ms ease',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: name */}
        <span
          className="font-mono"
          style={{ fontSize: '13px', letterSpacing: '0.15em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}
        >
          Carla Monte
        </span>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ gap: '32px', alignItems: 'center' }}>
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className="font-dm"
                style={{
                  fontSize: '14px',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  position: 'relative',
                  paddingBottom: '4px',
                  transition: 'color 200ms ease',
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--accent-green)',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 200ms ease',
                    borderRadius: '1px',
                  }}
                />
              </a>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(v => !v)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '8px' }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile panel */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          zIndex: 99,
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border)',
          overflow: 'hidden',
          maxHeight: mobileOpen ? '320px' : '0',
          transition: 'max-height 300ms ease',
        }}
      >
        <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="font-dm"
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: '16px',
                color: 'var(--text-primary)',
                padding: '12px 0',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
