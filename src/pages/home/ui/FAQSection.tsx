'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, CornerDownRight } from 'lucide-react';

import { SectionTitle } from './Components';
import { FAQData } from '../data/FAQData';

const CATEGORY = ['Common', 'Android', 'Design', 'iOS', 'Web', 'Server', 'Basic'] as const;

export const FAQSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORY)[number]>('Common');

  return (
    <section className="flex h-screen flex-col gap-16">
      <SectionTitle title="faq" description="자주 묻는 질문" />
      <div className="flex flex-row gap-16">
        <div className="flex flex-col gap-13">
          {CATEGORY.map((category) => (
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
          {FAQData[selectedCategory].map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex cursor-pointer flex-col" onClick={() => setIsOpen(!isOpen)}>
      <div className="bg-surface-elevated flex flex-row items-center justify-between gap-2 rounded-2xl px-5 py-4">
        <h3 className="text-xl/7 text-white">
          <span className="text-[28px]/7 font-bold">Q.</span> {question}
        </h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="text-brand text-text-primary h-6 w-6" aria-hidden="true" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <p className="flex flex-row gap-3 px-14 pt-5 text-xl/7 text-white">
              <CornerDownRight /> {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
