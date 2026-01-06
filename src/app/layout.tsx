import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '인천대학교 앱센터',
  description: '인천대학교 학생들이 애플리케이션과 서비스를 만드는 공간입니다. 활동에 필요한 비용의 일부를 전산원으로부터 지원받고 있습니다.'
};

export function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
