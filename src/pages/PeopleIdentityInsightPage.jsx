import PageLayout from '../components/PageLayout';
import styles from './PeopleIdentityInsightPage.module.css';

export default function PeopleIdentityInsightPage() {
  return (
    <PageLayout
      accent="gold"
      chapterLabel="פרק 10 – העם שלי"
      title="מה זה להיות חלק מהעם שלי?"
    >
      <div className={styles.wrapper}>

        <div className={styles.aura} aria-hidden="true" />

        <span className={styles.iconFlag}   aria-hidden="true">🇮🇱</span>
        <span className={styles.iconHeart}  aria-hidden="true">💛</span>
        <span className={styles.iconHands}  aria-hidden="true">🤝</span>

        <div className={styles.flow}>

          {/* ── Section 1 ── */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>מה זה להיות חלק מהעם שלי בעיניי?</span>
            <p className={styles.para}>
              בעיניי, להיות חלק מהעם שלי זה להרגיש שייכת{' '}
              <span className={styles.keyWord}>לעם ישראל,</span>{' '}
              לדעת שיש לנו היסטוריה משותפת ושכולנו קשורים אחד לשני גם אם אנחנו שונים.
            </p>
          </div>

          <div className={styles.rule} aria-hidden="true" />

          {/* ── Section 2 ── */}
          <div className={`${styles.section} ${styles.sectionClosing}`}>
            <span className={styles.sectionLabel}>אילו דברים מאחדים אותנו כעם, גם כשיש חילוקי דעות?</span>
            <p className={`${styles.para} ${styles.paraClosing}`}>
              מה שמאחד אותנו זה{' '}
              <span className={styles.keyWord}>השפה העברית, החגים, המסורת</span>{' '}
              והאהבה למדינה שלנו. גם כשיש חילוקי דעות, עדיין יש בינינו קשר חזק כי אנחנו עם אחד ויש לנו הרבה דברים משותפים.
            </p>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
