import { SmoothScroll } from 'shared/animation/SmoothScroll';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';

export function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SmoothScroll>
      <Header />
      <main className="mx-30">{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
