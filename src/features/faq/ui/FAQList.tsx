'use client';
import { useState } from 'react';
import { ChevronDown, CornerDownRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Faq } from 'entities/faq';

import { PART } from 'shared/constants/part';
import { Part } from 'shared/types/part';

export const FAQList = ({ data }: { data: Faq[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<Part>('Common');

  return (
    <div className="flex flex-row gap-16">
      <div className="flex flex-col gap-13">
        {PART.map((category) => (
          <button
            key={category}
            className={`cursor-pointer rounded-2xl text-2xl font-bold transition-all duration-300 ${selectedCategory === category ? 'text-brand-primary-cta' : 'text-primary-gradient hover:text-brand-primary-light'}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-5">
        {data.map((item, index) => (
          <FAQItem key={index} data={item} category={selectedCategory} />
        ))}
      </div>
    </div>
  );
};

const FAQItem = ({ data, category }: { data: Faq; category: Part }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (data.part !== category) return null;

  return (
    <div className="flex cursor-pointer flex-col" onClick={() => setIsOpen(!isOpen)}>
      <div className="bg-surface-elevated flex flex-row items-center justify-between gap-2 rounded-2xl px-5 py-4">
        <h3 className="text-xl/7 text-white">
          <span className="text-[28px]/7 font-bold">Q.</span> {data.question}
        </h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="text-brand text-text-primary h-6 w-6" aria-hidden="true" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <p className="flex flex-row gap-3 px-14 pt-5 text-xl/7 text-white">
              <CornerDownRight /> {data.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
