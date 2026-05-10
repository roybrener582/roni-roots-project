import PageLayout from '../components/PageLayout';
import styles from './CommunitySummaryPage.module.css';

export default function CommunitySummaryPage() {
  return (
    <PageLayout
      accent="forest"
      chapterLabel="פרק 9 – הקהילה שלי"
      title="סיכום"
    >
      <div className={styles.canvas}>
        <span className={styles.glow} aria-hidden="true" />

        <div className={styles.card}>
          <span className={styles.icon} aria-hidden="true">👥</span>

          <p className={styles.para}>
            בשבילי קהילה היא קבוצה של אנשים שמכירים אחד את השני, עוזרים אחד לשני ומרגישים שייכים.
            מהביקורים שעשינו בקהילות שונות למדתי שלכל קהילה יש סיפור משלה, ושגם אחרי קשיים אפשר לבנות
            קהילה חזקה ומחוברת. זה גרם לי להבין שקהילה היא לא רק מקום, אלא גם האנשים והקשר ביניהם.
            אני יכולה להשפיע בקהילה שלי בכך שאעזור באירועים, אתנדב ואהיה שם בשביל אחרים. בנוסף,
            הרעיון שלי ליצור אפליקציה לניהול אירועים במושב יכול לעזור לחזק את הקהילה, כי הוא יעזור
            לאנשים להיות יותר מעורבים ולהשתתף בפעילויות.
          </p>

          <div className={styles.rule} aria-hidden="true" />
        </div>
      </div>
    </PageLayout>
  );
}
