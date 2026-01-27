import { SkillCategory } from 'shared/types/skillCategory';

export interface SkillStack {
  id: number;
  name: string;
  icon: string;
  category: SkillCategory;
}
