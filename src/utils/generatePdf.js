import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

// A4 at 96 dpi: 794 × 1123 px
const PAGE_W = 794;
const PAGE_H = 1123;

function waitForImages(container) {
  const imgs = [...container.querySelectorAll('img')];
  return Promise.all(
    imgs.map(
      (img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((res) => {
              img.onload  = res;
              img.onerror = res;
            })
    )
  );
}

export async function generateBookPdf(pages, onProgress) {
  // Off-screen host — placed far to the left so it never flashes on screen
  const host = document.createElement('div');
  Object.assign(host.style, {
    position: 'fixed',
    left:  `${-(PAGE_W + 40)}px`,
    top:   '0px',
    width: `${PAGE_W}px`,
    zIndex: '-9999',
    pointerEvents: 'none',
  });
  document.body.appendChild(host);

  // Lazy-import to avoid bundling unless user requests PDF
  const { default: BookPrintView } = await import('../components/BookPrintView');

  // Render all pages into the host
  const root = createRoot(host);
  await new Promise((resolve) => {
    root.render(createElement(BookPrintView, { pages, pageW: PAGE_W, pageH: PAGE_H }));
    // React renders synchronously on createRoot for static content,
    // but we still need a tick for effects + image src to kick off.
    setTimeout(resolve, 50);
  });

  // Wait for every <img> to finish loading
  await waitForImages(host);
  // Extra buffer for fonts / CSS transitions
  await new Promise((r) => setTimeout(r, 300));

  const pageEls = host.querySelectorAll('[data-pdf-page]');
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  for (let i = 0; i < pageEls.length; i++) {
    if (onProgress) onProgress(i + 1, pageEls.length);

    // Scroll this page element into view inside the host so html2canvas can see it
    const el = pageEls[i];
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#faf7f0',
      logging: false,
      width:  PAGE_W,
      height: PAGE_H,
      scrollX: 0,
      scrollY: -window.scrollY,
    });

    if (i > 0) pdf.addPage();
    const imgData = canvas.toDataURL('image/jpeg', 0.90);
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
  }

  root.unmount();
  document.body.removeChild(host);

  pdf.save('ספר-השורשים-של-רוני.pdf');
}
