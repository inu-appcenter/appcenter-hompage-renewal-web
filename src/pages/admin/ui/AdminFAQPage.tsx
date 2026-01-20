import { faqApi } from 'entities/faq';
import { AdminFAQList } from 'features/faq';
import { PageTitle } from './Components';

export async function AdminFAQPage() {
  const initialData = await faqApi.getAll();

  return (
    <>
      <PageTitle title="질문 관리(FAQ)" description="홈페이지에 표시할 FAQ를 추가,수정,삭제 할 수 있습니다." />
      <AdminFAQList initialData={initialData} />
    </>
  );
}
