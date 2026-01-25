'use client';
import { useState, useEffect, useCallback } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const ScrambleText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [result, setResult] = useState('');

  const scramble = useCallback(() => {
    let frame = 0;
    const maxFrames = 30;

    const interval = setInterval(() => {
      const scrambled = text
        .split('')
        .map((char, i) => {
          if (frame > i * 3 + 10) return char;
          return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        })
        .join('');

      setResult(scrambled);

      if (frame > text.length * 3 + maxFrames) {
        clearInterval(interval);
      }
      frame++;
    }, 80);

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    const timer = setTimeout(scramble, delay);
    return () => clearTimeout(timer);
  }, [scramble, delay]);

  return <>{result || text.replace(/[^\s]/g, '0')}</>;
};
