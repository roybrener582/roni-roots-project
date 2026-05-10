import { useEffect, useRef } from 'react';

const SWIPE_THRESHOLD = 50;

export function usePageNavigationControls({ onNext, onPrev }) {
  // Refs so listeners are registered once but always call the latest callbacks
  const onNextRef = useRef(onNext);
  const onPrevRef = useRef(onPrev);
  const touchStartX = useRef(null);

  useEffect(() => {
    onNextRef.current = onNext;
    onPrevRef.current = onPrev;
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'ArrowRight') onNextRef.current();
      else if (e.key === 'ArrowLeft') onPrevRef.current();
    };

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      if (touchStartX.current === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
      if (deltaX < 0) onNextRef.current(); // swipe left → next
      else onPrevRef.current();             // swipe right → previous
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
}
