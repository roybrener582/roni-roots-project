import PageLayout from '../components/PageLayout';
import styles from './NameResearchPage.module.css';

const FAMOUS = [
  { name: 'רוני דלומי',  role: 'זמרת ושחקנית'    },
  { name: 'רוני קובן',   role: 'עיתונאי ומנחה'    },
  { name: 'רוני סומק',   role: 'משורר'             },
  { name: 'רוני דואני',  role: 'זמרת ושחקנית'    },
  { name: 'רוני אלשיך',  role: 'מפכ"ל לשעבר'     },
];

const FACTS = [
  'שם יוניסקס — מתאים לבנים ולבנות',
  'בין-לאומי — נשמע טוב גם באנגלית (Roni)',
  'גימטריה — 266',
];

const BIBLE = [
  { verse: 'רָנִּי וְשִׂמְחִי בַּת צִיּוֹן...', source: 'זכריה ב׳' },
  { verse: 'רָנִּי בַּת-צִיּוֹן, הָרִיעוּ יִשְׂרָאֵל', source: 'צפניה ג׳' },
];

export default function NameResearchPage() {
  return (
    <PageLayout
      accent="gold"
      variant="compact"
      chapterLabel="פרק 2"
      title="מחקר מעמיק על שמי"
      subtitle="מה גיליתי על השם רוני"
    >
      <div className={styles.grid}>

        {/* ══ RIGHT column: rich/primary content ══════════════
            In RTL this is the first physical column — reading side */}
        <div className={styles.col}>

          {/* ── Section 1: Meaning ── */}
          <section className={styles.section}>
            <h2 className={styles.secTitle}>
              <span aria-hidden="true">✨</span> משמעות השם
            </h2>

            <p className={styles.meaningBody}>
              המילה <strong className={styles.em}>״רון״</strong> בעברית פירושה
              שמחה, רינה או שיר.
            </p>

            <div className={styles.meaningCallout}>
              <span className={styles.calloutLabel}>משמעות אישית</span>
              <span className={styles.calloutValue}>״השמחה שלי״</span>
            </div>

            <p className={styles.meaningBody}>
              <strong className={styles.em}>״רוֹנִי״</strong> היא גם צורת ציווי —
              פנייה לנקבה:
            </p>
            <div className={styles.imperatives}>
              <span>תשמחי</span>
              <span className={styles.dot} aria-hidden="true">·</span>
              <span>תשירי</span>
              <span className={styles.dot} aria-hidden="true">·</span>
              <span>תריעי</span>
            </div>
          </section>

          {/* ── Section 2: Bible ── */}
          <section className={styles.section}>
            <h2 className={styles.secTitle}>
              <span aria-hidden="true">📖</span> בתנ״ך
            </h2>

            <p className={styles.bibleIntro}>
              המילה ״רוני״ מופיעה בתנ״ך כ<strong className={styles.em}>קריאה לשמחה</strong>,
              ולא כשם של אדם.
            </p>

            <div className={styles.bibleQuotes}>
              {BIBLE.map(({ verse, source }) => (
                <blockquote key={source} className={styles.quote}>
                  <p className={styles.quoteVerse}>״{verse}״</p>
                  <cite className={styles.quoteSource}>{source}</cite>
                </blockquote>
              ))}
            </div>
          </section>

        </div>

        {/* ══ LEFT column: list content ════════════════════════
            In RTL this is the second physical column */}
        <div className={styles.col}>

          {/* ── Section 3: Famous people ── */}
          <section className={styles.section}>
            <h2 className={styles.secTitle}>
              <span aria-hidden="true">👥</span> אנשים מפורסמים בשם רוני
            </h2>
            <ul className={styles.famousList}>
              {FAMOUS.map(({ name, role }) => (
                <li key={name} className={styles.famousItem}>
                  <span className={styles.famousName}>{name}</span>
                  <span className={styles.famousRole}>{role}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Section 4: Facts ── */}
          <section className={styles.section}>
            <h2 className={styles.secTitle}>
              <span aria-hidden="true">💡</span> עובדות מעניינות
            </h2>
            <ul className={styles.factList}>
              {FACTS.map((fact) => (
                <li key={fact} className={styles.factItem}>{fact}</li>
              ))}
            </ul>
          </section>

          {/* ── Section 5: Personal insight ── */}
          <section className={styles.insightSection}>
            <p className={styles.insightText}>
              הופתעתי לגלות שהשם ״רוני״ מופיע בתנ״ך
              כ<span className={styles.em}>קריאה לשמחה</span>.
            </p>
          </section>

        </div>

      </div>
    </PageLayout>
  );
}
