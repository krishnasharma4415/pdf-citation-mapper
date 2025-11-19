import CitationLink from './CitationLink';
import analysisData from '../data/analysis.json';

export default function AnalysisPanel({ onCitationClick, activeCitation }) {
  const renderTextWithCitations = (text, citations) => {
    const parts = [];
    let lastIndex = 0;
    
    citations.forEach((citationId, idx) => {
      const placeholder = `[${citationId}]`;
      const index = text.indexOf(placeholder, lastIndex);
      
      if (index !== -1) {
        parts.push(text.substring(lastIndex, index));
        parts.push(
          <CitationLink
            key={`${citationId}-${idx}`}
            id={citationId}
            onClick={onCitationClick}
            isActive={activeCitation === citationId}
          />
        );
        lastIndex = index + placeholder.length;
      }
    });
    
    parts.push(text.substring(lastIndex));
    return parts;
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {analysisData.title}
      </h1>
      
      <div className="space-y-4">
        {analysisData.paragraphs.map((para, idx) => (
          <p key={idx} className="text-gray-700 leading-relaxed">
            {renderTextWithCitations(para.text, para.citations)}
          </p>
        ))}
      </div>
      
      {activeCitation && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-blue-800">
            Citation [{activeCitation}] is highlighted in the PDF
          </p>
        </div>
      )}
    </div>
  );
}
