import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';

export function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-380 overflow-hidden px-10 sm:max-w-400 sm:px-20">{children}</main>
      <Footer />
    </>
  );
}
