import PageLayout from '../components/PageLayout';
import styles from './FamilyMasaPage.module.css';

export default function FamilyMasaPage() {
  return (
    <PageLayout
      accent="sky"
      chapterLabel="פרק 8 – מסלול הנדודים של משפחתי"
      title="ציור מפת הנדודים"
    >
      <div className={styles.wrapper}>
        <figure className={styles.mapFigure}>
          <img
            src="/masa.png"
            alt="מפת מסע המשפחה"
            className={styles.mapImage}
          />
          <figcaption className={styles.caption}>
            מפת המסע של המשפחה שלי בין מדינות
          </figcaption>
        </figure>
      </div>
    </PageLayout>
  );
}
