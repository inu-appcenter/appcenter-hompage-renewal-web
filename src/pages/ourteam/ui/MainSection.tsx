export const MainSection = () => {
  return (
    <>
      <section className="flex h-screen w-full flex-col items-start justify-center gap-6">
        <h1 className="text-brand-primary-cta text-[100px]/25 font-bold">OUR TEAM</h1>
        <p className="text-[32px]/16 text-white">파트별 소개</p>
      </section>

      <section className="relative mb-31.75 flex h-screen w-full flex-col justify-between p-20">
        <p className="text-primary-gradient text-[72px]/23 leading-tight font-bold">
          안녕하세요!
          <br />
          <span className="text-brand-primary-cta">앱센터</span>입니다.
        </p>
        <p className="text-primary-gradient self-end text-right text-[72px]/23 font-bold">
          앱센터의 각 <span className="text-brand-secondary-light">파트</span>를 소개합니다.
        </p>
      </section>
    </>
  );
};
