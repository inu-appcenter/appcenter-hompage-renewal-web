import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';

export function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <div className="no-scrollbar h-screen w-full snap-y snap-mandatory overflow-auto">
        <main className="mx-auto w-full max-w-380 px-10 sm:max-w-400 sm:px-20">{children}</main>
        <Footer />
      </div>
    </>
  );
}
