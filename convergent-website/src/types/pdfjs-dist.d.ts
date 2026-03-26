declare module 'pdfjs-dist/legacy/build/pdf.mjs' {
  export const GlobalWorkerOptions: { workerSrc: string };
  export function getDocument(
    src: string | { url: string }
  ): {
    promise: Promise<import('pdfjs-dist/types/src/display/api').PDFDocumentProxy>;
    destroy: () => void;
  };
}
