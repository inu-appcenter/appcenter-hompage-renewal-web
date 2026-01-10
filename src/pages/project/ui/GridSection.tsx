'use client';
import { useState } from 'react';
import { Responsive, useContainerWidth } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const initialData = [
  { i: '1', x: 0, y: 0, w: 4, h: 20, type: 'image', content: 'https://example.com/a2-poster.jpg' },
  { i: '2', x: 4, y: 0, w: 4, h: 12, type: 'image', content: 'https://picsum.photos/400/300' },
  { i: '3', x: 8, y: 0, w: 3, h: 6, type: 'image', content: 'https://picsum.photos/400/300' },
  { i: '4', x: 8, y: 0, w: 3, h: 6, type: 'image', content: 'https://picsum.photos/400/300' },
  {
    i: '5',
    x: 8,
    y: 12,
    w: 6,
    h: 6,
    type: 'text',
    content:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non quas fugit tempora quam illo iure repellendus facilis est expedita id, qui maiores cum sunt obcaecati ab. Vel quisquam repellendus cum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.'
  }
];

export const GridSection = ({ isReadOnly = false }) => {
  const [layout, setLayout] = useState(initialData);
  const { width, containerRef, mounted } = useContainerWidth();

  const onLayoutChange = (newLayout: any) => {
    if (isReadOnly) return;

    const updatedData = layout.map((item) => {
      const changed = newLayout.find((l: any) => l.i === item.i);
      return changed ? { ...item, ...changed } : item;
    });
    setLayout(updatedData);
  };

  return (
    <section ref={containerRef} className="mx-20 min-h-screen w-full">
      {mounted && (
        <Responsive
          className="layout"
          layouts={{ lg: layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          margin={[10, 10]}
          width={width}
          dragConfig={{
            enabled: true
          }}
          resizeConfig={{
            enabled: true
          }}
          onLayoutChange={onLayoutChange}
        >
          {layout.map((item) => (
            <div key={item.i} className="rounded-lg">
              {item.type === 'image' ? (
                <img src={item.content} alt="content" className="bg-custom-gray-300 h-full w-full rounded-lg object-cover" />
              ) : (
                <div className="text-primary-gradient h-full text-xl/7">{item.content}</div>
              )}
            </div>
          ))}
        </Responsive>
      )}
    </section>
  );
};
