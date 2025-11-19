export default function CitationLink({ id, onClick, isActive }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`inline-flex items-center justify-center w-6 h-6 text-xs font-medium border rounded transition-all ${
        isActive
          ? 'bg-blue-500 text-white border-blue-600'
          : 'bg-white text-blue-600 border-blue-400 hover:bg-blue-50'
      }`}
    >
      {id}
    </button>
  );
}
