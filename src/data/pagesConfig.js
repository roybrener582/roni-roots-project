import WelcomePage from '../pages/WelcomePage';
import TraitsPage from '../pages/TraitsPage';
import BelongingPage from '../pages/BelongingPage';
import AboutMePage from '../pages/AboutMePage';
import PersonalInsightPage from '../pages/PersonalInsightPage';
import MyNamePage from '../pages/MyNamePage';
import NameFactsPage from '../pages/NameFactsPage';
import NameMeaningPage from '../pages/NameMeaningPage';
import NameResearchPage from '../pages/NameResearchPage';
import NameSummaryPage from '../pages/NameSummaryPage';
import LogoPage from '../pages/LogoPage';
import TraitDefinitionPage from '../pages/TraitDefinitionPage';
import ImprovementPage from '../pages/ImprovementPage';
import TraitSelectionPage from '../pages/TraitSelectionPage';
import OthersViewPage from '../pages/OthersViewPage';
import BusinessCardPage from '../pages/BusinessCardPage';
import SensitivityInsightPage from '../pages/SensitivityInsightPage';
import InfancyPage from '../pages/InfancyPage';
import EarlyChildhoodPage from '../pages/EarlyChildhoodPage';
import ChildhoodPage from '../pages/ChildhoodPage';
import GrowthIdentityPage from '../pages/GrowthIdentityPage';
import FutureAspirationsPage from '../pages/FutureAspirationsPage';
import MyStoryPage from '../pages/MyStoryPage';
import LifeStoryInsightPage from '../pages/LifeStoryInsightPage';
import FamilyNameInsightPage from '../pages/FamilyNameInsightPage';
import FamilyNameFactsPage from '../pages/FamilyNameFactsPage';
import FamilyNameResearchPage from '../pages/FamilyNameResearchPage';
import FamilyNamePersonalInsightPage from '../pages/FamilyNamePersonalInsightPage';
import FamilyNameStoryPage from '../pages/FamilyNameStoryPage';
import FamilyNamePersonalPage from '../pages/FamilyNamePersonalPage';
import FamilyMapPage from '../pages/FamilyMapPage';
import WhoIsMyFamilyPage from '../pages/WhoIsMyFamilyPage';
import FamilyGeminiPage from '../pages/FamilyGeminiPage';
import ThiyaRevivalPage from '../pages/ThiyaRevivalPage';
import FamilyComicPage from '../pages/FamilyComicPage';
import FamilyPastInsightPage from '../pages/FamilyPastInsightPage';
import FamilyRolePage from '../pages/FamilyRolePage';
import FamilyTreeInsightPage from '../pages/FamilyTreeInsightPage';
import FamilyGenerationsPage from '../pages/FamilyGenerationsPage';
import FamilyTreePage from '../pages/FamilyTreePage';
import FamilyObjectPage from '../pages/FamilyObjectPage';
import FamilyJourneyPage from '../pages/FamilyJourneyPage';
import FamilyMasaPage from '../pages/FamilyMasaPage';
import FamilyMigrationNarrativePage from '../pages/FamilyMigrationNarrativePage';
import FamilyJourneyInsightPage from '../pages/FamilyJourneyInsightPage';
import CommunityInsightPage from '../pages/CommunityInsightPage';
import CommunityPage from '../pages/CommunityPage';
import CommunityVisitPage from '../pages/CommunityVisitPage';
import CommunityContributionPage from '../pages/CommunityContributionPage';
import CommunityVentureIdeaPage from '../pages/CommunityVentureIdeaPage';
import CommunitySummaryPage from '../pages/CommunitySummaryPage';
import CommunityPersonalInsightPage from '../pages/CommunityPersonalInsightPage';
import PeopleIdentityInsightPage from '../pages/PeopleIdentityInsightPage';
import CitizenshipInsightPage from '../pages/CitizenshipInsightPage';
import NationalSymbolsPage from '../pages/NationalSymbolsPage';
import MemorialDayInsightPage from '../pages/MemorialDayInsightPage';
import BatMitzvahPage from '../pages/BatMitzvahPage';
import PersonalPoemPage from '../pages/PersonalPoemPage';
import JourneySummaryPage from '../pages/JourneySummaryPage';
import PhotoGalleryPage from '../pages/PhotoGalleryPage';

// ─────────────────────────────────────────────────────────────
// Central page registry.
// To add a new page:
//   1. Create src/pages/MyPage.jsx  (+ MyPage.module.css)
//   2. Import it here
//   3. Add an entry to the array below
// ─────────────────────────────────────────────────────────────
export const pages = [
  {
    id: 'welcome',
    component: WelcomePage,
    title: 'ברוכים הבאים',
    hebrewNumber: 1,
  },
  {
    id: 'traits',
    component: TraitsPage,
    title: 'שלוש מילים שמאפיינות אותי',
    hebrewNumber: 2,
  },
  {
    id: 'belonging',
    component: BelongingPage,
    title: 'מעגלי השייכות שלי',
    hebrewNumber: 3,
  },
  {
    id: 'about-me',
    component: AboutMePage,
    title: 'קצת על עצמי',
    hebrewNumber: 4,
  },
  {
    id: 'personal-insight',
    component: PersonalInsightPage,
    title: 'תובנה אישית',
    hebrewNumber: 5,
  },
  {
    id: 'my-name',
    component: MyNamePage,
    title: 'השם שלי',
    hebrewNumber: 6,
  },
  {
    id: 'name-facts',
    component: NameFactsPage,
    title: 'עובדות על השם שלי',
    hebrewNumber: 7,
  },
  {
    id: 'name-meaning',
    component: NameMeaningPage,
    title: 'משמעות שמי כפי שאני מבינה אותה',
    hebrewNumber: 8,
  },
  {
    id: 'name-research',
    component: NameResearchPage,
    title: 'מחקר מעמיק על שמי',
    hebrewNumber: 9,
  },
  {
    id: 'name-summary',
    component: NameSummaryPage,
    title: 'פסקת סיכום',
    hebrewNumber: 10,
  },
  {
    id: 'logo',
    component: LogoPage,
    title: 'הלוגו שלי',
    hebrewNumber: 11,
  },
  {
    id: 'trait-definition',
    component: TraitDefinitionPage,
    title: 'מהי תכונה בעיניי?',
    hebrewNumber: 12,
  },
  {
    id: 'trait-selection',
    component: TraitSelectionPage,
    title: 'תכונות שמאפיינות אותי',
    hebrewNumber: 13,
  },
  {
    id: 'improvement',
    component: ImprovementPage,
    title: 'מה הייתי רוצה לשפר בעצמי',
    hebrewNumber: 14,
  },
  {
    id: 'others-view',
    component: OthersViewPage,
    title: 'איך אחרים רואים אותי',
    hebrewNumber: 15,
  },
  {
    id: 'business-card',
    component: BusinessCardPage,
    title: 'כרטיס הביקור שלי',
    hebrewNumber: 16,
  },
  {
    id: 'sensitivity-insight',
    component: SensitivityInsightPage,
    title: 'תובנה אישית',
    hebrewNumber: 17,
  },
  {
    id: 'infancy',
    component: InfancyPage,
    title: 'תחילת הדרך – הינקות',
    hebrewNumber: 18,
  },
  {
    id: 'early-childhood',
    component: EarlyChildhoodPage,
    title: 'הגיל הרך – הגן',
    hebrewNumber: 19,
  },
  {
    id: 'childhood',
    component: ChildhoodPage,
    title: 'גיל הילדות',
    hebrewNumber: 20,
  },
  {
    id: 'growth-identity',
    component: GrowthIdentityPage,
    title: 'אני היום – התבגרות וזהות',
    hebrewNumber: 21,
  },
  {
    id: 'future-aspirations',
    component: FutureAspirationsPage,
    title: 'שאיפות לעתיד – מי אני רוצה להיות',
    hebrewNumber: 22,
  },
  {
    id: 'my-story',
    component: MyStoryPage,
    title: 'הסיפור שלי – עבר, הווה ועתיד',
    hebrewNumber: 23,
  },
  {
    id: 'life-story-insight',
    component: LifeStoryInsightPage,
    title: 'תובנה אישית',
    hebrewNumber: 24,
  },
  {
    id: 'family-name-insight',
    component: FamilyNameInsightPage,
    title: 'מהו שם המשפחה בשבילי?',
    hebrewNumber: 25,
  },
  {
    id: 'family-name-facts',
    component: FamilyNameFactsPage,
    title: 'עובדות על שם המשפחה שלי',
    hebrewNumber: 26,
  },
  {
    id: 'family-name-research',
    component: FamilyNameResearchPage,
    title: 'מקור ומשמעות – מחקר קצר',
    hebrewNumber: 27,
  },
  {
    id: 'family-name-personal-insight',
    component: FamilyNamePersonalInsightPage,
    title: 'תובנה אישית',
    hebrewNumber: 28,
  },
  {
    id: 'family-name-story',
    component: FamilyNameStoryPage,
    title: 'הסיפור מאחורי השם',
    hebrewNumber: 29,
  },
  {
    id: 'family-name-personal',
    component: FamilyNamePersonalPage,
    title: 'שם המשפחה ואני',
    hebrewNumber: 30,
  },
  {
    id: 'family-map',
    component: FamilyMapPage,
    title: 'מפת המשפחה שלי',
    hebrewNumber: 31,
  },
  {
    id: 'who-is-my-family',
    component: WhoIsMyFamilyPage,
    title: 'מי היא המשפחה בשבילי',
    hebrewNumber: 32,
  },
  {
    id: 'family-gemini',
    component: FamilyGeminiPage,
    title: "עיבוד בעזרת ג'מיני",
    hebrewNumber: 33,
  },
  {
    id: 'thiya-revival',
    component: ThiyaRevivalPage,
    title: 'העבר קם לתחייה',
    hebrewNumber: 34,
  },
  {
    id: 'family-comic',
    component: FamilyComicPage,
    title: 'קומיקס – אז והיום',
    hebrewNumber: 35,
  },
  {
    id: 'family-role',
    component: FamilyRolePage,
    title: 'המקום שלי במשפחה',
    hebrewNumber: 36,
  },
  {
    id: 'family-past-insight',
    component: FamilyPastInsightPage,
    title: 'תובנה אישית',
    hebrewNumber: 37,
  },
  {
    id: 'family-tree-insight',
    component: FamilyTreeInsightPage,
    title: 'מהו עץ משפחה בשבילי?',
    hebrewNumber: 38,
  },
  {
    id: 'family-generations',
    component: FamilyGenerationsPage,
    title: 'איסוף מידע על הדורות במשפחה',
    hebrewNumber: 39,
  },
  {
    id: 'family-tree',
    component: FamilyTreePage,
    title: 'בניית עץ המשפחה',
    hebrewNumber: 40,
  },
  {
    id: 'photo-gallery',
    component: PhotoGalleryPage,
    title: 'גלריית תמונות',
    hebrewNumber: 41,
  },
  {
    id: 'family-object',
    component: FamilyObjectPage,
    title: 'חפץ משפחתי עם משמעות',
    hebrewNumber: 42,
  },
  {
    id: 'family-journey',
    component: FamilyJourneyPage,
    title: 'מסלול הנדודים של משפחתי',
    hebrewNumber: 43,
  },
  {
    id: 'family-masa',
    component: FamilyMasaPage,
    title: 'ציור מפת הנדודים',
    hebrewNumber: 44,
  },
  {
    id: 'family-migration-narrative',
    component: FamilyMigrationNarrativePage,
    title: 'מסע משפחתי',
    hebrewNumber: 45,
  },
  {
    id: 'family-journey-insight',
    component: FamilyJourneyInsightPage,
    title: 'תובנה אישית',
    hebrewNumber: 46,
  },
  {
    id: 'community-insight',
    component: CommunityInsightPage,
    title: 'מהי קהילה בשבילי',
    hebrewNumber: 47,
  },
  {
    id: 'community',
    component: CommunityPage,
    title: 'הקהילה שבה אני גרה',
    hebrewNumber: 48,
  },
  {
    id: 'community-visit',
    component: CommunityVisitPage,
    title: 'באיזה קהילות כבר ביקרנו?',
    hebrewNumber: 49,
  },
  {
    id: 'community-contribution',
    component: CommunityContributionPage,
    title: 'התרומה שלי לקהילה',
    hebrewNumber: 50,
  },
  {
    id: 'community-venture-idea',
    component: CommunityVentureIdeaPage,
    title: 'רעיון למיזם קהילתי קטן',
    hebrewNumber: 51,
  },
  {
    id: 'community-summary',
    component: CommunitySummaryPage,
    title: 'סיכום',
    hebrewNumber: 52,
  },
  {
    id: 'community-personal-insight',
    component: CommunityPersonalInsightPage,
    title: 'תובנה אישית',
    hebrewNumber: 53,
  },
  {
    id: 'people-identity-insight',
    component: PeopleIdentityInsightPage,
    title: 'מה זה להיות חלק מהעם שלי?',
    hebrewNumber: 54,
  },
  {
    id: 'citizenship-insight',
    component: CitizenshipInsightPage,
    title: 'מה זה להיות אזרח בישראל?',
    hebrewNumber: 55,
  },
  {
    id: 'national-symbols',
    component: NationalSymbolsPage,
    title: 'סמלים לאומיים – הדגל וההמנון',
    hebrewNumber: 56,
  },
  {
    id: 'memorial-day-insight',
    component: MemorialDayInsightPage,
    title: 'טקסים ומשמעותם',
    hebrewNumber: 57,
  },
  {
    id: 'bat-mitzvah',
    component: BatMitzvahPage,
    title: 'בת מצווה – בין אישי ללאומי',
    hebrewNumber: 58,
  },
  {
    id: 'personal-poem',
    component: PersonalPoemPage,
    title: 'שיר אישי על העם והמדינה',
    hebrewNumber: 59,
  },
  {
    id: 'journey-summary',
    component: JourneySummaryPage,
    title: 'סיכום המסע',
    hebrewNumber: 60,
  },
];
