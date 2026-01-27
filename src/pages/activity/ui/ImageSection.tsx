'use client';
import Image from 'next/image';
import image from '../assets/image1.png';
import { motion } from 'motion/react';

export const ImageSection = () => {
  return (
    <section className="flex h-screen">
      <div className="relative mr-14 flex h-full flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            duration: 0.5
          }}
          className="border-brand-primary-cta bg-background-surface absolute top-20 z-10 box-border h-8 w-8 shrink-0 rounded-full border-8"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="h-full w-full rounded-full bg-current opacity-50"
          />
        </motion.div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: '100%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mt-2 w-[1.5px] origin-top border-l-2 border-dashed border-zinc-700"
        />
      </div>

      <div className="flex h-full flex-1 flex-col justify-center pt-20 pb-20">
        <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-brand-primary-cta mb-8 text-3xl font-bold">
          작은 회사에서 성장하는 법
        </motion.h2>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="relative mb-8 overflow-hidden rounded-xl">
          <Image src={image} alt="Activity Image" width={1920} height={1080} className="h-auto w-full object-cover" />
        </motion.div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="text-primary-gradient text-xl/7">
          프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다.
        </motion.p>
      </div>
    </section>
  );
};
