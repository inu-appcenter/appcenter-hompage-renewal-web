'use client';
import { MoveRight } from 'lucide-react';
import { Carousel, SectionTitle } from './Components';
import Image from 'next/image';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Project, useProject } from 'entities/project';

export const ProjectSection = () => {
  const { data } = useProject();
  return (
    <section className="relative flex h-screen flex-col justify-center gap-10">
      <SectionTitle title="project" description="앱센터에서 만든 앱들을 소개합니다" />
      <Carousel data={data} renderItem={(item) => <Item data={item} />} className="-mx-24 gap-16" />
    </section>
  );
};

const Item = ({ data }: { data: Project }) => {
  const imageUrls = Object.values(data.images);
  return (
    <motion.div whileHover={{ y: -24, scale: 1.05 }} transition={{ duration: 0.4 }} className="group relative h-140 w-142 shrink-0 cursor-pointer snap-center overflow-hidden rounded-xl">
      <Image loading="lazy" src={imageUrls[0]} alt={data.title} fill className="object-cover" quality={100} />
      <Link href={`/project/${data.id}`} className="absolute inset-0 z-10">
        <div className="bg-background-surface/80 absolute inset-0 flex flex-col items-start justify-start gap-4 p-10 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h1 className="text-brand-primary-cta text-[64px] font-extrabold break-keep whitespace-normal">{data.title}</h1>
          <div className="flex gap-4">
            {data.androidStoreLink && <span className="text-[36px] font-medium">Android</span>}
            {data.appleStoreLink && <span className="text-[36px] font-medium">iOS</span>}
            {data.websiteLink && <span className="text-[36px] font-medium">Web</span>}
          </div>
          {data.isActive ? (
            <span className="border-brand-primary-cta rounded-[31px] border-2 px-4 pt-3 pb-2 text-xl font-semibold">서비스 이용 가능</span>
          ) : (
            <span className="rounded-[31px] border-2 border-gray-500 px-4 pt-3 pb-2 text-xl font-semibold">서비스 종료</span>
          )}
          <MoveRight className="text-custom-gray-500 absolute right-12 bottom-12" size={40} />
        </div>
      </Link>
    </motion.div>
  );
};
