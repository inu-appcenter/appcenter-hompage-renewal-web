'use client';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const { scrollY } = useScroll();

  const smoothY = useSpring(scrollY, {
    stiffness: 10000,
    damping: 1200,
    restDelta: 0.01
  });

  const y = useTransform(smoothY, (value) => -value);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <>
      <div style={{ height: contentHeight }} />

      <motion.div ref={contentRef} style={{ y, position: 'fixed', top: 0, left: 0, width: '100%', overflow: 'hidden' }}>
        {children}
      </motion.div>
    </>
  );
}
