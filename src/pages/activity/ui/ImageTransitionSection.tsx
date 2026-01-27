'use client';
import Image from 'next/image';
import { motion } from 'motion/react';
import removedImage from '../assets/removed_main.png';
import mainImage from '../assets/main.png';

export const ImageTransitionSection = () => {
  return (
    <div className="relative ml-[calc(50%-50vw)] h-screen w-screen overflow-hidden">
      <motion.div
        className="relative flex h-full w-full flex-col items-center justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={{
          visible: { transition: { staggerChildren: 0.3 } }
        }}
      >
        <motion.div
          className="relative flex w-full items-center justify-center"
          variants={{
            hidden: { scale: 1 },
            visible: {
              scale: 0.6,
              transition: { duration: 2, ease: [0.25, 1, 0.5, 1] }
            }
          }}
        >
          <motion.div
            className="relative z-10 w-full"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 0.8, delay: 0.3 }
              }
            }}
          >
            <Image src={mainImage} alt="Main Project" className="h-auto w-full rounded-2xl shadow-2xl" priority />
          </motion.div>

          <motion.div
            className="absolute inset-0 z-20 flex w-full items-center justify-center"
            variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 0,
                transition: { duration: 0.8, delay: 0.4 }
              }
            }}
          >
            <Image src={removedImage} alt="Object Only" className="h-auto w-full" priority />
          </motion.div>

          <motion.div
            className="absolute -bottom-30 left-0 z-30 w-full"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: 'easeOut', delay: 0.8 }
              }
            }}
          >
            <p className="text-primary-gradient text-3xl/10">
              프로젝트에 대한 설명이 들어가는 자리입니다. <br />
              배경이 채워지며 설명이 나타납니다.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
