import { useState } from 'react';
import PageLayout from '../components/PageLayout';
import styles from './LogoPage.module.css';

export default function LogoPage() {
  const [imgErr, setImgErr] = useState(false);

  return (
    <PageLayout accent="rose" chapterLabel="פרק 2" title="הלוגו שלי">
      <div className={styles.wrapper}>

        {/* ── Logo stage: decorative blobs + framed logo ── */}
        <div className={styles.stage}>
          <span className={styles.blob1} aria-hidden="true" />
          <span className={styles.blob2} aria-hidden="true" />
          <span className={styles.blob3} aria-hidden="true" />

          <div className={styles.frame}>
            {imgErr
              ? <div className={styles.fallback}>✨</div>
              : <img
                  className={styles.logo}
                  src="/ronilogo.png"
                  alt="הלוגו שלי"
                  onError={() => setImgErr(true)}
                />
            }
          </div>
        </div>

        {/* ── Description ── */}
        <p className={styles.description}>
          עיצבתי לוגו שמייצג אותי ואת השם שלי.
          <br />
          הלוגו משלב את האותיות של שמי בצורה יצירתית ומבטא שמחה, יצירתיות ואישיות.
        </p>

      </div>
    </PageLayout>
  );
}
