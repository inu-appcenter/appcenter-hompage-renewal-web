import Link from 'next/link';
import { Logo } from 'shared/icon/Logo';

export const Header = () => {
  return (
    <header className="fixed z-50 flex h-30 w-full flex-row items-center justify-between bg-linear-to-b from-black to-transparent px-30">
      <Logo />
      <div className="flex flex-1 flex-row items-center justify-end gap-20">
        <Link href="#" className="text-xl font-semibold text-white">
          About
        </Link>
        <Link href="#" className="text-xl font-semibold text-white">
          Activity
        </Link>
        <Link href="#" className="text-xl font-semibold text-white">
          Project
        </Link>
        <Link href="#" className="text-xl font-semibold text-white">
          FAQ
        </Link>
        <Link href="#" className="text-custom-black ring-custom-gray-100 rounded-[60px] bg-white px-5 py-2.5 text-xl leading-none font-semibold shadow-[0_0_10px_0_#FFFAFA] ring-1 ring-inset">
          Sign in
        </Link>
      </div>
    </header>
  );
};
