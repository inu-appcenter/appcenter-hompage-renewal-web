'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

const DURANTION = 1000; // 전체 애니메이션 시간
const INTERVAL_TIME = 25; // 숫자가 바뀌는 속도

export const RandomShuffleNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();

    const timer = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;

      if (elapsed >= DURANTION) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        const digitCount = value.toString().length;
        const min = Math.pow(10, digitCount - 1);
        const max = Math.pow(10, digitCount) - 1;
        const randomVal = Math.floor(Math.random() * (max - min + 1)) + min;

        setDisplayValue(randomVal);
      }
    }, INTERVAL_TIME);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{Intl.NumberFormat('en-US').format(displayValue)}</span>;
};
