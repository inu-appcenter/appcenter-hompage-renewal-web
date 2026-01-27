'use client';
import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Part } from 'shared/types/part';
import { Project } from 'entities/project';
import { SkillStack } from 'entities/skill-stack';

export const IntroduceSection = ({ data }: { data: Project }) => {
  const [selected, setSelected] = useState(0);

  return (
    <section className="flex h-screen flex-col items-center justify-center gap-10">
      <div className="relative flex flex-row gap-30">
        {['사용 스택', '팀원 정보', '이용 현황'].map((tab, index) => (
          <SelectButton key={index} text={tab} isSelected={selected === index} onClick={() => setSelected(index)} />
        ))}
      </div>

      <div className="bg-custom-black flex h-110 w-full items-center justify-center overflow-hidden rounded-2xl px-20 py-11.5 whitespace-pre-line">
        <AnimatePresence mode="wait">
          <motion.div key={selected} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="h-full w-full">
            {selected === 0 && <Stacks data={data.stacks} />}
            {selected === 1 && <Groups data={data.groups} />}
            {selected === 2 && <div className="text-primary-gradient flex h-full items-center justify-center text-3xl">아직 이용현황이 없습니다</div>}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const SelectButton = ({ text, onClick, isSelected }: { text: string; onClick: () => void; isSelected: boolean }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative flex cursor-pointer items-center gap-2.5 rounded-[40px] px-6 py-3 text-2xl transition-colors duration-300 ${
        isSelected ? 'text-brand-primary-cta' : 'text-text-primary border-text-primary border'
      }`}
    >
      {isSelected && (
        <motion.div
          layoutId="active-pill"
          className="border-brand-primary-cta absolute inset-0 rounded-[40px] border shadow-[0px_0px_16px_0px_#57FF8566]"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}

      <motion.div animate={{ rotate: isSelected ? 45 : 0 }} transition={{ duration: 0.3 }}>
        <Plus fill={'currentColor'} strokeWidth={0.5} size={28} />
      </motion.div>

      <span className="relative z-10">{text}</span>
    </button>
  );
};

const Stacks = ({ data }: { data: SkillStack[] }) => {
  if (!data || data.length === 0) return <div className="text-primary-gradient flex h-full items-center justify-center text-3xl">사용 스택 정보가 없습니다</div>;
  return (
    <div className="flex h-full flex-wrap content-center gap-8">
      {data &&
        data.map((stack) => (
          <div key={stack.name} className="bg-custom-gray-900 flex shrink-0 items-center gap-2 rounded-full px-3 py-2">
            <img src={stack.icon} alt={`${stack.name} icon`} className="h-4 w-4 object-contain" />
            <span className="text-primary-gradient text-lg font-medium">{stack.name}</span>
          </div>
        ))}
    </div>
  );
};

interface Groups {
  member: string;
  group_id: number;
  part: Part;
}
const Groups = ({ data }: { data: Groups[] }) => {
  const groupedByPart = useMemo(() => {
    const groups: Record<string, Groups[]> = {};
    data?.forEach((member) => {
      if (!groups[member.part]) groups[member.part] = [];
      groups[member.part].push(member);
    });

    return groups;
  }, [data]);

  if (!data) return <div className="text-primary-gradient flex h-full items-center justify-center text-3xl">팀원 정보가 없습니다</div>;
  return (
    <div className="flex w-full justify-between">
      {data &&
        Object.entries(groupedByPart).map(([part, members]) => (
          <div key={part} className="flex shrink-0 flex-col items-start gap-6 rounded-full px-3 py-2">
            <span className="text-brand-primary-cta text-lg font-semibold uppercase">{part}</span>
            <div className="flex flex-col items-center gap-10">
              {members.map((member) => (
                <div key={member.member} className="flex flex-row items-center gap-4">
                  <div className="bg-custom-gray-500 flex h-15 w-15 items-center justify-center rounded-full text-2xl font-bold">{member.member.charAt(0)}</div>
                  <span className="text-primary-gradient text-xl">{member.member}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
