import Image from 'next/image';
import myImage from 'shared/image/image.jpg';

export const DescriptionSection = () => {
  return (
    <section className="my-40 flex h-screen flex-row items-center justify-center gap-20 px-10 py-20">
      <div className="shrink-0">
        <Image src={myImage} className="h-[768px] w-[542px] rounded-lg object-cover" alt="Description Image" />
      </div>

      <div className="bg-surface-elevated relative h-full w-full max-w-3xl rounded-lg p-10 pr-0">
        <div className="to-background-surface/0 from-background-surface pointer-events-none absolute inset-0 z-50 bg-linear-to-t from-6% to-28%" />
        <div className="custom-scrollbar h-full w-full overflow-y-auto pr-4">
          <p className="mb-25 text-[28px]/12.5 font-light whitespace-pre-line text-white">
            {`(모집 공고 설명문 들어가는 자리)
              앱센터 17.5기 신입멤버 모집

              앱센터와 함께 활동할 17.5기 신입 개발자 및 디자이너를 모집합니다!
              🗒️ 앱센터 소개 🗒️
              앱센터는 교내 정보전산원 소속으로, 인천대의 각 분야별 학생들이 모여 학생들이 주도적으로 애플리케이션과 서비스를 기획하고 개발하는 공간입니다.\n지금까지 출시한 앱으로는 "유니돔, INTIP, CallinU, INU카페테리아, INU공지알리미, 유니레터, INUIT, (전)스마트 캠퍼스" 등이 있으며, 앱센터 홈페이지 Product 탭에서 찾아볼 수 있습니다.
              특히 프론트엔드와 백엔드 웹 개발, iOS, Android 앱 개발, 그리고 Design 분야에 관심이 있는 분들이라면,\n이번 기회에 실력을 쌓고, 다양한 프로젝트 경험을 통해 성장할 수 있는 절호의 기회입니다!\n앱센터에서 개발자와 디자이너를 만나 함께 성장해요!
              🗒️ 모집 파트 및 인원 🗒️
              - 디자인\n- 앱 (iOS / Android) 파트장, 파트원\n- 웹 (Server / Web) 파트원\n- 기초 Basic 파트(*1-2학년만 가능) 파트원
              🗒️ 앱센터 17.5기 개발 및 디자인 파트 모집 🗒️
            `}
          </p>
        </div>
      </div>
    </section>
  );
};
