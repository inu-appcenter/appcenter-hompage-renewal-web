import { Part } from 'shared/types/part';

export interface GenerationForm {
  member: string;
  profileImage: string | null;
  email: string | null;
  blogLink: string | null;
  gitRepositoryLink: string | null;
  role: string;
  part: Part;
  year: number;
}

export interface Generation extends GenerationForm {
  readonly group_id: number;
  readonly createdDate: string;
  readonly lastModifiedDate: string;
}
