'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const subtitleSteps = ['', 'ㅍ', '파', '파트', '파트ㅂ', '파트벼', '파트별', '파트별 ', '파트별 ㅅ', '파트별 소', '파트별 소ㄱ', '파트별 소개'];

const titleText = 'OUR TEAM';

export const MainSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [displayTitle, setDisplayTitle] = useState('');
  const [displaySubtitle, setDisplaySubtitle] = useState('');
  const [phase, setPhase] = useState<'title' | 'subtitle' | 'done'>('title');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  const xLeft = useTransform(scrollYProgress, [0, 0.5], [-500, 0]);
  const xRight = useTransform(scrollYProgress, [0, 0.5], [500, 0]);
  const opacityScroll = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  useEffect(() => {
    let currentTitleIndex = 0;
    const titleInterval = setInterval(() => {
      if (currentTitleIndex <= titleText.length) {
        setDisplayTitle(titleText.slice(0, currentTitleIndex));
        currentTitleIndex++;
      } else {
        clearInterval(titleInterval);
        setPhase('subtitle');
      }
    }, 120);

    return () => clearInterval(titleInterval);
  }, []);

  useEffect(() => {
    if (phase === 'subtitle') {
      let currentSubIndex = 0;
      const subInterval = setInterval(() => {
        if (currentSubIndex < subtitleSteps.length) {
          setDisplaySubtitle(subtitleSteps[currentSubIndex]);
          currentSubIndex++;
        } else {
          clearInterval(subInterval);
          setPhase('done');
        }
      }, 160);

      return () => clearInterval(subInterval);
    }
  }, [phase]);

  return (
    <>
      <section className="flex h-screen w-full flex-col items-start justify-center px-20">
        <div className="flex flex-col gap-6">
          <div className="flex items-center">
            <h1 className="text-brand-primary-cta text-[100px]/25 font-bold">
              {displayTitle}
              {phase === 'title' && (
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="bg-brand-primary-cta ml-2 inline-block h-20 w-2 align-middle" />
              )}
            </h1>
          </div>

          <div className="flex items-center">
            <p className="text-[32px]/16 text-white">
              {displaySubtitle}
              {(phase === 'subtitle' || phase === 'done') && (
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="ml-1 inline-block h-7 w-1.5 bg-white align-middle" />
              )}
            </p>
          </div>
        </div>
      </section>

      <section ref={containerRef} className="relative mb-31.75 flex h-screen w-full flex-col justify-between overflow-hidden p-20">
        <motion.p style={{ x: xLeft, opacity: opacityScroll }} className="text-primary-gradient text-[72px]/23 leading-tight font-bold">
          안녕하세요! <br />
          <span className="text-brand-primary-cta">앱센터</span>입니다.
        </motion.p>

        <motion.p style={{ x: xRight, opacity: opacityScroll }} className="text-primary-gradient self-end text-right text-[72px]/23 font-bold">
          앱센터의 각 <span className="text-brand-secondary-light">파트</span>를 소개합니다.
        </motion.p>
      </section>
    </>
  );
};
