export async function JoinUsDetailPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  console.log(id);

  return (
    <section className="flex h-screen flex-col items-start justify-center">
      <div className="bg-brand-primary-cta rounded-[28px] px-3 py-2 text-[22px] font-semibold">모집중</div>
      <h1 className="text-[40px]/10 font-bold text-white">[BE] 새로운 프로젝트 팀원 모집</h1>
    </section>
  );
}
