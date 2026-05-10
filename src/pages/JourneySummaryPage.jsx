import PageLayout from '../components/PageLayout';
import styles from './JourneySummaryPage.module.css';

const paragraphs = [
  'עבודת השורשים הייתה בשבילי הרבה יותר מעבודה לבית ספר. זה היה מסע שבו למדתי להכיר את המשפחה שלי ואת הסיפור שממנו אני באה. במהלך העבודה גיליתי שאני סקרנית ואוהבת לשמוע סיפורים, במיוחד על הדברים הקטנים שהופכים את העבר למשהו חי.',
  'למדתי כמה המשפחה שלי עברה, כמה אומץ היה להם וכמה הם היו חזקים כדי לבנות חיים כאן בארץ. אני גאה שהצלחתי לחבר בין הסיפורים שלהם לבין הסיפור של העם והמדינה שלנו, והבנתי שאני חלק ממשהו גדול יותר.',
  'מהמסע הזה אני לוקחת איתי תחושת שייכות וגאווה, וגם הבנה שהעבר שלי נותן לי כוח להמשיך קדימה ולבנות את הסיפור שלי.',
];

export default function JourneySummaryPage() {
  return (
    <PageLayout
      accent="gold"
      variant="compact"
      chapterLabel="סיכום המסע"
      title="סיכום המסע"
    >
      <div className={styles.canvas}>
        <span className={styles.glow} aria-hidden="true" />

        <div className={styles.card}>
          <span className={styles.icon} aria-hidden="true">✨</span>

          <div className={styles.textBody}>
            {paragraphs.map((p, i) => (
              <p key={i} className={styles.para}>{p}</p>
            ))}
          </div>

          <div className={styles.rule} aria-hidden="true" />

          <span className={styles.closing} aria-hidden="true">~ סוף ~</span>
        </div>
      </div>
    </PageLayout>
  );
}
