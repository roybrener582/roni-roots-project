import PageLayout from '../components/PageLayout';
import styles from './SensitivityInsightPage.module.css';

export default function SensitivityInsightPage() {
  return (
    <PageLayout accent="violet" chapterLabel="פרק 3" title="תובנה אישית">
      <div className={styles.wrapper}>

        {/* Soft organic aura — the "safe space" behind the text */}
        <div className={styles.aura} aria-hidden="true" />

        {/* Floating decorative icons */}
        <span className={styles.iconBlossom} aria-hidden="true">🌸</span>
        <span className={styles.iconThought}  aria-hidden="true">💭</span>
        <span className={styles.iconMoon}     aria-hidden="true">🌙</span>

        {/* One main text block — a quiet personal reflection */}
        <div className={styles.textBlock}>
          <p className={styles.reflection}>
            <span className={styles.keyWord}>רגישות</span>
            {' '}היא חלק מרכזי ממי שאני.
            <br /><br />
            אני חווה{' '}
            <span className={styles.softEmphasis}>רגשות</span>
            {' '}בעוצמה רבה, ולפעמים אני נמנעת
            {' '}ממצבים שמפחידים או מלחיצים אותי,
            {' '}ומעדיפה להישאר ב
            <span className={styles.softEmphasis}>סביבה המוכרת והבטוחה</span>
            {' '}שלי.
          </p>
        </div>

      </div>
    </PageLayout>
  );
}
