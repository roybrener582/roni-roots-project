import PageLayout from '../components/PageLayout';
import styles from './MemorialDayInsightPage.module.css';

export default function MemorialDayInsightPage() {
  return (
    <PageLayout
      accent="sky"
      chapterLabel="פרק 10"
      title="טקסים ומשמעותם"
      subtitle="יום הזיכרון לחללי מערכות ישראל ונפגעי פעולות איבה"
    >
      <div className={styles.wrapper}>

        <div className={styles.aura} aria-hidden="true" />

        <span className={styles.iconCandle} aria-hidden="true">🕯️</span>
        <span className={styles.iconDove}   aria-hidden="true">🕊️</span>

        <div className={styles.flow}>

          <p className={styles.para}>
            בעיניי, יום הזיכרון הוא יום מאוד חשוב ומרגש. הוא מזכיר לנו את האנשים
            שנהרגו כדי שנוכל לחיות כאן בביטחון, וגם את מי שנפגעו בפיגועים.
            במשפחה שלי זה יום מאוד אישי, כי דוד שלי{' '}
            <span className={styles.accent}>ניר</span>
            {' '}נרצח בפיגוע במקסים בשנת 2003,
            ואני{' '}
            <span className={styles.accent}>נקראת על שמו.</span>
            {' '}בזמן הצפירה אני חושבת עליו ועל כל מי שאיבדו את חייהם.
          </p>

          <div className={styles.rule} aria-hidden="true" />

          <p className={`${styles.para} ${styles.paraSecond}`}>
            המסר של היום הזה הוא{' '}
            <span className={styles.accent}>לזכור ולא לשכוח,</span>
            {' '}ולהעריך את מה שיש לנו. הוא מחזק אצלי את תחושת השייכות לעם ולמדינה,
            כי כולם עומדים יחד בשקט ומכבדים את הזיכרון. זה גורם לי להרגיש
            שאנחנו{' '}
            <span className={styles.accent}>עם אחד,</span>
            {' '}ושיש בינינו קשר חזק גם ברגעים קשים.
          </p>

        </div>
      </div>
    </PageLayout>
  );
}
