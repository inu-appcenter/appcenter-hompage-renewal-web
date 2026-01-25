'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useMotionValueEvent, useMotionValue, animate, motion } from 'framer-motion';

interface CarouselProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export const Carousel = <T,>({ data, renderItem, className = '' }: CarouselProps<T>) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLUListElement>(null);
  const xTranslation = useMotionValue(0);

  const duplicatedData = [...data, ...data, ...data];

  // 1. 애니메이션 함수를 useCallback으로 감싸 일관성 유지
  const startAnimation = useCallback(() => {
    const contentWidth = containerRef.current?.scrollWidth || 0;
    const singleSetWidth = contentWidth / 3;
    if (singleSetWidth === 0) return;

    const startX = xTranslation.get();
    const remainingDistance = Math.abs(-singleSetWidth - startX);
    const duration = 40 * (remainingDistance / singleSetWidth);

    // animate를 변수에 할당하지 않고 바로 실행 (이전 애니메이션은 자동 중지됨)
    animate(xTranslation, -singleSetWidth, {
      ease: 'linear',
      duration: duration > 0 ? duration : 40,
      onComplete: () => {
        xTranslation.set(0);
        startAnimation();
      }
    });
  }, [data.length, xTranslation]);

  useEffect(() => {
    startAnimation();
    // useEffect 클린업에서 모든 xTranslation 애니메이션 중지
    return () => xTranslation.stop();
  }, [startAnimation, xTranslation]);

  useMotionValueEvent(xTranslation, 'change', (latest) => {
    const contentWidth = containerRef.current?.scrollWidth || 0;
    const singleSetWidth = contentWidth / 3;
    if (singleSetWidth === 0) return;

    const progress = (Math.abs(latest) % singleSetWidth) / singleSetWidth;
    const index = Math.round(progress * data.length) % data.length;

    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  const handleDotClick = (index: number) => {
    const contentWidth = containerRef.current?.scrollWidth || 0;
    const singleSetWidth = contentWidth / 3;
    const itemWidth = singleSetWidth / data.length;
    const targetX = -(index * itemWidth);

    // 클릭 시 바로 animate 호출 (기존 linear 루프는 여기서 자동 중단됨)
    animate(xTranslation, targetX, {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      onComplete: () => {
        // 이동이 끝나면 다시 부드럽게 루프 시작
        startAnimation();
      }
    });

    setActiveIndex(index);
  };

  return (
    <div className={`${className} flex flex-col gap-7 overflow-hidden py-12`}>
      <motion.ul ref={containerRef} style={{ x: xTranslation }} className="flex gap-8 whitespace-nowrap">
        {duplicatedData.map((item, index) => (
          <li key={index} className="shrink-0">
            {renderItem(item, index % data.length)}
          </li>
        ))}
      </motion.ul>

      <div className="flex justify-center gap-5">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 focus:outline-none ${activeIndex === index ? 'bg-brand-primary-cta scale-125' : 'bg-custom-gray-700'}`}
          />
        ))}
      </div>
    </div>
  );
};
