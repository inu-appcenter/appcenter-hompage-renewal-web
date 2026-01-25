import Image from 'next/image';
import { AppStore } from 'entities/link/ui/AppStore';
import { GooglePlay } from 'entities/link/ui/GooglePlay';
import { Project } from 'entities/project';
import { WebLink } from 'entities/link';

export const MainSection = ({ data }: { data: Project }) => {
  const imageUrls = Object.values(data.images);

  return (
    <section className="flex h-screen flex-row justify-between px-20 pt-65">
      <div className="flex w-140 flex-col">
        {data.isActive ? (
          <div className="bg-brand-secondary-light mb-4 w-fit rounded-[40px] px-3 py-2">서비스이용가능</div>
        ) : (
          <div className="mb-4 w-fit rounded-[40px] bg-gray-600 px-3 py-2">서비스종료</div>
        )}
        <h1 className="text-primary-gradient mb-29 text-[72px] font-bold">{data.title}</h1>
        <p className="text-primary-gradient text-xl/7">{data.subTitle}</p>
        <div className="mt-9 flex gap-3">
          {data.androidStoreLink && <GooglePlay href={data.androidStoreLink} />}
          {data.appleStoreLink && <AppStore href={data.appleStoreLink} />}
          {data.websiteLink && <WebLink href={data.websiteLink} />}
        </div>
      </div>
      <div className="relative flex flex-1 justify-end">
        <Image src={imageUrls[1]} alt="Main Section Image" width={2000} height={600} className="h-auto w-auto max-w-full object-contain" quality={100} unoptimized={true} />
      </div>
    </section>
  );
};
