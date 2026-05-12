import PageLayout from '../components/PageLayout';
import styles from './MyStoryPage.module.css';

const SECTIONS = [
  {
    id: 'past',
    era: 'עבר',
    title: 'מי שהייתי',
    subtitle: 'זיכרונות של ילדות שמחה',
    icon: '🌸',
    paragraphs: [
      <>
        גדלתי ב<mark className={styles.hi}>ילדות</mark> מלאה שמחה ואהבה.
        אהבתי לרקוד ולהתאמן בהתעמלות קרקע, לטייל עם המשפחה בארץ,
        ולבלות עם חברות.
      </>,
      <>
       הרגעים הקטנים אלה ממשיכים ללוות אותי
        עד היום ומהווים חלק גדול ממי שאני.
      </>,
    ],
    vars: {
      '--sc-bg':      'rgba(225, 215, 195, 0.28)',
      '--sc-border':  'rgba(185, 165, 130, 0.30)',
      '--sc-accent':  '#b8a070',
      '--sc-hi':      '#a07840',
      '--sc-weight':  '400',
    },
  },
  {
    id: 'present',
    era: 'הווה',
    title: 'מי שאני היום',
    subtitle: 'אמיצה, רגישה וחברה טובה',
    icon: '✨',
    paragraphs: [
      <>
        אני ילדה חברותית שאוהבת לעשות הרבה דברים.
        אני <mark className={styles.hi}>אמיצה</mark> — לא מפחדת להגיד את מה שאני חושבת
        ולעמוד מאחורי הדברים שחשובים לי.
      </>,
      <>
        אני גם <mark className={styles.hi}>רגישה</mark> — שמה לב לאנשים סביבי ואכפת לי
        מהם. <mark className={styles.hi}>חברות</mark> הן חלק מהותי בחיים שלי,
        ואני תמיד שם בשבילן.
      </>,
    ],
    vars: {
      '--sc-bg':      'rgba(210, 195, 255, 0.32)',
      '--sc-border':  'rgba(155, 120, 220, 0.38)',
      '--sc-accent':  '#8a70c0',
      '--sc-hi':      '#6a4fa8',
      '--sc-weight':  '500',
    },
  },
  {
    id: 'future',
    era: 'עתיד',
    title: 'מי שאהיה',
    subtitle: 'חלומות על עיצוב וסביבה נעימה',
    icon: '🏗️',
    paragraphs: [
      <>
        כשאהיה גדולה, אני חולמת להיות{' '}
        <mark className={styles.hi}>אדריכלית</mark> או{' '}
        <mark className={styles.hi}>מעצבת פנים</mark> —
        מקצוע שמחבר יצירתיות, יופי ועיצוב.
      </>,
      <>
        אני רוצה ליצור סביבה נעימה לאנשים שאני אוהבת, ולגרום להם להרגיש טוב
        בחלל שהם חיים בו. ה<mark className={styles.hi}>עתיד</mark> שלי מלא
        בחלומות ובצבע.
      </>,
    ],
    vars: {
      '--sc-bg':      'rgba(255, 228, 178, 0.30)',
      '--sc-border':  'rgba(215, 165, 70, 0.35)',
      '--sc-accent':  '#c08030',
      '--sc-hi':      '#a06020',
      '--sc-weight':  '400',
    },
  },
];

export default function MyStoryPage() {
  return (
    <PageLayout
      accent="violet"
      chapterLabel="פרק 4 – מגילת החיים שלי"
      title="הסיפור שלי"
      subtitle="עבר, הווה ועתיד"
    >
      <div className={styles.layout}>

        {/* ── Left column: image ── */}
        <div className={styles.imageCol}>
          <figure className={styles.imageFrame}>
            <img
              src="/mh.jpg"
              alt="רוני"
              className={styles.photo}
            />
          </figure>
        </div>

        {/* ── Right column: 3 story sections ── */}
        <div className={styles.contentCol}>
          {SECTIONS.map((s, i) => (
            <article
              key={s.id}
              className={`${styles.section} ${styles[s.id]}`}
              style={{ ...s.vars, animationDelay: `${0.18 + i * 0.13}s` }}
            >
              <header className={styles.sectionHead}>
                <span className={styles.eraTag}>{s.era}</span>
                <div className={styles.sectionTitles}>
                  <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon} aria-hidden="true">{s.icon}</span>
                    {s.title}
                  </h2>
                  <p className={styles.sectionSubtitle}>{s.subtitle}</p>
                </div>
              </header>
              <div className={styles.sectionBody}>
                {s.paragraphs.map((para, pi) => (
                  <p key={pi} className={styles.para}>{para}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

      </div>
    </PageLayout>
  );
}
