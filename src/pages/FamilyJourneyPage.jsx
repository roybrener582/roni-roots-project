import PageLayout from '../components/PageLayout';
import styles from './FamilyJourneyPage.module.css';

export default function FamilyJourneyPage() {
  return (
    <PageLayout
      accent="sky"
      chapterLabel="פרק 8 – מסלול הנדודים של משפחתי"
      title="מסלול הנדודים של משפחתי"
    >
      <div className={styles.wrapper}>

        <div className={styles.aura} aria-hidden="true" />

        <span className={styles.iconGlobe} aria-hidden="true">🌍</span>
        <span className={styles.iconCompass} aria-hidden="true">🧭</span>

        <div className={styles.story}>

          <p className={styles.para}>
            שורשי המשפחה שלי מתחילים רחוק מישראל —
            ב<span className={styles.place}>פולין</span> וב<span className={styles.place}>רומניה</span> שבאירופה.
            בתחילת המאה העשרים, כשהאנטישמיות גברה והמלחמות שברו את שגרת החיים,
            בני המשפחה נאלצו לחפש מקום בטוח יותר.
            הם עזבו את פולין ועברו לרומניה, ובכך נפרדו מבית, משפה, ומכל מה שהכירו.
            גם ברומניה לא מצאו שקט לאורך זמן,
            ובשנות החמישים — אחרי קום המדינה —
            עלו ל<span className={styles.place}>ישראל</span> והתחילו הכל מחדש.
            מספרים שהגעיה לארץ הייתה מלאה התרגשות,
            אבל גם קושי אמיתי: שפה חדשה, תנאים לא פשוטים, וחיים שצריך לבנות מאפס.
          </p>

          <div className={styles.divider} aria-hidden="true">
            <span />
            <span className={styles.dividerDot}>✦</span>
            <span />
          </div>

          <p className={styles.para}>
            מהצד השני של המשפחה, הסיפור מתחיל במקום אחר לגמרי —
            ב<span className={styles.place}>ארגנטינה</span> שבדרום אמריקה.
            סבתא סילביה נולדה שם, והמשפחה חיה חיים נוחים יחסית.
            אבל למרות הנוחות, הם בחרו לעזוב — מתוך רצון עמוק להגיע לישראל ולבנות כאן עתיד.
            גם עבורם ההגעיה לארץ הייתה מלאה ברגשות מעורבים:
            שמחה וציפייה מחד, ופרידה קשה ממשפחה, מחברים ומהחיים שהכירו — מאידך.
            הם הסתגלו לשפה חדשה ולמציאות שונה לגמרי.
          </p>

          <div className={styles.divider} aria-hidden="true">
            <span />
            <span className={styles.dividerDot}>✦</span>
            <span />
          </div>

          <p className={styles.para}>
            בסופו של דבר, שני הצדדים — זה שצעד מ<span className={styles.place}>אירופה</span> וזה שבא מ<span className={styles.place}>דרום אמריקה</span> —
            נפגשו ב<span className={styles.place}>ישראל</span> ויצרו יחד את המשפחה שלנו.
            כל אחד מהם הביא איתו סיפור של קושי, אומץ, והתחלה חדשה.
          </p>

          <div className={styles.insight}>
            <span className={styles.insightMark} aria-hidden="true">✦</span>
            <p className={styles.insightText}>
              ממסע הנדודים הזה למדתי שאומץ הוא לא רק להיות חזק —
              אלא גם להחזיק בתקווה, גם כשצריך לעזוב הכל מאחור.
            </p>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
