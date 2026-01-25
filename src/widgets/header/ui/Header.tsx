'use client';
import Link from 'next/link';
import { Logo } from 'shared/icon/Logo';
import { motion } from 'motion/react';

export const Header = () => {
  return (
    <motion.header
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2
      }}
      className="fixed z-50 flex h-30 w-full flex-row items-center justify-between bg-linear-to-b from-black/80 to-transparent px-30"
    >
      <Link href="/">
        <Logo />
      </Link>

      <div className="flex flex-1 flex-row items-center justify-end gap-20">
        <Link href="#about" className="hover:text-brand-primary-light text-xl font-semibold text-white transition-colors">
          About
        </Link>
        <Link href="#activities" className="hover:text-brand-primary-light text-xl font-semibold text-white transition-colors">
          Activity
        </Link>
        <Link href="#project" className="hover:text-brand-primary-light text-xl font-semibold text-white transition-colors">
          Project
        </Link>
        <Link href="#faq" className="hover:text-brand-primary-light text-xl font-semibold text-white transition-colors">
          FAQ
        </Link>
        <Link
          href="/login"
          className="text-custom-black ring-custom-gray-100 rounded-[60px] bg-white px-5 py-2.5 text-xl leading-none font-semibold shadow-[0_0_10px_0_#FFFAFA] ring-1 transition-all ring-inset hover:bg-gray-100 active:scale-95"
        >
          Sign in
        </Link>
      </div>
    </motion.header>
  );
};
