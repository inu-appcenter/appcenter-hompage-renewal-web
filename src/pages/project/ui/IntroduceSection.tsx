'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from 'entities/project';

const TABS = ['사용 스택', '팀원 정보', '이용 현황'];
// 레이아웃은 나중에 작성할 예정
// 되는지만 테스트
export const IntroduceSection = ({ data }: { data: Project }) => {
  const [selected, setSelected] = useState(0);

  return (
    <section className="mx-20 flex h-screen flex-col items-center justify-center gap-10">
      <div className="relative flex flex-row gap-30">
        {TABS.map((tab, index) => (
          <SelectButton key={index} text={tab} isSelected={selected === index} onClick={() => setSelected(index)} />
        ))}
      </div>

      <div className="bg-custom-black flex h-118.5 w-full items-center justify-center overflow-hidden rounded-2xl px-28 py-11.5 text-5xl whitespace-pre-line text-white">
        <AnimatePresence mode="wait">
          <motion.div key={selected} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            {selected === 0 && (
              <div>
                {data.stacks &&
                  data.stacks.map((stack) => (
                    <div key={stack.id}>
                      <img src={stack.icon} alt={stack.name} className="mr-2 inline-block h-8 w-8 align-middle" />
                      {stack.name}
                    </div>
                  ))}
              </div>
            )}
            {selected === 1 && <div>{data.groups && data.groups.map((member) => <div key={member.group_id}>{member.member}</div>)}</div>}
            {selected === 2 && '백엔드 생기면 넣을 예정3'}
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
