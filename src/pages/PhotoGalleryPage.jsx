import { useState, useEffect, useCallback } from 'react';
import PageLayout from '../components/PageLayout';
import images from 'virtual:gallery-images';
import styles from './PhotoGalleryPage.module.css';

function Lightbox({ src, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className={styles.lbBackdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="תמונה מוגדלת"
    >
      <div className={styles.lbBox} onClick={(e) => e.stopPropagation()}>
        <img src={src} alt="" className={styles.lbImg} />
        <button className={styles.lbClose} onClick={onClose} aria-label="סגור">✕</button>
      </div>
    </div>
  );
}

function GalleryItem({ src, onOpen }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={styles.item}
      onClick={() => onOpen(src)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(src)}
      aria-label="הצג תמונה"
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className={`${styles.img}${loaded ? ` ${styles.imgLoaded}` : ''}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default function PhotoGalleryPage() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const handleClose = useCallback(() => setLightboxSrc(null), []);

  return (
    <PageLayout
      accent="rose"
      title="גלריית תמונות"
      subtitle="רגעים מהחיים"
    >
      <div className={styles.grid}>
        {images.map((src) => (
          <GalleryItem key={src} src={src} onOpen={setLightboxSrc} />
        ))}
      </div>
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={handleClose} />
      )}
    </PageLayout>
  );
}
