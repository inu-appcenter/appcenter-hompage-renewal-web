'use client';

import { useMemo } from 'react';
import { Responsive, useContainerWidth } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface GridSectionProps {
  content?: string; // 서버에서 받은 JSON string
}

export const GridSection = ({ content }: GridSectionProps) => {
  const { width, containerRef, mounted } = useContainerWidth();

  // 1. JSON 문자열을 객체 배열(GridItem[][])로 파싱
  const sections = useMemo(() => {
    if (!content) return [];
    try {
      const parsed = JSON.parse(content);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('데이터 파싱 실패:', e);
      return [];
    }
  }, [content]);

  return (
    <div ref={containerRef} className="flex w-full flex-col gap-20 px-4 py-20 lg:px-20">
      {mounted &&
        sections.map((layout, index) => (
          <section key={`view-section-${index}`} className="w-full">
            <Responsive
              className="layout"
              layouts={{ lg: layout }}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
              rowHeight={30}
              margin={[16, 16]}
              width={width}
              // ✅ 핵심: 조회 전용 설정
              isDraggable={false}
              isResizable={false}
            >
              {layout.map((item: any) => (
                <div key={item.i} className="overflow-hidden rounded-2xl">
                  {item.type === 'image' ? (
                    <img src={item.content} alt="" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                  ) : (
                    <div className="flex h-full w-full items-start p-2">
                      <p className="text-lg leading-relaxed whitespace-pre-wrap text-gray-200">{item.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </Responsive>
          </section>
        ))}
    </div>
  );
};
