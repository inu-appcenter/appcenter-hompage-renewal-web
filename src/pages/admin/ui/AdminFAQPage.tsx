import { getFaqs } from 'entities/faq';
import { AdminFAQList } from 'features/faq';
import { PageTitle } from './Components';

export async function AdminFAQPage() {
  const initialData = await getFaqs();

  return (
    <>
      <PageTitle title="질문 관리(FAQ)" />
      <AdminFAQList initialData={initialData} />
    </>
  );
}
