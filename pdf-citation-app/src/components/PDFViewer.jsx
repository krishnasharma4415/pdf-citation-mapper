import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({ pdfUrl, targetPage, searchText, onPageChange }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  useEffect(() => {
    if (targetPage) {
      setPageNumber(targetPage);
    }
  }, [targetPage]);

  useEffect(() => {
    if (searchText && pageNumber === targetPage) {
      const timer = setTimeout(() => {
        highlightText(searchText);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchText, pageNumber, targetPage]);

  const highlightText = (text) => {
    const textLayer = document.querySelector('.react-pdf__Page__textContent');
    if (!textLayer) return;

    const spans = textLayer.querySelectorAll('span');
    spans.forEach(span => span.classList.remove('pdf-highlight'));

    const normalizedSearch = text.toLowerCase().replace(/\s+/g, ' ').trim();
    
    for (let i = 0; i < spans.length; i++) {
      const spanText = spans[i].textContent.toLowerCase().replace(/\s+/g, ' ').trim();
      
      if (spanText.includes(normalizedSearch) || normalizedSearch.includes(spanText)) {
        spans[i].classList.add('pdf-highlight');
        spans[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        for (let j = i + 1; j < Math.min(i + 5, spans.length); j++) {
          const nextText = spans[j].textContent.toLowerCase().replace(/\s+/g, ' ').trim();
          if (normalizedSearch.includes(nextText)) {
            spans[j].classList.add('pdf-highlight');
          }
        }
        break;
      }
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => {
      const newPage = prevPageNumber + offset;
      if (newPage >= 1 && newPage <= numPages) {
        onPageChange?.(newPage);
        return newPage;
      }
      return prevPageNumber;
    });
  };

  return (
    <div className="h-full flex flex-col bg-gray-100">
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-2">
          <button
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {pageNumber} of {numPages || '--'}
          </span>
          <button
            onClick={() => changePage(1)}
            disabled={pageNumber >= numPages}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="text-sm text-gray-700 w-16 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale(s => Math.min(2.0, s + 0.1))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="flex justify-center">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center h-96">
                <div className="text-gray-500">Loading PDF...</div>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        </div>
      </div>
    </div>
  );
}
