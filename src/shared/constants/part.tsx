import { Part } from 'shared/types/part';

export const PART = ['Common', 'Android', 'Design', 'iOS', 'Web', 'Server', 'Basic'] as const;

export const PART_COLORS: Record<Part | 'All', { bg: string; text: string }> = {
  Common: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  Android: { bg: 'bg-green-100', text: 'text-green-700' },
  Design: { bg: 'bg-purple-100', text: 'text-purple-700' },
  iOS: { bg: 'bg-blue-100', text: 'text-blue-700' },
  Web: { bg: 'bg-cyan-100', text: 'text-cyan-700' },
  Server: { bg: 'bg-orange-100', text: 'text-orange-700' },
  Basic: { bg: 'bg-amber-100', text: 'text-amber-700' },
  All: { bg: 'bg-slate-900', text: 'text-white' }
};
