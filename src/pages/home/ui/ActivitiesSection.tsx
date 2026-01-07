'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { Carousel, SectionDetailTitle } from './Components';
import { MoveRight } from 'lucide-react';
import myImage from 'shared/image/image.jpg';

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
    <section className="my-20 flex h-screen flex-col gap-16">
      <div className="flex w-full justify-between">
        <SectionDetailTitle title="기타활동" subtitle="Activities" />
        <p className="text-primary-gradient w-150 text-xl">
          프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에
          대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다.
        </p>
      </div>
      <Carousel data={data} renderItem={(item) => <Item data={item} />} className="gap-11.5" />
    </section>
  );
};

const Item = ({ data }: { data: ActivityData }) => {
  return (
    <div className="group p relative h-66.75 w-119.5 cursor-pointer overflow-hidden rounded-xl bg-gray-900">
      <Image src={myImage} alt={data.title} fill className="object-cover" />
      <Link href={`/activities/id=${data.title}`} className="absolute inset-0 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="bg-background-surface/80 absolute inset-0 flex flex-col items-start justify-start gap-2 px-6.75 py-3.25 text-white transition-opacity duration-300"
        >
          <span className="text-primary-gradient text-[36px]">{data.title}</span>
          <span className="text-custom-gray-500 text-lg">{data.date}</span>
          <MoveRight className="text-custom-gray-500 animate-wiggle-right absolute right-6 bottom-6" size={40} />
        </motion.div>
      </Link>
    </div>
  );
};
