import { useEffect, useRef } from 'react';
import NavigationItem from './NavigationItem';
import styles from './FloatingMenu.module.css';

const NAV_ITEMS = [
  { id: 'book',   label: 'ספר השורשים של רוני' },
  { id: 'mizne',  label: 'המיזם שלי' },
  { id: 'aichat', label: 'צ׳אט AI על העבודה' },
];

export default function FloatingMenu({ activeSection, onSectionChange, isOpen, onClose, triggerRef, onDownloadPdf }) {
  const panelRef = useRef(null);

  // Close on click outside (but not on the trigger button)
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      const clickedPanel   = panelRef.current?.contains(e.target);
      const clickedTrigger = triggerRef?.current?.contains(e.target);
      if (!clickedPanel && !clickedTrigger) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onClose, triggerRef]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleSelect = (id) => {
    onSectionChange(id);
    onClose();
  };

  const handleDownloadPdf = () => {
    onClose();
    onDownloadPdf?.();
  };

  return (
    <>
      {/* Soft overlay behind the panel */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        aria-hidden="true"
      />

      {/* Floating panel */}
      <div
        ref={panelRef}
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        role="dialog"
        aria-modal="false"
        aria-label="תפריט ניווט"
        dir="rtl"
        inert={!isOpen ? '' : undefined}
      >
        <div className={styles.header}>
          <span className={styles.title}>
            <span className={styles.ornament} aria-hidden="true">✦</span>
            ניווט
          </span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="סגור תפריט">
            ✕
          </button>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <ul className={styles.list} role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <NavigationItem
                label={item.label}
                isActive={activeSection === item.id}
                onClick={() => handleSelect(item.id)}
              />
            </li>
          ))}

          {/* Visual separator before action item */}
          <li aria-hidden="true">
            <div className={styles.actionDivider} />
          </li>

          <li>
            <button
              className={styles.downloadBtn}
              onClick={handleDownloadPdf}
              dir="rtl"
            >
              <span className={styles.downloadIcon} aria-hidden="true">⬇</span>
              <span>הורדת הספר כ-PDF</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
