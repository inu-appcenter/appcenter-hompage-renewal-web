'use client';
import Link from 'next/link';
import { Mail, Instagram, Github, ArrowUp } from 'lucide-react';
import { KakaoIcon } from 'shared/icon/KakaoIcon';
import { Logo } from 'shared/icon/Logo';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-custom-black relative w-full px-10 py-16">
      <div className="mx-auto flex max-w-380 flex-col items-start justify-between gap-10 sm:max-w-400 sm:flex-row sm:items-start">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <span className="font-montserrat text-primary-gradient font-product-design pl-1 text-4xl">
              APP <span className="text-brand-primary-light">CENTER</span>
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-custom-gray-500">인천대학교 IT 이노베이션 랩</p>
            <p className="text-custom-gray-500">인천광역시 아카데미로119 4호관 정보전산원(BM컨텐츠관) 107호</p>
          </div>
          <p className="text-custom-gray-600 mt-4 text-sm">© Copyright 2026 INU App Center. All rights reserved.</p>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 md:items-end">
          <button onClick={scrollToTop} className="group relative flex flex-col items-end gap-2 overflow-hidden">
            <div className="text-custom-gray-500 group-hover:text-brand-primary flex items-center gap-2 pt-1 transition-colors duration-300">
              <span className="text-sm font-bold tracking-widest">TOP</span>
              <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-2 group-active:-translate-y-4" />
            </div>
          </button>
          <h4 className="text-custom-gray-400 mt-8 text-sm font-semibold uppercase">Contact Us</h4>
          <div className="flex items-center gap-6">
            <Link
              href="https://pf.kakao.com/_xgxaSLd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-custom-gray-500 transition-colors hover:text-yellow-300"
              aria-label="KakaoTalk Channel"
            >
              <KakaoIcon className="h-10 w-10" />
            </Link>
            <Link href="https://instagram.com/inuappcenter" target="_blank" rel="noopener noreferrer" className="text-custom-gray-500 transition-colors hover:text-fuchsia-500" aria-label="Instagram">
              <Instagram className="h-10 w-10" />
            </Link>
            <Link href="https://github.com/inu-appcenter" target="_blank" rel="noopener noreferrer" className="text-custom-gray-500 transition-colors hover:text-white" aria-label="GitHub">
              <Github className="h-10 w-10" />
            </Link>
            <Link href="mailto:inuappcenter@gmail.com" className="text-custom-gray-500 hover:text-brand-primary transition-colors" aria-label="Email">
              <Mail className="h-10 w-10" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
