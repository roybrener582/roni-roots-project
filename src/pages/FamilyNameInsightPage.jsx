import PageLayout from '../components/PageLayout';
import styles from './FamilyNameInsightPage.module.css';

export default function FamilyNameInsightPage() {
  return (
    <PageLayout
      accent="mint"
      chapterLabel="פרק 5 – שם המשפחה שלי"
      title="מהו שם המשפחה בשבילי?"
    >
      <div className={styles.wrapper}>

        {/* Soft mint aura */}
        <div className={styles.aura} aria-hidden="true" />

        {/* Floating icons */}
        <span className={styles.iconSpark}   aria-hidden="true">✨</span>
        <span className={styles.iconThought} aria-hidden="true">💭</span>

        {/* Main reflection */}
        <div className={styles.textBlock}>

          <p className={styles.para}>
            שם המשפחה שלי מסמל בעיניי{' '}
            <span className={styles.keyWord}>אנרגיה</span>.
          </p>

          <div className={styles.rule} aria-hidden="true" />

          <p className={styles.para}>
            אני מרגישה{' '}
            <span className={styles.keyWord}>חיבור</span>{' '}
            לשם המשפחה שלי,
            <br />
            כי הוא חמוד, קצר ונעים.
          </p>

          <div className={styles.rule} aria-hidden="true" />

          <p className={styles.para}>
            בעיניי, שם המשפחה שלי הוא פשוט שם,
            <br />
            ולא סיפור מיוחד –
            <br />
            אבל הוא עדיין{' '}
            <span className={styles.keyWord}>חלק ממני</span>.
          </p>

        </div>
      </div>
    </PageLayout>
  );
}
