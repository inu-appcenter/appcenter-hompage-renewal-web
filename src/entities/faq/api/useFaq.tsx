import { Faq } from '../types/faq';

export async function getFaqs(): Promise<Faq[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faqs/public/all-faq-boards`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();

  return data;
}
