import { Part } from 'shared/types/part';

export interface Project {
  readonly id: number;
  readonly createdDate: string;
  readonly lastModifiedDate: string;
  body: string;
  title: string;
  subTitle: string;
  androidStoreLink: string;
  appleStoreLink: string;
  webSiteLink: string;
  isActive: boolean;
  images: Record<string, string | File | null>;
  stacks: Array<{ id: number; name: string; icon: string }>;
  groups: Array<{ group_id: number; name: string; part: Part }>;
}
