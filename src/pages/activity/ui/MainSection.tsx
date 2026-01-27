export const MainSection = () => {
  return (
    <section className="flex h-screen flex-row justify-between pt-87">
      <div className="flex flex-col gap-40">
        <div className="flex flex-col gap-10">
          <h1 className="text-brand-primary-cta text-[100px]/25 font-bold">활동명</h1>
          <h2 className="text-custom-gray-400 pl-2.5 text-[40px]/7">활동명_영어</h2>
        </div>
        <p className="text-primary-gradient w-135 text-xl/7">
          활동 설명 활동 설명활동 설명활동 설명활동 설명활동 설명활동 설명활동 설명활동 설명활동 설명활동 설명활동 설명활동 설명활동 설명활동 설명활동 설명활동 설명활동 설명활동 설명활동 설명활동
          설명활동 설명활동 설명활동 설명활동 설명활동 설명활동 설명활동 설명 활동 설명활동 설명활동 설명활동 설명
        </p>
      </div>
      <div className="flex min-w-fit flex-col items-end gap-3">
        <Item title="Date" subTitle="2025. 12. 25" />
        <Item title="작성자" subTitle="남궁민정" />
      </div>
    </section>
  );
};

const Item = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <div className="flex flex-row gap-5">
      <p className="text-brand-primary-cta text-xl/7">{title}</p>
      <p className="text-text-primary text-xl/7">{subTitle}</p>
    </div>
  );
};
