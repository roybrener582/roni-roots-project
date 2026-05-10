import PageLayout from '../components/PageLayout';
import TraitCard from '../components/TraitCard';
import styles from './TraitsPage.module.css';

const TRAITS = [
  {
    icon: '✨',
    trait: 'אמיצה',
    text: 'גם כשיש התחלות חדשות אני מנסה למרות כל החששות.',
    illustration: '🦋',
    decos: ['🌱', '⭐'],
    variant: 'amber',
    reversed: false,
  },
  {
    icon: '❤️',
    trait: 'חברה טובה',
    text: 'אם מישהי צריכה עזרה אני תמיד פה בשבילה.',
    illustration: '🌻',
    decos: ['💛', '🌿'],
    variant: 'rose',
    reversed: false,
  },
  {
    icon: '🌸',
    trait: 'רגישות',
    text: 'כאשר ישנם מצבים מלחיצים או משמחים הם משפיעים עליי.',
    illustration: '🌊',
    decos: ['🌧️', '☀️'],
    variant: 'lavender',
    reversed: false,
  },
];

export default function TraitsPage() {
  return (
    <PageLayout
      accent="rose"
      chapterLabel="פרק 1 — מי אני"
      title="שלוש מילים שמאפיינות אותי"
    >
      <div className={styles.cards}>
        {TRAITS.map((t, i) => (
          <TraitCard key={t.trait} {...t} index={i} />
        ))}
      </div>
    </PageLayout>
  );
}
