'use client';
import { useState, useRef, useEffect } from 'react';
import { useMotionValueEvent, useMotionValue, animate, motion } from 'motion/react';

export const SectionDetailTitle = ({ title, subtitle, className = '' }: { title: string; subtitle: string; className?: string }) => {
  return (
    <div className={`flex- flex-row ${className}`}>
      <h2 className="text-brand-primary-cta text-[80px]/37.5 font-bold">{title}</h2>
      <p className="text-custom-gray-400 px-2.5 text-[40px]/7">{subtitle}</p>
    </div>
  );
};

export const SectionTitle = ({ title, description, className = '' }: { title: string; description: string; className?: string }) => {
  return (
    <div id={title} className={`flex scroll-mt-[10vh] flex-col gap-5 ${className}`}>
      <h2 className="text-primary-gradient mb-8 text-[40px] font-normal uppercase">
        <span className="text-brand-primary-cta">{title.charAt(0)}</span>
        {title.slice(1)}
      </h2>
      <p className="text-primary-gradient mb-4 text-xl font-semibold">{description}</p>
    </div>
  );
};

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

  useEffect(() => {
    const contentWidth = containerRef.current?.scrollWidth || 0;
    const singleSetWidth = contentWidth / 3;

    const controls = animate(xTranslation, [0, -singleSetWidth], {
      ease: 'linear',
      duration: 40,
      repeat: Infinity,
      repeatType: 'loop'
    });

    return controls.stop;
  }, [xTranslation, data.length]);

  useMotionValueEvent(xTranslation, 'change', (latest) => {
    const contentWidth = containerRef.current?.scrollWidth || 0;
    const singleSetWidth = contentWidth / 3;

    const progress = (Math.abs(latest) % singleSetWidth) / singleSetWidth;
    const index = Math.round(progress * data.length) % data.length;

    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  return (
    <div className={`${className} flex flex-col gap-7 overflow-hidden py-12`}>
      <motion.ul ref={containerRef} style={{ x: xTranslation }} className={`flex gap-8 whitespace-nowrap`}>
        {duplicatedData.map((item, index) => (
          <li key={index} className="shrink-0">
            {renderItem(item, index % data.length)}
          </li>
        ))}
      </motion.ul>

      <div className="flex justify-center gap-5">
        {data.map((_, index) => (
          <div key={index} className={`h-3 w-3 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-brand-primary-cta' : 'bg-custom-gray-700'}`} />
        ))}
      </div>
    </div>
  );
};
