import PageLayout from '../components/PageLayout';
import styles from './TraitDefinitionPage.module.css';

export default function TraitDefinitionPage() {
  return (
    <PageLayout accent="violet" chapterLabel="פרק 3" title="מהי תכונה בעיניי?">
      <div className={styles.stack}>

        {/* ── Section 1: Definition statement ── */}
        <section className={`${styles.card} ${styles.cardFirst}`}>
          <p className={styles.mainSentence}>
            <span className={styles.em}>תכונה</span> בעיניי היא דבר שמאפיין מישהו.
          </p>
        </section>

        {/* ── Section 2: The detective analogy ── */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.icon} aria-hidden="true">🔍</span>
            <span className={styles.cardLabel}>לגלות תכונה</span>
          </div>
          <p className={styles.mainSentence}>
            לזהות{' '}
            <span className={styles.em}>תכונה</span>{' '}
            של אדם זה קצת כמו להיות{' '}
            <span className={`${styles.em} ${styles.emDetective}`}>בלש</span>.
          </p>
          <p className={styles.support}>
            תכונות אופי אי אפשר לראות בעיניים כמו שרואים גובה או צבע שיער,
            ולכן צריך לחפש רמזים בהתנהגות של האדם.
          </p>
          <div className={styles.clueTrail} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </section>

        {/* ── Section 3: Traits can change ── */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.icon} aria-hidden="true">🌱</span>
            <span className={styles.cardLabel}>האם תכונות משתנות?</span>
          </div>
          <p className={styles.mainSentence}>
            כן, תכונות אופי יכולות{' '}
            <span className={styles.em}>להשתנות</span>.
          </p>
          <p className={styles.support}>
            בניגוד לתכונות חיצוניות כמו צבע עיניים, תכונות אופי הן גמישות
            ויכולות להתפתח במהלך החיים.
          </p>
        </section>

      </div>
    </PageLayout>
  );
}
