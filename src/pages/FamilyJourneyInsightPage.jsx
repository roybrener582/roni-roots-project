import PageLayout from '../components/PageLayout';
import styles from './FamilyJourneyInsightPage.module.css';

export default function FamilyJourneyInsightPage() {
  return (
    <PageLayout
      accent="sky"
      chapterLabel="פרק 8 – מסע משפחתי"
      title="תובנה אישית"
    >
      <div className={styles.wrapper}>

        <div className={styles.aura} aria-hidden="true" />

        <span className={styles.iconSprout} aria-hidden="true">🌱</span>

        <div className={styles.textBlock}>
          <p className={styles.reflection}>
            מהמסע של המשפחה שלי לישראל למדתי כמה{' '}
            <span className={styles.keyWord}>אומץ</span>{' '}
            צריך כדי להתחיל במקום חדש.
            הם עזבו מדינות, שפה וחיים שהכירו, והצליחו לבנות כאן חיים חדשים.
            זה גורם לי להעריך יותר את מה שיש לי היום,
            וגם להבין כמה חשוב לא לוותר{' '}
            <span className={styles.keyWord}>ולהמשיך קדימה</span>{' '}
            גם כשקשה.
          </p>
        </div>

      </div>
    </PageLayout>
  );
}
