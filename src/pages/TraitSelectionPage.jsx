import PageLayout from '../components/PageLayout';
import styles from './TraitSelectionPage.module.css';

const TRAITS = [
  {
    icon: '👭',
    name: 'חברותית',
    desc: 'אני עוזרת מאוד לחברות שלי, ומה שהן צריכות אני תמיד שם בשבילן.',
    bg:     'rgba(245, 178, 173, 0.14)',
    border: 'rgba(210, 118, 108, 0.22)',
    accent: '#c87878',
  },
  {
    icon: '🌸',
    name: 'רגישה',
    desc: 'אני רגישה להרבה דברים, ולפעמים אני גם בוכה בקלות שמשהו מרגש אותי.',
    bg:     'rgba(192, 170, 228, 0.14)',
    border: 'rgba(148, 118, 202, 0.22)',
    accent: '#9878c0',
  },
  {
    icon: '🌙',
    name: 'פחדנית',
    desc: 'לפעמים אני מפחדת מהרבה דברים, וזה גורם לי לוותר ולא תמיד לנסות לעשות אותם.',
    bg:     'rgba(168, 195, 228, 0.14)',
    border: 'rgba(105, 148, 198, 0.22)',
    accent: '#7098c0',
  },
  {
    icon: '🎁',
    name: 'נדיבה',
    desc: 'אני נדיבה ותמיד משתדלת לעזור ולתת שמישהו מבקש ממני.',
    bg:     'rgba(242, 196, 148, 0.14)',
    border: 'rgba(200, 142, 74, 0.22)',
    accent: '#c08040',
  },
  {
    icon: '🤍',
    name: 'מתחשבת בזולת',
    desc: 'אני משתדלת לא לחשוב רק על עצמי, אלא לדאוג שגם לאחרים יהיה טוב.',
    bg:     'rgba(165, 210, 180, 0.14)',
    border: 'rgba(100, 165, 128, 0.22)',
    accent: '#60a078',
  },
];

export default function TraitSelectionPage() {
  return (
    <PageLayout
      accent="rose"
      chapterLabel="פרק 3 — בחירת תכונות"
      title="תכונות שמאפיינות אותי"
    >
      <div className={styles.list}>
        {TRAITS.map((t, i) => (
          <div
            key={t.name}
            className={styles.block}
            style={{
              '--blk-bg':     t.bg,
              '--blk-border': t.border,
              '--blk-accent': t.accent,
              animationDelay: `${0.12 + i * 0.12}s`,
            }}
          >
            <div className={styles.header}>
              <span className={styles.icon} aria-hidden="true">{t.icon}</span>
              <h2 className={styles.name}>{t.name}</h2>
            </div>

            <div className={styles.divider} aria-hidden="true" />

            <p className={styles.label}>איך זה בא לידי ביטוי</p>
            <p className={styles.desc}>{t.desc}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
