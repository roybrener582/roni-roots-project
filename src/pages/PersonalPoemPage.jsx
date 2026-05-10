import { useRef, useState } from 'react';
import PageLayout from '../components/PageLayout';
import styles from './PersonalPoemPage.module.css';

/* ── Helpers ──────────────────────────────────────────────── */
function fmt(s) {
  if (!s || isNaN(s)) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <polygon points="6,3 20,12 6,21" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <rect x="5"  y="4" width="4" height="16" rx="1" />
    <rect x="15" y="4" width="4" height="16" rx="1" />
  </svg>
);

/* ── Audio player ─────────────────────────────────────────── */
function AudioPlayer() {
  const ref = useRef(null);
  const [playing,  setPlaying]  = useState(false);
  const [current,  setCurrent]  = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else         { a.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  const seek = (e) => {
    const t = Number(e.target.value);
    if (ref.current) ref.current.currentTime = t;
    setCurrent(t);
  };

  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <div className={styles.playerWrap}>
      <span className={styles.playerLabel}>🎧 האזינו לשיר</span>

      <div className={styles.player}>
        <button
          className={styles.playBtn}
          onClick={toggle}
          aria-label={playing ? 'עצור' : 'נגן'}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>

        <div className={styles.trackWrap}>
          <input
            type="range"
            className={styles.seekBar}
            style={{ '--seek': `${pct}%` }}
            min={0}
            max={duration || 100}
            step={0.05}
            value={current}
            onChange={seek}
            aria-label="מיקום בשיר"
          />
          <div className={styles.times} aria-hidden="true">
            <span>{fmt(current)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>
      </div>

      <audio
        ref={ref}
        src="/mycun.mp3"
        preload="metadata"
        onTimeUpdate={() => setCurrent(ref.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(ref.current?.duration ?? 0)}
        onEnded={() => { setPlaying(false); setCurrent(0); }}
      />
    </div>
  );
}

/* ── Poem data ────────────────────────────────────────────── */
const stanzas = [
  [
    'יש לי עם אחד, מיוחד וקרוב,',
    'גם אם לפעמים לא תמיד אותו דבר לחשוב.',
    'יש לנו שפה, חגים וסיפור,',
    'שמחבר בין כולנו גדול וברור.',
  ],
  [
    'יש לי מדינה יפה, מלאה באור,',
    'עם נופים ותקווה שקשה לתאר במילים עוד.',
    'כאן אני גדלה, כאן הלב שלי נמצא,',
    'וזה המקום שבו אני מרגישה הכי שייכה.',
  ],
  [
    'והגיבורים שלנו שומרים על כולם,',
    'לוחמים אמיצים, כמו אבא שלי בעולם.',
    'הם נותנים לנו כוח, ביטחון ותקווה,',
    'ובזכותם אנחנו חיים כאן בשלווה.',
  ],
  [
    'אז אני גאה בעם שלי, במדינה שלי,',
    'בדרך שלנו ובמה שיש לי.',
    'ואני יודעת שתמיד בלב פנימה,',
    'יש לי מקום אחד – זו המדינה שלי לעולם.',
  ],
];

/* ── Page ─────────────────────────────────────────────────── */
export default function PersonalPoemPage() {
  return (
    <PageLayout
      accent="gold"
      variant="compact"
      chapterLabel="פרק 10 – שיר אישי על העם והמדינה"
      title="שיר אישי על העם והמדינה"
    >
      <div className={styles.wrapper}>

        <div className={styles.aura} aria-hidden="true" />

        <span className={styles.iconFlag}  aria-hidden="true">🇮🇱</span>
        <span className={styles.iconHeart} aria-hidden="true">💛</span>
        <span className={styles.iconGlobe} aria-hidden="true">🌍</span>

        <div className={styles.poem}>
          <p className={styles.poemTitle}>השיר שלי לעם ולמדינה</p>
          <div className={styles.poemRule} aria-hidden="true" />

          {stanzas.map((lines, si) => (
            <div key={si} className={styles.stanza}>
              {lines.map((line, li) => (
                <p key={li} className={styles.line}>{line}</p>
              ))}
            </div>
          ))}
        </div>

        <AudioPlayer />

      </div>
    </PageLayout>
  );
}
