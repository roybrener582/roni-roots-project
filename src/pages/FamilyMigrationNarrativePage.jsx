import PageLayout from '../components/PageLayout';
import styles from './FamilyMigrationNarrativePage.module.css';

export default function FamilyMigrationNarrativePage() {
  return (
    <PageLayout
      accent="sky"
      chapterLabel="פרק 8 – מסע משפחתי"
      title="מסע משפחתי"
    >
      <div className={styles.wrapper}>
        <figure className={styles.videoFigure}>
          <div className={styles.videoFrame}>
            <video
              src="/FamilyMigrationNarrative.mp4"
              controls
              playsInline
              className={styles.video}
            />
          </div>
          <figcaption className={styles.caption}>
            סיפור המסע של המשפחה שלי בין מדינות ודורות
          </figcaption>
        </figure>
      </div>
    </PageLayout>
  );
}
