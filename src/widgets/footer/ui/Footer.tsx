'use client';
import Link from 'next/link';
import { Mail, Instagram, Github, ArrowUp } from 'lucide-react'; // ArrowUp 추가
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
    <footer className="bg-custom-black relative w-full px-10 py-16 md:px-96">
      <div className="flex w-full flex-col items-start justify-between gap-10 md:flex-row md:items-start">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <span className="font-montserrat text-primary-gradient text-4xl font-bold tracking-widest">
              APP<span className="text-brand-primary-light">CENTER</span>
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-custom-gray-500">인천대학교 앱센터</p>
            <p className="text-custom-gray-500">인천광역시 연수구 아카데미로 119, 4호관 정보전산원(BM컨텐츠관)</p>
          </div>
          <p className="text-custom-gray-600 mt-4 text-sm">© Copyright 2026 INU App Center. All rights reserved.</p>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 md:items-end">
          <button onClick={scrollToTop} className="text-custom-gray-500 hover:text-brand-primary group flex cursor-pointer items-center transition-all duration-300">
            <span className="text-sm font-bold tracking-widest duration-300">TOP</span>
            <div className="border-custom-gray-600 group-hover:border-brand-primary p-2">
              <ArrowUp className="h-5 w-5" />
            </div>
          </button>
          <h4 className="text-custom-gray-400 mt-8 text-sm font-semibold tracking-wider uppercase">Contact Us</h4>
          <div className="flex items-center gap-6">
            <Link
              href="https://pf.kakao.com/_xgxaSLd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-custom-gray-500 hover:text-brand-primary transition-colors"
              aria-label="KakaoTalk Channel"
            >
              <KakaoIcon className="h-10 w-10" />
            </Link>
            <Link
              href="https://instagram.com/inuappcenter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-custom-gray-500 hover:text-brand-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-10 w-10" />
            </Link>
            <Link href="https://github.com/inu-appcenter" target="_blank" rel="noopener noreferrer" className="text-custom-gray-500 hover:text-brand-primary transition-colors" aria-label="GitHub">
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
