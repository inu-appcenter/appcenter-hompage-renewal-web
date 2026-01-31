'use client';
import Image from 'next/image';
import { Carousel, SectionDetailTitle } from './Components';
import myImage from 'shared/image/image.jpg';
import { motion } from 'motion/react';
import { AsyncBoundary } from 'shared/error/AsyncBoundary';

interface WorkshopData {
  title: string;
  date: string;
}
const data: WorkshopData[] = [
  { title: '워크숍1', date: '2026/01/06' },
  { title: '워크숍2', date: '2026/02/15' },
  { title: '워크숍3', date: '2026/03/20' },
  { title: '워크숍4', date: '2026/03/20' },
  { title: '워크숍5', date: '2026/03/20' }
];
export const WorkshopSection = () => {
  return (
    <section className="flex h-[35vh] flex-col justify-center sm:h-screen sm:gap-16">
      <div className="flex w-full justify-between">
        <SectionDetailTitle title="정기워크샵" subtitle="Workshop" />
        <motion.p
          viewport={{ once: true }}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-primary-gradient w-40 text-[5px]/2 sm:w-150 sm:text-xl/7"
        >
          일할 땐 열정적으로, 놀 땐 누구보다 진심으로!
        </motion.p>
      </div>
      <AsyncBoundary>
        <WorkshopCarousel />
      </AsyncBoundary>
    </section>
  );
};

const WorkshopCarousel = () => {
  return (
    <Carousel
      data={data}
      className="gap-3 sm:gap-11.5"
      renderItem={(item) => (
        <div className="group relative h-30 w-44 overflow-hidden rounded-sm bg-gray-900 sm:h-95 sm:w-171.5 sm:rounded-xl">
          <Image draggable={false} loading="lazy" src={myImage} alt={item.title} fill className="object-cover" />
          <div className="bg-background-surface/80 absolute inset-0 flex flex-col items-start justify-start gap-0.5 px-3 py-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:gap-2 sm:px-6.75 sm:py-3.25">
            <span className="text-primary-gradient text-[9px] sm:text-[36px]">{item.title}</span>
            <span className="text-custom-gray-500 text-[4.5px] sm:text-lg">{item.date}</span>
          </div>
        </div>
      )}
    />
  );
};
