import { SkillCategory } from 'shared/types/skillCategory';

// 스킬 카테고리를 추가하게 될 경우 여기에 추가해주세요.
export const SKILL_CATEGORY = ['FRONTEND', 'BACKEND', 'OTHERS', 'DATABASE', 'DEVOPS', 'DESIGN'] as const;

// 색상은 관리자 페이지에만 적용됩니다.
export const SKILL_CATEGORY_COLORS: Record<SkillCategory, { bg: `bg-${string}`; text: `text-${string}` }> = {
  FRONTEND: { bg: 'bg-sky-100', text: 'text-sky-700' },
  BACKEND: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  DATABASE: { bg: 'bg-rose-100', text: 'text-rose-700' },
  DEVOPS: { bg: 'bg-zinc-200', text: 'text-zinc-800' },
  DESIGN: { bg: 'bg-fuchsia-100', text: 'text-fuchsia-700' },
  OTHERS: { bg: 'bg-gray-100', text: 'text-gray-600' }
};
