import { createElement } from 'react';
import BookPage from './BookPage';
import styles from './BookPrintView.module.css';

/**
 * BookPrintView — off-screen container used only during PDF generation.
 * Renders every page at fixed A4 dimensions so html2canvas can capture them
 * one by one. Never shown on screen; mounted into a hidden host element.
 */
export default function BookPrintView({ pages, pageW, pageH }) {
  return (
    <div className={styles.host} dir="rtl">
      {pages.map((page) => (
        <div
          key={page.id}
          data-pdf-page={page.id}
          className={styles.pageSlot}
          style={{ width: pageW, height: pageH }}
        >
          <BookPage pageNumber={page.hebrewNumber}>
            {createElement(page.component)}
          </BookPage>
        </div>
      ))}
    </div>
  );
}
