import Image from 'next/image';
import image from '../assets/image1.png';

export const ImageSection = () => {
  return (
    <section className="mx-40 flex min-h-screen">
      <div className="relative mr-10 flex flex-col items-center">
        <div className="border-brand-primary-cta bg-background-surface z-10 mt-1 h-8 w-8 shrink rounded-full border-8" />
        <div className="mt-2 h-full w-[1.5px] border-l-2 border-dashed border-zinc-700" />
      </div>

      <div className="flex-1 pb-20">
        <h2 className="text-brand-primary-cta mb-8 text-3xl font-bold">작은 회사에서 성장하는 법</h2>

        <div className="relative mb-8 overflow-hidden rounded-xl">
          <Image src={image} alt="Activity Image" width={1920} height={1080} className="h-auto w-full object-cover" />
        </div>

        <p className="text-primary-gradient text-xl/7">프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다.</p>
      </div>
    </section>
  );
};
