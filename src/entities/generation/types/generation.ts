import { Part } from 'shared/types/part';

export interface Generation {
  readonly group_id: number;
  readonly role: string;
  readonly part: Part;
  readonly year: number;
  readonly member: string;
  readonly profileImage: string | null;
  readonly email: string | null;
  readonly blogLink: string | null;
  readonly gitRepositoryLink: string | null;
  readonly createdDate: string;
  readonly lastModifiedDate: string;
}

export interface GenerationForm {
  id: number;
  year: number;
  part: Part;
  role_id: number;
}
