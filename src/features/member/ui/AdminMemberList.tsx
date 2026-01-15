'use client';
import { useState, useMemo } from 'react';
import { Search, Github, Palette, Phone, Mail, ExternalLink, NotebookPen } from 'lucide-react';
import type { Member } from 'entities/member';
import { EmptyResult } from 'shared/error/EmptyResult';
import { useMember } from '../hooks/useMemberActions';
import { AddMemberForm, EditMemberForm, DeleteMemberButton } from './MemberForm';

export const AdminMemberList = () => {
  const { data } = useMember();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = useMemo(() => {
    return data.filter((m) => {
      const searchStr = `${m.name} ${m.email || ''} ${m.phoneNumber || ''} ${m.department || ''} ${m.studentNumber || ''}`.toLowerCase();
      return searchStr.includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, data]);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="relative max-w-md flex-1 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-300" size={18} />
          <input
            type="text"
            placeholder="이름, 연락처, 이메일로 검색..."
            className="w-full bg-transparent py-3 pr-4 pl-12 text-sm focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <AddMemberForm />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full table-fixed border-collapse text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50/50">
            <tr>
              <th className="w-16 px-6 py-5 text-center font-bold tracking-wider text-slate-400">ID</th>
              <th className="w-68 px-6 py-5 font-bold tracking-wider text-slate-400">기본 정보</th>
              <th className="w-64 px-6 py-5 font-bold tracking-wider text-slate-400">학과/학번</th>
              <th className="px-6 py-5 font-bold tracking-wider text-slate-400">등록된 링크</th>
              <th className="w-28 px-6 py-5 text-right font-bold tracking-wider text-slate-400">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredMembers.map((member) => (
              <MemberItem key={member.member_id} member={member} />
            ))}
            {filteredMembers.length === 0 && <EmptyResult />}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MemberItem = ({ member }: { member: Member }) => {
  return (
    <tr className="group transition-colors hover:bg-slate-50/50">
      <td className="px-6 py-5 text-center font-mono text-sm text-slate-400">#{member.member_id}</td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
            {member.profileImage ? (
              <img src={member.profileImage} alt={member.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-200 text-xl text-slate-400">{member.name.charAt(0)}</div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900">{member.name}</p>
            <p className="mt-1 flex items-center gap-1 truncate text-sm text-slate-400">
              <Mail size={10} /> {member.email || '이메일 없음'}
            </p>
            <p className="mt-1 flex items-center gap-1 truncate text-sm text-slate-400">
              <Phone size={12} className="text-slate-300" />
              {member.phoneNumber || '연락처 없음'}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="space-y-1.5 text-xs">
          <div className="flex flex-col gap-0.5 text-sm text-slate-400">
            <span className="font-medium text-slate-500">{member.department || '학과 미입정'}</span>
            <span>{member.studentNumber || '학번 미입력'}</span>
          </div>
        </div>
      </td>

      {/* 소셜 링크 세로 배치 영역 */}
      <td className="px-6 py-5">
        <div className="flex flex-col gap-1.5">
          {member.gitRepositoryLink && (
            <a href={member.gitRepositoryLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900">
              <Github size={14} className="text-slate-400" />
              <span className="truncate">GitHub : {member.gitRepositoryLink}</span>
              <ExternalLink size={10} className="opacity-0 group-hover:opacity-40" />
            </a>
          )}
          {member.behanceLink && (
            <a href={member.behanceLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-[#0057ff]">
              <Palette size={14} className="text-slate-400" />
              <span className="truncate">Behance : {member.behanceLink}</span>
              <ExternalLink size={10} className="opacity-0 group-hover:opacity-40" />
            </a>
          )}
          {member.blogLink && (
            <a href={member.blogLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-indigo-500">
              <NotebookPen size={14} className="text-slate-400" />
              <span className="truncate">Blog : {member.blogLink}</span>
              <ExternalLink size={10} className="opacity-0 group-hover:opacity-40" />
            </a>
          )}
          {!member.gitRepositoryLink && !member.behanceLink && !member.blogLink && <span className="text-xs text-slate-400">등록된 링크 없음</span>}
        </div>
      </td>

      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <EditMemberForm member={member} />
          <DeleteMemberButton memberId={member.member_id} />
        </div>
      </td>
    </tr>
  );
};
