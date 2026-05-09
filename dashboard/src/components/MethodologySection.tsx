import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal';
import { ChevronDown } from 'lucide-react';

const ACCORDION_ITEMS = [
  {
    title: 'Dataset: Head-Down Tilt Bed Rest (HDBR)',
    body: 'The HDBR protocol induces physiological changes comparable to microgravity exposure, including fluid redistribution, postural adaptation, and progressive cognitive fatigue. This dataset is the primary NASA/ESA-validated terrestrial analog for long-duration spaceflight. Available via Figshare: DOI 10.6084/m9.figshare.12148359. Validated as a direct NEUROSPAT analog in Scientific Reports (2025).',
  },
  {
    title: 'Preprocessing pipeline',
    body: 'Raw EEG downsampled to 256 Hz. Bandpass filter: 0.5 to 45 Hz (zero-phase FIR, MNE 1.7). Notch filter at 50 Hz and 60 Hz harmonics. ICA with 20 components: ocular artifacts identified by correlation with EOG channels and manually confirmed. Epoch rejection: amplitude threshold 100 µV. Remaining epochs: 80 to 90% retention across sessions.',
  },
  {
    title: 'Biomarker computation',
    body: 'Power spectral density computed using Welch method: 4-second windows, 50% overlap, Hamming taper. Absolute power used for TAR computation (not relative) to avoid coupling artifacts described in Klimesch 1999. DMN alpha computed as mean alpha power across P3, Pz, P4, Oz electrodes. P300 latency and amplitude extracted from simulated oddball paradigm calibrated to Cebolla et al. (2022) ISS parameters.',
  },
  {
    title: 'Early detection analysis',
    body: 'Sliding window of 10 epochs (approx. 20 seconds). TAR computed per window across frontal channels (Fz, F3, F4). Individual baseline: first 20% of session data. Alert threshold: individual mean plus 1.5 standard deviations. Detection criterion: 3 consecutive windows above threshold (persistence criterion reduces false positives, per Pusil et al. 2023). Performance proxy: drift-diffusion model with Van Dongen fatigue parameters.',
  },
  {
    title: 'Classification',
    body: 'Features extracted: TAR (frontal and temporal channels), sample entropy (antropy), permutation entropy, Hjorth complexity and mobility. Three classifiers: Random Forest (100 trees), SVM (RBF kernel, C=1), Logistic Regression (L2, C=0.1). Evaluation: 5-fold StratifiedKFold. Significance: permutation test (n=1000 shuffles, p < 0.01). Reported metric: AUC-ROC.',
  },
];

const LIMITATIONS = [
  'Sample size: HDBR dataset has fewer than 15 subjects. Results are directional, not definitive.',
  'Proxy data: HDBR simulates microgravity but is not spaceflight. NEUROSPAT requires ESA and NASA IRB approval.',
  'Simulated P300: where event markers were unavailable, P300 was simulated using Cebolla et al. (2022) parameters.',
  'Behavioral metric: performance degradation modeled using drift-diffusion proxy. Real behavioral data preferred.',
];

function AccordionItem({ title, body, isOpen, onToggle }: { title: string; body: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '16px',
        }}
      >
        <span className="font-dm" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ flexShrink: 0, color: 'var(--text-muted)' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p className="font-dm" style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.75, paddingBottom: '20px', maxWidth: '780px' }}>
              {body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MethodologySection() {
  const { ref, isVisible } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(prev => prev === i ? null : i);

  return (
    <section
      id="methodology"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ padding: '120px 24px', backgroundColor: 'var(--bg-void)' }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
        >
          {/* Header */}
          <motion.div variants={fadeUpVariants} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span className="section-label">06 / Methodology</span>
            <h2 className="font-dm" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 600, color: 'var(--text-primary)' }}>
              How the analysis works
            </h2>
          </motion.div>

          {/* Accordion */}
          <motion.div variants={fadeUpVariants}>
            {ACCORDION_ITEMS.map((item, i) => (
              <AccordionItem
                key={item.title}
                title={item.title}
                body={item.body}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </motion.div>

          {/* Limitations block */}
          <motion.div
            variants={fadeUpVariants}
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderLeft: '3px solid var(--accent-amber)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
            }}
          >
            <h3 className="font-dm" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-amber)', marginBottom: '16px' }}>
              Limitations
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none' }}>
              {LIMITATIONS.map((point, i) => (
                <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--accent-amber)', fontFamily: 'JetBrains Mono', fontSize: '12px', marginTop: '2px', flexShrink: 0 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-dm" style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
