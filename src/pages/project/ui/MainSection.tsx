import { AppStore } from 'shared/ui/AppStore';
import { GooglePlay } from 'shared/ui/GooglePlay';
import myImage from 'shared/image/image.jpg';
import Image from 'next/image';

export const MainSection = () => {
  return (
    <section className="flex h-screen flex-row justify-between px-20 pt-65">
      <div className="flex w-140 flex-col">
        <div className="bg-brand-secondary-light mb-4 w-fit rounded-[40px] px-3 py-2">서비스이용가능</div>
        <h1 className="text-primary-gradient mb-29 text-[72px] font-bold">프로젝트 제목</h1>
        <p className="text-primary-gradient text-xl/7">
          프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에
          대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이
          들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다.{' '}
        </p>
        <div className="mt-9 flex gap-3">
          <GooglePlay href="" />
          <AppStore href="" />
        </div>
      </div>
      <Image src={myImage} alt="Main Section Image" width={600} height={600} />
    </section>
  );
};
