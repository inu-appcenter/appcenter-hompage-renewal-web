'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Carousel, SectionDetailTitle } from './Components';
import { MoveRight } from 'lucide-react';
import myImage from 'shared/image/image.jpg';
import { motion } from 'motion/react';

interface ActivityData {
  title: string;
  date: string;
}
const data: ActivityData[] = [
  { title: '기타활동1', date: '2026/01/06' },
  { title: '기타활동2', date: '2026/02/15' },
  { title: '기타활동3', date: '2026/03/20' }
];
export const ActivitiesSection = () => {
  return (
    <section className="flex h-[25vh] flex-col justify-center sm:h-screen sm:gap-16">
      <div className="flex w-full justify-between">
        <SectionDetailTitle title="활동" subtitle="Activities" />
        <motion.p
          viewport={{ once: true }}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-primary-gradient w-40 text-[5px]/2 sm:w-150 sm:text-xl/7"
        >
          프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에
          대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다.
        </motion.p>
      </div>
      <Carousel data={data} renderItem={(item) => <Item data={item} />} className="gap-3 sm:gap-11.5" />
    </section>
  );
};

const Item = ({ data }: { data: ActivityData }) => {
  return (
    <div className="group relative h-16 w-30 cursor-pointer overflow-hidden rounded-sm bg-gray-900 sm:h-66.75 sm:w-119.5 sm:rounded-xl">
      <Image draggable={false} loading="lazy" src={myImage} alt={data.title} fill className="object-cover" />
      <Link draggable={false} href={`/activity/id=${data.title}`} className="absolute inset-0 z-10">
        <div className="bg-background-surface/80 absolute inset-0 flex flex-col items-start justify-start gap-0.5 px-3 py-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:gap-2 sm:px-6.75 sm:py-3.25">
          <span className="text-primary-gradient text-[9px] sm:text-[36px]">{data.title}</span>
          <span className="text-custom-gray-500 text-[4.5px] sm:text-lg">{data.date}</span>
          <MoveRight className="text-custom-gray-500 animate-wiggle-right absolute right-4 bottom-1 w-4 sm:right-6 sm:bottom-6 sm:w-10" />
        </div>
      </Link>
    </div>
  );
};
