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

  const { component: CurrentPage, hebrewNumber } = pages[currentIndex];

  return (
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
  );
}
