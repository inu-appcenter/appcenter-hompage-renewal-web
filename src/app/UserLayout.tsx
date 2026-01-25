import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';

export function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-380 px-10">{children}</main>
      <Footer />
    </>
  );
}
