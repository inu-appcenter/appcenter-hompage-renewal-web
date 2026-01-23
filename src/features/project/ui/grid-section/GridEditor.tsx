'use client';
import { GridItem, GridItemType } from 'features/project/types/form';
import { ArrowDownRight, ImageIcon, LayoutGrid, Plus, Trash2, Type, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Responsive, useContainerWidth } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface GridEditorProps {
  initialItems: GridItem[];
  onUpdate: (items: GridItem[]) => void;
  onRemoveSection: () => void;
  index: number;
}
export const GridEditor = ({ initialItems, onUpdate, onRemoveSection, index }: GridEditorProps) => {
  const [items, setItems] = useState<GridItem[]>(initialItems);
  const [inputType, setInputType] = useState<GridItemType>('text');
  const [inputValue, setInputValue] = useState('');

  const { width, containerRef, mounted } = useContainerWidth();

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const onLayoutChange = (newLayout: any) => {
    const updatedData = items.map((item) => {
      const changed = newLayout.find((l: any) => l.i === item.i);

      if (changed) {
        return {
          i: item.i,
          type: item.type,
          content: item.content,
          x: changed.x,
          y: changed.y,
          w: changed.w,
          h: changed.h
        };
      }
      return item;
    });

    setItems(updatedData);
    onUpdate(updatedData);
  };

  const addItem = () => {
    if (!inputValue.trim()) return alert('내용을 입력해주세요.');
    const nextId = items.length > 0 ? Math.max(...items.map((item) => parseInt(item.i))) + 1 : 1;

    const newItem: GridItem = {
      i: String(nextId),
      x: (items.length * 4) % 12,
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

  const removeItem = (itemId: string) => {
    const newItems = items.filter((item) => item.i !== itemId);
    setItems(newItems);
    onUpdate(newItems);
  };

  return (
    <div className="focus-within:border-brand-primary/20 mb-12 flex flex-col gap-6 rounded-4xl border border-white/5 bg-[#0f0f12] p-8 shadow-2xl transition-all">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="bg-brand-primary-cta text-background flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black shadow-[0_0_15px_rgba(var(--brand-primary-rgb),0.3)]">
            {index + 1}
          </div>
        </div>
        <button onClick={onRemoveSection} className="group flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-gray-500 transition-all hover:bg-red-500/10 hover:text-red-400">
          <Trash2 size={14} className="transition-transform group-hover:scale-110" />
          <span>삭제</span>
        </button>
      </div>

      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-2">
          <label className="ml-1 block text-[10px] font-black tracking-widest text-gray-500 uppercase">Block Type</label>
          <div className="flex rounded-xl border border-white/5 bg-[#151518] p-1">
            {(['text', 'image'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setInputType(type)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                  inputType === type ? 'bg-gray-700 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {type === 'text' ? <Type size={16} /> : <ImageIcon size={16} />}
                {type === 'text' ? '텍스트' : '이미지'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <label className="ml-1 block text-[10px] font-black tracking-widest text-gray-500 uppercase">{inputType === 'image' ? 'Image URL' : 'Content'}</label>
          <div className="group focus-within:border-brand-primary/50 focus-within:ring-brand-primary/50 flex items-center gap-3 rounded-xl border border-white/10 bg-[#1e1e22] px-4 py-3 transition-all focus-within:bg-[#202024] focus-within:ring-1 hover:border-white/20">
            {inputType === 'image' ? <ImageIcon className="text-gray-500" size={18} /> : <Type className="text-gray-500" size={18} />}
            <div className="h-4 w-px bg-gray-800" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={inputType === 'image' ? 'https://...' : '내용을 입력하세요...'}
              className="w-full bg-transparent text-sm text-gray-200 outline-none placeholder:text-gray-600"
              onKeyDown={(e) => e.key === 'Enter' && addItem()}
            />
          </div>
        </div>

        <button
          onClick={addItem}
          className="group bg-brand-primary-cta text-background flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-black shadow-lg transition-all hover:brightness-110 active:scale-95"
        >
          <Plus size={18} className="transition-transform group-hover:rotate-90" />
          <span>추가</span>
        </button>
      </div>

      {/* 그리드 에디터 영역 */}
      <div ref={containerRef} className="relative min-h-[300px] w-full rounded-3xl border-2 border-dashed border-gray-800 bg-[#0a0a0c] p-4 transition-colors focus-within:border-gray-700">
        {!items.length && mounted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-gray-700">
            <LayoutGrid size={40} strokeWidth={1} />
            <p className="text-sm font-bold">블록을 추가하여 배치를 시작하세요</p>
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
            onLayoutChange={onLayoutChange}
            resizeConfig={{
              enabled: true,
              handles: ['se']
            }}
          >
            {items.map((item) => (
              <div key={item.i} className="group relative rounded-2xl border border-white/5 bg-[#1e1e22] shadow-lg transition-all hover:border-white/20">
                <div className="drag-handle absolute inset-0 z-0 cursor-move" />

                <div className="absolute top-2 right-2 z-30 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item.i);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="pointer-events-none relative z-10 h-full w-full overflow-hidden p-1">
                  <div className="pointer-events-auto h-full w-full">
                    {item.type === 'image' ? (
                      <img src={item.content} alt="" className="h-full w-full rounded-xl object-cover select-none" />
                    ) : (
                      <div className="custom-scrollbar h-full w-full overflow-y-auto p-4">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-300">{item.content}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="group-hover:text-brand-primary-cta pointer-events-none absolute right-1 bottom-1 z-20 text-gray-600 opacity-50">
                  <ArrowDownRight size={16} />
                </div>
              </div>
            ))}
          </Responsive>
        )}
      </div>
    </div>
  );
};
