'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import { useRef } from 'react';
import { Hello } from 'shared/icon/Hello';
import { OurTeam } from '../types/ourteam';

export const PartDescriptionSection = ({
  title,
  partName,
  description,
  techStack,
  icon,
  motionProps: { x = ['0%', '10%'], y = ['20px', '800px'], scale = [1, 0.6], rotate = [0, 0] } = {}
}: OurTeam) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const transformX = useTransform(scrollYProgress, [0, 0.6], x);
  const transformY = useTransform(scrollYProgress, [0, 0.6], y);
  const transformScale = useTransform(scrollYProgress, [0, 0.5], scale);
  const transformRotate = useTransform(scrollYProgress, [0, 0.5], rotate);

  return (
    <div ref={containerRef} className="relative space-y-10">
      <section className="mx-30 flex flex-col overflow-hidden">
        <div className="flex h-screen w-full flex-row items-center">
          <SectionDetailTitle title={title} />
          <motion.div style={{ x: transformX, y: transformY, scale: transformScale, rotate: transformRotate }} className="z-50 flex">
            {icon}
          </motion.div>
        </div>
        <div className="bg-surface-elevated relative flex w-full rounded-2xl px-15 py-15">
          <div
            className="pointer-events-none absolute inset-0 z-50"
            style={{
              background: 'linear-gradient(to top, rgba(17, 17, 19, 0.6) 0%, rgba(17, 17, 19, 0) 47%)'
            }}
          />
          <div className="space-y-20 pt-10">
            <Hello />
            <p className="text-primary-gradient text-7xl/23 font-bold">
              안녕하세요! <br />
              <span className="text-brand-primary-cta">{partName} 파트</span>입니다.
            </p>
          </div>
        </div>
      </section>

      <div className="mb-135 flex gap-10 px-30">
        <div className="bg-surface-elevated flex h-109 flex-1 flex-col justify-end rounded-2xl p-14.75">
          <p className="text-primary-gradient text-[56px]/tight font-medium whitespace-pre-line">{description}</p>
        </div>

        <div className="bg-surface-elevated flex h-109 w-124 flex-col rounded-2xl px-11.25 py-14.75">
          <p className="text-brand-secondary-light text-[28px]">이런 기술 스택을 주로 이용합니다.</p>
          <div className="flex flex-1 flex-col justify-end gap-8">
            {techStack.map((tech, index) => (
              <StackItem key={tech} number={`${index + 1}`} title={tech} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StackItem = ({ number, title }: { number: string; title: string }) => (
  <div className="space-y-4">
    <div className="text-brand-secondary-light border-brand-secondary-light flex h-6 w-6 items-center justify-center rounded-full border-2 text-sm font-bold">{number}</div>
    <p className="text-primary-gradient text-[50px]/tight font-semibold">{title}</p>
  </div>
);

const SectionDetailTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-1 flex-col gap-9">
      <h2 className="text-brand-primary-cta text-[120px]/[1] font-bold">{title}</h2>
      <Link href="/link" className="group relative inline-block w-fit overflow-hidden rounded-[40px] bg-white/10 p-[1.5px]">
        <motion.div
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute inset-[-200%] z-0 bg-[conic-gradient(from_0deg,transparent_70%,var(--color-brand-secondary)_85%,var(--color-brand-secondary-light)_95%,#ffffff_100%)]"
        />

        <div className="bg-background-surface group-hover:bg-surface-elevated relative z-10 flex items-center justify-center rounded-[40px] px-10 py-4 transition-colors">
          <span className="text-primary-gradient text-[28px] font-bold">바로 지원하러 가기</span>
          <span className="ml-2 text-white/60">→</span>
        </div>
      </Link>
    </div>
  );
};
