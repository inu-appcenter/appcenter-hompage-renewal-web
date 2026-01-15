import { Part } from 'shared/types/part';

// 파트를 추가하게 될 경우 여기에 추가해주세요.
export const PART = ['Common', 'Android', 'Design', 'iOS', 'Web', 'Server', 'Basic'] as const;

// 색상은 관리자 페이지에만 적용됩니다.
export const PART_COLORS: Record<Part | 'All', { bg: `bg-${string}`; text: `text-${string}` }> = {
  Common: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  Android: { bg: 'bg-green-100', text: 'text-green-700' },
  Design: { bg: 'bg-purple-100', text: 'text-purple-700' },
  iOS: { bg: 'bg-blue-100', text: 'text-blue-700' },
  Web: { bg: 'bg-cyan-100', text: 'text-cyan-700' },
  Server: { bg: 'bg-orange-100', text: 'text-orange-700' },
  Basic: { bg: 'bg-amber-100', text: 'text-amber-700' },
  All: { bg: 'bg-slate-900', text: 'text-white' }
};
