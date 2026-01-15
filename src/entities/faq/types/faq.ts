import { Part } from 'shared/types/part';

export interface Faq {
  part: Part;
  question: string;
  answer: string;
  id: number;
  createDate: string;
  lastModifiedDate: string;
}

export interface FAQForm {
  part: Part;
  question: string;
  answer: string;
}
