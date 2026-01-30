'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';

export const FullPageScroll = ({ children }: { children: React.ReactNode }) => {
  const [currentY, setCurrentY] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const isAnimating = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const touchStartY = useRef<number | null>(null);
  const pathname = usePathname();

  /* -------------------------------
   * Route 변경 시 초기화
   * ------------------------------- */
  useEffect(() => {
    setIsChanging(true);
    setCurrentY(0);
    isAnimating.current = false;

    const timer = setTimeout(() => {
      setIsChanging(false);
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  /* -------------------------------
   * 공통 스크롤 계산
   * ------------------------------- */
  const scrollToNext = (direction: 1 | -1) => {
    if (!containerRef.current) return;

    const viewHeight = window.innerHeight;
    const contentHeight = containerRef.current.scrollHeight;
    const maxScroll = contentHeight - viewHeight;

    let nextY = currentY;

    if (direction > 0) {
      nextY = Math.ceil((currentY + 1) / viewHeight) * viewHeight;
      if (nextY > maxScroll) nextY = maxScroll;
    } else {
      nextY = Math.floor((currentY - 1) / viewHeight) * viewHeight;
      if (nextY < 0) nextY = 0;
    }

    if (nextY !== currentY) {
      isAnimating.current = true;
      setCurrentY(nextY);
    }
  };

  /* -------------------------------
   * Wheel (Desktop)
   * ------------------------------- */
  const handleWheel = (e: React.WheelEvent) => {
    if (isAnimating.current || isChanging) return;
    if (Math.abs(e.deltaY) < 20) return;

    scrollToNext(e.deltaY > 0 ? 1 : -1);
  };

  /* -------------------------------
   * Touch (Mobile)
   * ------------------------------- */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isAnimating.current || isChanging || touchStartY.current === null) return;

    const endY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - endY;

    // 너무 짧은 스와이프 무시
    if (Math.abs(deltaY) < 50) return;

    scrollToNext(deltaY > 0 ? 1 : -1);
    touchStartY.current = null;
  };

  /* -------------------------------
   * Render
   * ------------------------------- */
  return (
    <div
      className="bg-background fixed inset-0 touch-pan-y overflow-hidden overscroll-none"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ visibility: isChanging ? 'hidden' : 'visible' }}
    >
      <motion.div
        ref={containerRef}
        className="flex w-full flex-col"
        animate={{ y: -currentY }}
        transition={isChanging ? { duration: 0 } : { duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] }}
        onAnimationComplete={() => {
          isAnimating.current = false;
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
