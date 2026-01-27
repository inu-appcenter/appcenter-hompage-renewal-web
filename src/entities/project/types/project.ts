import { Part } from 'shared/types/part';
import { SkillCategory } from 'shared/types/skillCategory';

export interface Project {
  readonly id: number;
  readonly createdDate: string;
  readonly lastModifiedDate: string;
  body: string;
  title: string;
  subTitle: string;
  githubLink: string;
  androidStoreLink: string;
  appleStoreLink: string;
  websiteLink: string;
  isActive: boolean;
  images: Record<string, string>;
  stacks: Array<{ id: number; name: string; icon: string; category: SkillCategory }> | [];
  groups: Array<{ group_id: number; member: string; part: Part; profileImage: string }> | [];
}
