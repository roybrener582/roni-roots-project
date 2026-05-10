import { useState, useRef, createElement } from 'react';
import { pages } from '../data/pagesConfig';
import BookLayout from './BookLayout';
import BookPage from './BookPage';
import Navigation from './Navigation';
import PageTurnTransition, { FLIP_MS } from './PageTurnTransition';
import { usePageNavigationControls } from '../hooks/usePageNavigationControls';

export default function Book() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // flipState: null when idle, { index, direction } during animation
  const [flipState, setFlipState] = useState(null);
  const locked = useRef(false);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const navigate = (to, direction) => {
    if (locked.current || to === currentIndex) return;
    locked.current = true;
    setFlipState({ index: currentIndex, direction });
    setCurrentIndex(to);
    setTimeout(() => {
      setFlipState(null);
      locked.current = false;
    }, FLIP_MS);
  };

  const goToNext = () => {
    if (currentIndex < pages.length - 1) navigate(currentIndex + 1, 'next');
  };
  const goToPrev = () => {
    if (currentIndex > 0) navigate(currentIndex - 1, 'prev');
  };
  const goToPage = (pageNum) => {
    const idx = pageNum - 1;
    if (idx === currentIndex) return;
    navigate(idx, idx > currentIndex ? 'next' : 'prev');
  };

  usePageNavigationControls({ onNext: goToNext, onPrev: goToPrev });

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    // Require a dominant horizontal gesture (≥50px, at least 1.5× the vertical delta)
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0) goToNext();
    else goToPrev();
  };

  const handleTouchCancel = () => {
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const { component: CurrentPage, hebrewNumber } = pages[currentIndex];

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      style={{ touchAction: 'pan-y' }}
    >
      <BookLayout
        nav={
          <Navigation
            current={currentIndex}
            total={pages.length}
            onNext={goToNext}
            onPrev={goToPrev}
            onGoTo={goToPage}
            disabled={!!flipState}
          />
        }
      >
        <PageTurnTransition
          isFlipping={!!flipState}
          direction={flipState?.direction ?? 'next'}
          outgoing={
            flipState && (
              <BookPage pageNumber={pages[flipState.index].hebrewNumber}>
                {createElement(pages[flipState.index].component)}
              </BookPage>
            )
          }
        >
          <BookPage key={currentIndex} pageNumber={hebrewNumber}>
            <CurrentPage />
          </BookPage>
        </PageTurnTransition>
      </BookLayout>
    </div>
  );
}
