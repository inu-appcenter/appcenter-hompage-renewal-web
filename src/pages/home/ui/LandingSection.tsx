import { HomePageBackground } from 'entities/background';
import Link from 'next/link';

export const LandingSection = () => {
  return (
    <section className="relative flex h-screen flex-col justify-center gap-8">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <HomePageBackground />
      </div>
      <h1 className="text-primary-gradient text-[120px] font-normal">
        APP <span className="text-brand-primary-light">CENTER</span>
      </h1>
      <p className="text-primary-gradient text-xl font-semibold">오랫동안 사용되어 온 앱센터가 정보전산원 산하의 AI 빅데이터 센터에 소속된 IT 이노베이션 랩으로 명칭 정식 변경되었습니다. </p>
      <p className="text-primary-gradient text-xl font-semibold whitespace-pre-line">
        {'인천대학교 학생들이 애플리케이션과 서비스를 직접 만드는 공간입니다.\n활동에 필요한 비용의 일부를 소속 기관으로부터 지원받고 있습니다.'}
      </p>
      <Link className="border-custom-gray-100 text-custom-black bg-brand-primary-light w-fit rounded-[60px] border px-8 py-4 text-xl font-semibold shadow-[0_0_48px_0_#00FFBF99]" href="/joinus">
        앱센터 모집 지원하러 가기
      </Link>
    </section>
  );
};
