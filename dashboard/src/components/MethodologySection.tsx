import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal, fadeUpVariants } from '../hooks/useScrollReveal';
import { ChevronDown } from 'lucide-react';

const ACCORDION_ITEMS = [
  {
    techTitle: 'Dataset: Head-Down Tilt Bed Rest (HDBR)',
    title: 'Simulated Spaceflight Bed Rest',
    body: 'The Head-Down Tilt Bed Rest (HDBR) protocol mimics the way fluids move in the body during microgravity. This is the gold standard for testing how space affects the brain on Earth. **What this means:** We use a realistic analog of space travel to train our detection system.',
  },
  {
    techTitle: 'Preprocessing pipeline',
    title: 'Cleaning the Data',
    body: 'EEG signals are very delicate and easily affected by eye blinks or movement. We use advanced algorithms (ICA) to strip away this "noise" and keep only pure brain activity. **What this means:** We filter out the junk so we can see what the brain is actually doing.',
  },
  {
    techTitle: 'Biomarker computation',
    title: 'Finding the Fatigue Signal',
    body: 'We measure the balance between different types of brainwaves (Theta and Alpha). When the brain is exhausted, this balance shifts in a very specific way. **What this means:** We\'ve identified a unique "fingerprint" in brainwaves that shows up right before you feel tired.',
  },
  {
    techTitle: 'Early detection analysis',
    title: 'The Early Detection Logic',
    body: 'Our system watches the brainwaves in real-time. If it sees the fatigue fingerprint appear for more than a few seconds, it triggers an alert. **What this means:** We don\'t wait for you to make a mistake; we catch the fatigue while it\'s still building up.',
  },
  {
    techTitle: 'Classification & ML',
    title: 'AI and Logic',
    body: 'We use several AI models (like Random Forest) to cross-check the data. We test them over and over to make sure they are accurate. **What this means:** Multiple layers of "digital experts" agree that a fatigue event is happening before the alarm sounds.',
  },
];

const LIMITATIONS = [
  'Limited testing group: Our initial data comes from a small group of participants. Future studies will involve more diverse teams.',
  'Simulated space: Bed rest is a great proxy, but the ultimate test will be on actual missions (NEUROSPAT).',
  'Simulated reactions: Some performance data is modeled based on established fatigue patterns. Direct behavioral testing is the next step.',
];

function AccordionItem({ item, isOpen, onToggle }: { item: typeof ACCORDION_ITEMS[0]; isOpen: boolean; onToggle: () => void }) {
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {item.techTitle}
          </span>
          <span className="font-dm" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
            {item.title}
          </span>
        </div>
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
              {item.body}
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
                item={item}
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
