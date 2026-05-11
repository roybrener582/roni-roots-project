import styles from './BookPage.module.css';

export default function BookPage({ children, pageNumber }) {
  return (
    <div className={styles.wrapper}>
      <article className={styles.page}>
        {children}
      </article>
      {pageNumber && <span className={styles.pageNumber}>{pageNumber}</span>}
    </div>
  );
}
