import { useState } from 'react';
import PDFViewer from './components/PDFViewer';
import AnalysisPanel from './components/AnalysisPanel';
import citationsData from './data/citations.json';

function App() {
  const [activeCitation, setActiveCitation] = useState(null);
  const [targetPage, setTargetPage] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleCitationClick = (citationId) => {
    const citation = citationsData.citations.find(c => c.id === citationId);
    
    if (citation) {
      setActiveCitation(citationId);
      setTargetPage(citation.page);
      setSearchText(citation.searchText);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">PDF Citation Mapper</h1>
      </header>
      
      <div className="flex-1 flex overflow-hidden">
        <div className="w-3/5 border-r">
          <PDFViewer
            pdfUrl="/sample.pdf"
            targetPage={targetPage}
            searchText={searchText}
          />
        </div>
        
        <div className="w-2/5">
          <AnalysisPanel
            onCitationClick={handleCitationClick}
            activeCitation={activeCitation}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
