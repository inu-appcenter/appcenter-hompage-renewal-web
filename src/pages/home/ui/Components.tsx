'use client';
import { useState, useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';

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
    <div className={`flex flex-col gap-5 ${className}`}>
      <h2 className="text-primary-gradient mb-8 text-[40px] font-normal">
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
  const scrollRef = useRef<HTMLUListElement>(null);

  const { scrollXProgress } = useScroll({
    container: scrollRef
  });

  useMotionValueEvent(scrollXProgress, 'change', (latest) => {
    if (data.length <= 1) return;
    const index = Math.round(latest * (data.length - 1));
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  return (
    <div className={`flex flex-col gap-10`}>
      <ul ref={scrollRef} className={`no-scrollbar flex flex-row overflow-x-auto px-8 pt-12 ${className}`}>
        {data.map((item, index) => (
          <li key={index} className="shrink-0">
            {renderItem(item, index)}
          </li>
        ))}
      </ul>

      <div className="flex justify-center gap-7">
        {data.map((_, index) => (
          <div key={index} className="relative h-3 w-3">
            <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${activeIndex === index ? 'bg-brand-primary-cta' : 'bg-custom-gray-700'}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
