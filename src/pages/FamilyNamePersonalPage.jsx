import PageLayout from '../components/PageLayout';
import styles from './FamilyNamePersonalPage.module.css';

export default function FamilyNamePersonalPage() {
  return (
    <PageLayout
      accent="mint"
      chapterLabel="פרק 5 – שם המשפחה שלי"
      title="שם המשפחה ואני"
    >
      <div className={styles.wrapper}>

        {/* Soft aura */}
        <div className={styles.aura} aria-hidden="true" />

        {/* Ambient floating icons */}
        <span className={styles.iconThought} aria-hidden="true">💭</span>
        <span className={styles.iconBalance} aria-hidden="true">⚖️</span>
        <span className={styles.iconHeart}   aria-hidden="true">🤍</span>

        <div className={styles.flow}>

          {/* Block 1 — comfortable opening */}
          <p className={styles.para}>
            אני מרגישה{' '}
            <span className={styles.keyWord}>סבבה</span>{' '}
            עם שם המשפחה שלי.
          </p>

          <div className={styles.rule} aria-hidden="true" />

          {/* Block 2 — the honest balance */}
          <p className={styles.para}>
            מצד אחד, הוא לא מפריע לי —
            <br />
            אבל מצד שני,
            <br />
            אני{' '}
            <span className={styles.softWord}>לא בטוחה</span>{' '}
            שהייתי רוצה לשמור עליו בעתיד,
            <br />
            כי המשמעות שלו פחות מדברת אליי.
          </p>

          <div className={styles.rule} aria-hidden="true" />

          {/* Block 3 — honest, not harsh */}
          <p className={styles.para}>
            אני גם{' '}
            <span className={styles.softWord}>לא מרגישה</span>{' '}
            שיש משהו מיוחד
            <br />
            שאני גאה בו בשם המשפחה שלי.
          </p>

          <div className={styles.rule} aria-hidden="true" />

          {/* Block 4 — hopeful closing */}
          <p className={`${styles.para} ${styles.paraHope}`}>
            אם היה סיפור מיוחד מאחורי השם —
            <br />
            <span className={styles.keyWord}>הייתי רוצה</span>{' '}
            להעביר אותו לדורות הבאים.
          </p>

        </div>
      </div>
    </PageLayout>
  );
}
