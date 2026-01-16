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

export interface AddGeneration {
  member_id: number;
  role_id: number;
  year: number;
  part: Part;
}
export interface EditGeneration {
  group_id: number;
  role_id: number;
  year: number;
  part: Part;
}
