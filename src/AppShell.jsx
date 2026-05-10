import { useRef, useState } from 'react';
import Book from './components/Book';
import MiznePage from './pages/MiznePage';
import AIChatPage from './pages/AIChatPage';
import HamburgerButton from './components/HamburgerButton';
import FloatingMenu from './components/FloatingMenu';
import PdfLoadingOverlay from './components/PdfLoadingOverlay';
import { pages } from './data/pagesConfig';

export default function AppShell() {
  const [activeSection, setActiveSection] = useState('book');
  const [menuOpen, setMenuOpen] = useState(false);
  const [pdfProgress, setPdfProgress] = useState(null);
  const hamburgerRef = useRef(null);

  function renderSection() {
    if (activeSection === 'aichat') return <AIChatPage />;
    if (activeSection === 'mizne') return <MiznePage />;
    return <Book />;
  }

  async function handleDownloadPdf() {
    setPdfProgress({ current: 0, total: pages.length });
    try {
      const { generateBookPdf } = await import('./utils/generatePdf');
      await generateBookPdf(pages, (current, total) => {
        setPdfProgress({ current, total });
      });
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setPdfProgress(null);
    }
  }

  return (
    <>
      {renderSection()}

      <HamburgerButton
        ref={hamburgerRef}
        isOpen={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      />

      <FloatingMenu
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        triggerRef={hamburgerRef}
        onDownloadPdf={handleDownloadPdf}
      />

      <PdfLoadingOverlay progress={pdfProgress} />
    </>
  );
}
