import { useState } from 'react';
import PageLayout from '../components/PageLayout';
import styles from './MyNamePage.module.css';

/* ── Data ─────────────────────────────────────────────── */

const IDIOMS = [
  { phrase: 'יצא לו שם',    def: 'נודע והתפרסם' },
  { phrase: 'שם דבר',        def: 'מוניטין ומעמד' },
  { phrase: 'שם נפשו בכפו', def: 'פעל באומץ' },
];

const SOURCES = [
  { key: 'divine',  icon: '✨', label: 'כוחות עליונים', items: ['אלוהים', 'מזל', 'מוות'] },
  { key: 'family',  icon: '🫶', label: 'משפחה',          items: ['אביו ואמו'] },
  { key: 'env',     icon: '🌿', label: 'סביבה',           items: ['הרים', 'הים', 'עונות'] },
  { key: 'society', icon: '🌸', label: 'חברה',            items: ['שכנים', 'שונאים'] },
  { key: 'self',    icon: '💫', label: 'האדם עצמו',       items: ['מעשיו', 'רגשותיו', 'בחירותיו'] },
];

const KEYWORDS = [
  { word: 'אופן חיוכו', def: 'הדרך הייחודית שבה האדם מביע שמחה' },
  { word: 'חטאיו',      def: 'המעידות והבחירות השגויות' },
  { word: 'כמיהתו',    def: 'הרצונות והחלומות הפנימיים' },
  { word: 'מלאכתו',    def: 'העשייה והיצירה' },
  { word: 'אהבתו',      def: 'היכולת לאהוב' },
];

const NOT_MINE = ['מי ההורים שלנו', 'איפה נולדנו', 'המראה שלנו', 'המזל שלנו'];
const IS_MINE   = ['מלאכה ויצירה', 'אהבה ונתינה', 'חלומות ומטרות', 'התמודדות'];

/* ── Component ────────────────────────────────────────── */

export default function MyNamePage() {
  const [imgErr, setImgErr] = useState(false);

  return (
    <PageLayout variant="compact" accent="violet" chapterLabel="פרק 2" title="השם שלי">
      <div className={styles.wrapper}>
        <div className={styles.pageRow}>

          {/* ══ RIGHT: all content — first in DOM = physical right in RTL ══ */}
          <div className={styles.rightCol}>

            {/* ── Group 1: intro + idioms ── */}
            <div className={styles.introGroup}>
              <p className={styles.introText}>
                בשיר{' '}
                <em className={styles.poemTitle}>״לכל איש יש שם״</em>{' '}
                מאת <strong>זלדה</strong> — השם אינו ככינוי זיהוי.
                הוא מטאפורה לזהות האדם, למהותו ולסיפור חייו.
              </p>
              <div className={styles.idiomList}>
                {IDIOMS.map((id) => (
                  <div key={id.phrase} className={styles.idiomEntry}>
                    <span className={styles.idiomPhrase}>{id.phrase}</span>
                    <span className={styles.idiomSep} aria-hidden="true">—</span>
                    <span className={styles.idiomDef}>{id.def}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Group 2: sources | keywords (2 sub-cols) ── */}
            <div className={styles.infoGrid}>

              <div className={styles.infoCol}>
                <h4 className={styles.sectionHeading}>מה מרכיב את שמו של אדם?</h4>
                <div className={styles.sourceList}>
                  {SOURCES.map((s) => (
                    <div key={s.key} className={styles.sourceEntry}>
                      <span className={styles.srcIcon} aria-hidden="true">{s.icon}</span>
                      <span className={styles.srcLabel}>{s.label}</span>
                      <span className={styles.srcItems}>{s.items.join(' · ')}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.infoCol}>
                <h4 className={styles.sectionHeading}>מילות מפתח בשיר</h4>
                <div className={styles.kwList}>
                  {KEYWORDS.map((k) => (
                    <div key={k.word} className={styles.kwEntry}>
                      <span className={styles.kwTerm}>{k.word}</span>
                      <span className={styles.kwDef}>{k.def}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ── Group 3: control comparison ── */}
            <div className={styles.controlGroup}>
              <h4 className={styles.sectionHeading}>מה בידינו לבחור?</h4>
              <div className={styles.controlCols}>

                <div className={styles.controlSide}>
                  <p className={styles.controlSideTitle} data-tone="muted">לא בשליטתנו</p>
                  <ul className={styles.controlList}>
                    {NOT_MINE.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>

                <div className={styles.controlSide}>
                  <p className={styles.controlSideTitle} data-tone="accent">בשליטתנו</p>
                  <ul className={`${styles.controlList} ${styles.controlListAccent}`}>
                    {IS_MINE.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>

              </div>
            </div>

          </div>

          {/* ══ LEFT: large image — second in DOM = physical left in RTL ══ */}
          <div className={styles.leftCol}>
            <div className={styles.imageWrap}>
              {imgErr
                ? <div className={styles.imgFallback}>📖</div>
                : <img
                    className={styles.img}
                    src="/myname.png"
                    alt="לכל איש יש שם"
                    onError={() => setImgErr(true)}
                  />
              }
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
