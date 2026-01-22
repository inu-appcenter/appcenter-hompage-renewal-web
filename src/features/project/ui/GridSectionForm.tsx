'use client';
import { useState, useCallback } from 'react';
import { Responsive, useContainerWidth } from 'react-grid-layout';
import { Plus, Image as ImageIcon, Type, X, ArrowRight, Loader2, ArrowDownRight, LayoutGrid, Trash2, Layers } from 'lucide-react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// --- Types ---
type GridItemType = 'image' | 'text';

interface GridItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  type: GridItemType;
  content: string;
}

interface SectionData {
  id: string;
  title?: string;
  items: GridItem[];
}

const SingleGridEditor = ({
  sectionId,
  initialItems,
  onUpdate,
  onRemoveSection,
  index
}: {
  sectionId: string;
  initialItems: GridItem[];
  onUpdate: (items: GridItem[]) => void;
  onRemoveSection: () => void;
  index: number;
}) => {
  const [items, setItems] = useState<GridItem[]>(initialItems);
  const [inputType, setInputType] = useState<GridItemType>('text');
  const [inputValue, setInputValue] = useState('');

  const { width, containerRef, mounted } = useContainerWidth();

  const onLayoutChange = (newLayout: any) => {
    const updatedData = items.map((item) => {
      const changed = newLayout.find((l: any) => l.i === item.i);
      return changed ? { ...item, ...changed } : item;
    });
    setItems(updatedData);
    onUpdate(updatedData);
  };

  // 아이템 추가
  const addItem = () => {
    if (!inputValue.trim()) return alert('내용을 입력해주세요.');

    const newItem: GridItem = {
      i: crypto.randomUUID(),
      x: 0,
      y: Infinity,
      w: inputType === 'image' ? 4 : 12,
      h: inputType === 'image' ? 10 : 4,
      type: inputType,
      content: inputValue
    };

    const newItems = [...items, newItem];
    setItems(newItems);
    onUpdate(newItems);
    setInputValue('');
  };

  // 아이템 삭제
  const removeItem = (itemId: string) => {
    const newItems = items.filter((item) => item.i !== itemId);
    setItems(newItems);
    onUpdate(newItems);
  };

  // 스타일 클래스
  const inputContainerClass =
    'group flex items-center gap-3 rounded-xl border border-white/10 bg-surface-elevated px-4 py-3 transition-all focus-within:border-brand-primary/50 focus-within:bg-[#202024] focus-within:ring-1 focus-within:ring-brand-primary/50 hover:border-white/20';
  const inputClass = 'w-full bg-transparent text-sm text-gray-200 outline-none placeholder:text-gray-600';

  return (
    <div className="mb-12 flex flex-col gap-6 rounded-[48px] border border-white/5 bg-[#0f0f12] p-8 shadow-2xl">
      {/* 섹션 헤더 & 삭제 버튼 */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="bg-brand-primary/10 text-brand-primary ring-brand-primary/20 flex h-8 w-8 items-center justify-center rounded-full font-bold ring-1">{index + 1}</div>
          <h3 className="text-xl font-bold text-gray-200">섹션 #{index + 1}</h3>
        </div>
        <button
          onClick={onRemoveSection}
          className="flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-400 transition-colors hover:bg-red-500 hover:text-white"
        >
          <Trash2 size={14} /> 섹션 삭제
        </button>
      </div>

      {/* --- Toolbar Area (개별 섹션용) --- */}
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-end">
        {/* 타입 선택 */}
        <div className="flex flex-col gap-2">
          <label className="ml-1 block text-xs font-bold tracking-wider text-gray-500">블록 타입</label>
          <div className="flex rounded-xl border border-white/10 bg-[#151518] p-1">
            <button
              onClick={() => setInputType('text')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-all ${
                inputType === 'text' ? 'bg-gray-700 text-white shadow-md' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
              }`}
            >
              <Type size={16} /> 텍스트
            </button>
            <button
              onClick={() => setInputType('image')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-all ${
                inputType === 'image' ? 'bg-gray-700 text-white shadow-md' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
              }`}
            >
              <ImageIcon size={16} /> 이미지
            </button>
          </div>
        </div>

        {/* 입력 필드 */}
        <div className="flex flex-1 flex-col gap-2">
          <label className="ml-1 block text-xs font-bold tracking-wider text-gray-500">{inputType === 'image' ? '이미지 URL' : '텍스트 내용'}</label>
          <div className={inputContainerClass}>
            {inputType === 'image' ? <ImageIcon className="text-gray-500" size={20} /> : <Type className="text-gray-500" size={20} />}
            <div className="h-4 w-px bg-gray-700"></div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={inputType === 'image' ? 'https://example.com/image.jpg' : '내용을 입력하세요...'}
              className={inputClass}
              onKeyDown={(e) => e.key === 'Enter' && addItem()}
            />
          </div>
        </div>

        {/* 추가 버튼 */}
        <button onClick={addItem} className="group flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-black transition-all hover:bg-gray-200 active:scale-95">
          <Plus size={18} className="transition-transform group-hover:rotate-90" />
          <span>추가</span>
        </button>
      </div>

      {/* --- Grid Editor Area --- */}
      <div ref={containerRef} className="relative min-h-100 w-full rounded-4xl border-2 border-dashed border-gray-700 bg-[#151518] p-4 transition-colors hover:border-gray-600">
        {items.length === 0 && mounted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-gray-600">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1e1e22] ring-1 ring-white/5">
              <LayoutGrid size={24} />
            </div>
            <p className="text-sm font-medium">블록을 추가하여 배치를 시작하세요</p>
          </div>
        )}

        {mounted && (
          <Responsive
            className="layout"
            layouts={{ lg: items }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={30}
            margin={[16, 16]}
            width={width}
            dragConfig={{
              enabled: true
            }}
            resizeConfig={{
              enabled: true,
              handles: ['se']
            }}
            onLayoutChange={onLayoutChange}
          >
            {items.map((item) => (
              <div
                key={item.i}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#1e1e22] shadow-lg transition-all hover:z-50 hover:border-white/20 hover:shadow-xl [&>.react-resizable-handle]:z-50! [&>.react-resizable-handle]:h-6! [&>.react-resizable-handle]:w-6!"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.i);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="absolute top-2 right-2 z-50 hidden h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors group-hover:flex hover:bg-red-500"
                >
                  <X size={14} />
                </button>

                <div className="h-full w-full overflow-hidden">
                  {item.type === 'image' ? (
                    <img src={item.content} alt="grid-item" className="h-full w-full object-cover opacity-90 transition-opacity select-none group-hover:opacity-100" />
                  ) : (
                    <div className="custom-scrollbar h-full w-full overflow-y-auto p-5 pb-8 select-text">
                      <p className="leading-relaxed whitespace-pre-wrap text-gray-300">{item.content}</p>
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 z-10 cursor-move bg-transparent" />
                <div className="pointer-events-none absolute right-2 bottom-2 z-40 text-gray-500 opacity-50 group-hover:text-white group-hover:opacity-100">
                  <ArrowDownRight size={20} />
                </div>
              </div>
            ))}
          </Responsive>
        )}
      </div>
    </div>
  );
};

// --- 메인 부모 컴포넌트 ---
export const GridSectionForm = ({ setStep }: { setStep: React.Dispatch<React.SetStateAction<'main' | 'introduce' | 'grid'>> }) => {
  // 섹션 목록 관리 (초기값: 섹션 1개)
  const [sections, setSections] = useState<SectionData[]>([
    {
      id: crypto.randomUUID(),
      items: [{ i: '1', x: 0, y: 0, w: 4, h: 20, type: 'image', content: 'https://picsum.photos/400/600' }]
    }
  ]);
  const [isPending, setIsPending] = useState(false);

  // 새 섹션 추가
  const addSection = () => {
    setSections((prev) => [...prev, { id: crypto.randomUUID(), items: [] }]);
  };

  // 섹션 삭제
  const removeSection = (sectionId: string) => {
    if (sections.length === 1) return alert('최소 하나의 섹션은 필요합니다.');
    setSections((prev) => prev.filter((s) => s.id !== sectionId));
  };

  // 특정 섹션의 items 업데이트
  const updateSectionItems = useCallback((sectionId: string, newItems: GridItem[]) => {
    setSections((prev) => prev.map((section) => (section.id === sectionId ? { ...section, items: newItems } : section)));
  }, []);

  const handleSubmit = () => {
    setIsPending(true);
    // sections 배열 전체를 저장
    console.log(JSON.stringify(sections, null, 2));
    setTimeout(() => {
      setIsPending(false);
      alert('모든 섹션이 저장되었습니다.');
    }, 1000);
  };

  return (
    <section className="relative flex w-full flex-col px-8 pt-8 text-white">
      {/* 타이틀 영역 */}
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-gray-200">상세 페이지 구성</h2>
        <p className="text-sm text-gray-500">필요한 만큼 섹션을 추가하고, 각 섹션별로 레이아웃을 자유롭게 배치하세요.</p>
      </div>

      {/* --- 섹션 리스트 렌더링 --- */}
      <div className="flex flex-col">
        {sections.map((section, index) => (
          <SingleGridEditor
            key={section.id}
            sectionId={section.id}
            index={index}
            initialItems={section.items}
            onUpdate={(items) => updateSectionItems(section.id, items)}
            onRemoveSection={() => removeSection(section.id)}
          />
        ))}
      </div>

      {/* --- 섹션 추가 버튼 --- */}
      <div className="mb-32 flex justify-center">
        <button
          onClick={addSection}
          className="group hover:border-brand-primary hover:bg-brand-primary/5 hover:text-brand-primary flex items-center gap-3 rounded-full border border-dashed border-gray-600 bg-[#151518] px-8 py-4 text-gray-400 transition-all"
        >
          <div className="group-hover:bg-brand-primary flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 transition-colors group-hover:text-white">
            <Plus size={18} />
          </div>
          <span className="text-lg font-bold">새로운 섹션 추가하기</span>
        </button>
      </div>

      {/* --- 최종 저장 플로팅 버튼 --- */}
      <div className="fixed right-24 bottom-10 z-50 flex items-center gap-4">
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="group bg-brand-primary-cta text-custom-black flex items-center gap-2 rounded-full px-6 py-4 text-xl font-semibold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span className="font-medium">저장 중...</span>
            </>
          ) : (
            <>
              <span className="font-medium">다음 (완료)</span>
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
            </>
          )}
        </button>
      </div>
    </section>
  );
};
