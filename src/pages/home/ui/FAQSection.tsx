import { SectionTitle } from './Components';
import { FAQList } from 'features/faq';
import { faqApi } from 'entities/faq';

export const FAQSection = async () => {
  const faqData = await faqApi.getAll();

  return (
    <section className="flex flex-col gap-16 sm:h-screen">
      <SectionTitle title="faq" description="자주 묻는 질문" />
      <FAQList data={faqData} />
    </section>
  );
};
