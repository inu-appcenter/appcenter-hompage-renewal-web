'use client';
import { MoveRight } from 'lucide-react';
import { Carousel, SectionTitle } from './Components';
import Image from 'next/image';
import { motion } from 'motion/react';
import Link from 'next/link';
import myImage from 'shared/image/image.jpg';

interface Project {
  title: string;
  type: string;
  available: boolean;
}

const data: { projects: Project[] } = {
  projects: [
    { title: '러닝버디', type: 'Web', available: true },
    { title: '앱센터 홈페이지', type: 'Web', available: false },
    { title: '스터디모아', type: 'App', available: true },
    { title: '스터디모아2', type: 'App', available: true },
    { title: '하하하', type: 'App', available: true }
  ]
};
export const ProjectSection = () => {
  return (
    <section className="relative flex h-screen flex-col justify-center gap-10">
      <SectionTitle title="project" description="앱센터에 대한 간단한 설명이 있었으면 좋겠어요" />
      <Carousel data={data.projects} renderItem={(item) => <Item data={item} />} className="-mx-24 gap-16" />
    </section>
  );
};

const Item = ({ data }: { data: Project }) => {
  return (
    <motion.div whileHover={{ y: -24, scale: 1.05 }} transition={{ duration: 0.4 }} className="group relative h-140 w-142 shrink-0 cursor-pointer snap-center overflow-hidden rounded-xl bg-gray-900">
      <Image src={myImage} alt={data.title} fill className="object-cover" />
      <Link href={`/project/id=${data.title}`} className="absolute inset-0 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="bg-background-surface/80 absolute inset-0 flex flex-col items-start justify-start gap-4 p-10 text-white transition-opacity duration-300"
        >
          <span className="text-brand-primary-cta text-[64px] font-extrabold">{data.title}</span>
          <span className="text-[36px] font-medium">{data.type}</span>
          {data.available && <span className="border-brand-primary-cta rounded-[31px] border-2 px-4 pt-3 pb-2 text-xl font-semibold">서비스 이용 가능</span>}
          <MoveRight className="text-custom-gray-500 absolute right-12 bottom-12" size={40} />
        </motion.div>
      </Link>
    </motion.div>
  );
};
