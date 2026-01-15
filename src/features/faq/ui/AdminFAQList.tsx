'use client';
import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Faq } from 'entities/faq';

import { PART, PART_COLORS } from 'shared/constants/part';
import { Part } from 'shared/types/part';

import { AddFAQForm, DeleteFAQButton, EditFAQForm } from './FAQForm';
import { useFAQs } from '../hooks/useFAQActions';

export const AdminFAQList = ({ initialData }: { initialData: Faq[] }) => {
  const { data } = useFAQs(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPart, setSelectedPart] = useState<Part | 'All'>('All');

  const filterOptions: Array<Part | 'All'> = ['All', ...PART];

  const filteredFaqs = useMemo(() => {
    return data.filter((faq) => {
      const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPart = selectedPart === 'All' || faq.part === selectedPart;
      return matchesSearch && matchesPart;
    });
  }, [searchTerm, selectedPart, data]);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <div className="flex items-center gap-1 rounded-xl bg-slate-50 p-1">
            {filterOptions.map((part) => (
              <button
                key={part}
                onClick={() => setSelectedPart(part)}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${selectedPart === part ? `${PART_COLORS[part]?.bg} ${PART_COLORS[part]?.text} shadow-sm` : 'text-slate-400'}`}
              >
                {part}
              </button>
            ))}
          </div>
          <div className="relative flex-1 rounded-xl border border-slate-200 bg-slate-50">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-300" size={16} />
            <input
              type="text"
              placeholder="검색어 입력..."
              className="w-full bg-transparent py-2 pl-10 text-sm focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <AddFAQForm />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full table-fixed border-collapse text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50/50">
            <tr>
              <th className="w-25 px-8 py-5 font-bold text-slate-400 uppercase">ID</th>

              <th className="w-30 px-6 py-5 font-bold text-slate-400 uppercase">Part</th>
              <th className="px-6 py-5 font-bold text-slate-400 uppercase">Question & Answer</th>

              <th className="w-35 px-6 py-5 text-right font-bold text-slate-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredFaqs.map((faq) => (
              <Item key={faq.id} faq={faq} />
            ))}
            {filteredFaqs.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-sm text-slate-400">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

const Item = ({ faq }: { faq: Faq }) => {
  return (
    <tr key={faq.id} className="group transition-colors hover:bg-slate-50/80">
      <td className="px-8 py-5 font-mono text-xs text-slate-400">#{faq.id}</td>
      <td className="px-6 py-5">
        <span className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-bold ${PART_COLORS[faq.part].bg} ${PART_COLORS[faq.part].text}`}>{faq.part}</span>
      </td>
      <td className="px-6 py-5">
        <p className="font-bold text-slate-900">{faq.question}</p>
        <p className="mt-1 text-xs text-slate-400">{faq.answer}</p>
      </td>
      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <EditFAQForm data={faq} />
          <DeleteFAQButton faqId={faq.id} />
        </div>
      </td>
    </tr>
  );
};
