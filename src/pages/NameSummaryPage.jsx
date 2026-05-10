import PageLayout from '../components/PageLayout';
import styles from './NameSummaryPage.module.css';

export default function NameSummaryPage() {
  return (
    <PageLayout
      accent="gold"
      chapterLabel="פרק 2"
      title="פסקת סיכום"
    >
      <div className={styles.canvas}>
        <span className={styles.glow} aria-hidden="true" />

        <div className={styles.quoteCard}>
          <span className={styles.topDeco} aria-hidden="true">✨</span>

          <p className={styles.para}>
            שמי <strong className={styles.em}>רוני ברנר</strong>. הוריי בחרו בשם זה לזכר דודי ניר ז״ל,
            מכיוון שהשם רוני מורכב מאותן האותיות של שמו (ניר).
          </p>

          <div className={styles.sep} aria-hidden="true">
            <span /><span className={styles.sepIcon}>📖</span><span />
          </div>

          <p className={styles.para}>
            משמעות השם היא{' '}
            <span className={styles.quotePhrase}>״<span className={styles.em}>השמחה שלי</span>״</span>{' '}
            או ״השיר שלי״, כמו בפסוק ״רני ושמחי בת ציון״,
            וכך הוא משלב בין הנצחת הזיכרון לבין שמחת חיים.
          </p>

          <div className={styles.sep} aria-hidden="true">
            <span /><span className={styles.sepIcon}>💛</span><span />
          </div>

          <p className={styles.para}>
            בבית, הכינוי שלי הוא{' '}
            <strong className={styles.nickname}>רונצ׳ו</strong>
            {' '}<span aria-hidden="true">💛</span>
          </p>

          <div className={styles.closingRule} aria-hidden="true" />
        </div>
      </div>
    </PageLayout>
  );
}
