import { Part } from 'shared/types/part';

export interface FAQForm {
  part: Part;
  question: string;
  answer: string;
}

export interface Faq extends FAQForm {
  readonly id: number;
  readonly createdDate: string;
  readonly lastModifiedDate: string;
}
