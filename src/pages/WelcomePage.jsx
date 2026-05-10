import PageLayout from '../components/PageLayout';
import ImageBlock from '../components/ImageBlock';

export default function WelcomePage() {
  return (
    <PageLayout
      accent="gold"
      titleScale="large"
      title={
        <>
          ברוכים הבאים לעבודת
          <br />
          השורשים של רוני
        </>
      }
      subtitle="זהו מסע משפחתי מרגש שמספר את הסיפור שלנו לאורך הדורות"
    >
      <ImageBlock
        src="/ronifamily.jpeg"
        alt="המשפחה שלנו"
        maxWidth="min(440px, 72%)"
        aspect="4/3"
      />
    </PageLayout>
  );
}
