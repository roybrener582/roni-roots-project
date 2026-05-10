import PageLayout from '../components/PageLayout';
import styles from './ImprovementPage.module.css';

const TRAITS = [
  {
    id: 'fear',
    icon: '🌙',
    name: 'פחדנות',
    variant: 'amber',
    text: (
      <>
        בחרתי לשפר את הפחדנות כי היא לפעמים מונעת ממני{' '}
        <mark className={styles.highlight}>לנסות</mark> דברים
        {' '}ולא תמיד עוזרת לי{' '}
        <mark className={styles.highlight}>להאמין בעצמי</mark>.
      </>
    ),
    growthIcon: '✨',
    growthText: 'אני מתרגלת להעז — צעד אחד קדימה בכל פעם',
  },
  {
    id: 'sensitivity',
    icon: '🌸',
    name: 'רגישות',
    variant: 'rose',
    text: (
      <>
        בחרתי לשפר את הרגישות כי אני נפגעת בקלות
        וזה מקשה עליי במצבים שונים.
      </>
    ),
    growthIcon: '🌱',
    growthText: 'הרגישות שלי היא כוח — אני לומדת להגן עליה',
  },
  {
    id: 'stubbornness',
    icon: '🔄',
    name: 'עקשנות',
    variant: 'lavender',
    text: (
      <>
        בחרתי לשפר את העקשנות כי לפעמים קשה לי{' '}
        <mark className={styles.highlight}>להקשיב</mark> לדעות
        {' '}אחרות ולמצוא דרך{' '}
        <mark className={styles.highlight}>להתפשר</mark>.
      </>
    ),
    growthIcon: '💭',
    growthText: 'לשמוע דעות אחרות — זה להתרחב',
  },
];

export default function ImprovementPage() {
  return (
    <PageLayout
      accent="forest"
      chapterLabel="פרק 3 — שלוש תכונות שהייתי רוצה לשפר"
      title="מה הייתי רוצה לשפר בעצמי"
    >
      <div className={styles.stack}>
        {TRAITS.map((trait, i) => (
          <div
            key={trait.id}
            className={`${styles.card} ${styles[trait.variant]}`}
            style={{ animationDelay: `${0.18 + i * 0.16}s` }}
          >
            {/* ── Number badge ── */}
            <span className={styles.number} aria-hidden="true">{i + 1}</span>

            {/* ── Header row ── */}
            <div className={styles.header}>
              <span className={styles.icon} aria-hidden="true">{trait.icon}</span>
              <h2 className={styles.traitName}>{trait.name}</h2>
            </div>

            {/* ── Underline rule ── */}
            <div className={styles.rule} aria-hidden="true" />

            {/* ── Description ── */}
            <p className={styles.desc}>{trait.text}</p>

            {/* ── Growth hint ── */}
            <div className={styles.growthHint}>
              <span className={styles.arrow} aria-hidden="true">→</span>
              <span className={styles.growthIcon} aria-hidden="true">{trait.growthIcon}</span>
              <span className={styles.growthText}>{trait.growthText}</span>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
