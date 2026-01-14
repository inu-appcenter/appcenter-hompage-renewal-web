'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import removedImage from '../assets/removed_main.png';
import mainImage from '../assets/main.png';

export const ImageTransitionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const scale = useTransform(scrollYProgress, [0, 0.8], [1.0, 0.7]);
  const removedOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);
  const mainOpacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.7, 0.9], [20, 0]);

  return (
    <div ref={containerRef} className="relative mb-40 h-[200vh]">
      <div className="sticky top-0 -mx-30 flex h-screen items-end justify-center">
        <div className="relative w-full">
          <motion.div
            style={{
              scale,
              opacity: removedOpacity,
              originY: 1,
              zIndex: 20
            }}
            className="absolute right-0 bottom-0 left-0"
          >
            <Image src={removedImage} alt="Removed" priority />
          </motion.div>
          <motion.div
            style={{
              scale,
              opacity: mainOpacity,
              originY: 1,
              zIndex: 10
            }}
          >
            <Image src={mainImage} alt="Main" className="rounded-xl" />
            <motion.div style={{ opacity: textOpacity, y: textY }} className="absolute bottom-0 left-0 z-50 w-full translate-y-full pt-7.5">
              <p className="text-primary-gradient text-3xl/7">프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다. 프로젝트에 대한 설명이 들어가는 자리입니다.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
