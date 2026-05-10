import PageLayout from '../components/PageLayout';
import styles from './FamilyTreeInsightPage.module.css';

export default function FamilyTreeInsightPage() {
  return (
    <PageLayout
      accent="forest"
      chapterLabel="פרק 7 – עץ המשפחה שלי"
      title="מהו עץ משפחה בשבילי?"
    >
      <div className={styles.wrapper}>

        <div className={styles.aura} aria-hidden="true" />

        <span className={styles.iconTree} aria-hidden="true">🌳</span>
        <span className={styles.iconBook} aria-hidden="true">📖</span>

        <div className={styles.textBlock}>

          <p className={styles.para}>
            חשוב לי לדעת את{' '}
            <span className={styles.heritageWord}>הדורות שלפניי</span>,
            <br />
            כדי להכיר את{' '}
            <span className={styles.heritageWord}>ההיסטוריה</span>{' '}
            של המשפחה שלי
            <br />
            וללמוד דברים חדשים עליה.
          </p>

          <div className={styles.rule} aria-hidden="true" />

          <p className={`${styles.para} ${styles.paraInsight}`}>
            בעיניי, עץ משפחה הוא לא רק רשימה של אנשים,
            <br />
            אלא גם{' '}
            <span className={styles.storyWord}>סיפור</span>.
          </p>

        </div>
      </div>
    </PageLayout>
  );
}
