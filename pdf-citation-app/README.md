# PDF Citation Mapper

A React application for viewing PDFs with clickable citation references that highlight corresponding text in the document.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add your PDF file to the `public` folder as `sample.pdf`

3. Start the development server:
```bash
npm run dev
```

## Features

- Two-panel layout: PDF viewer (left) and analysis text (right)
- Clickable citation links [1], [2], [3]
- Automatic page navigation when citation is clicked
- Yellow highlighting of referenced text in PDF
- Zoom controls and page navigation
- Responsive design

## Configuration

Edit `src/data/citations.json` to configure citation mappings:
- `id`: Citation number
- `page`: PDF page number
- `searchText`: Text to highlight in the PDF

Edit `src/data/analysis.json` to configure the analysis text displayed in the right panel.

## Usage

1. Click any citation number [1], [2], or [3] in the analysis panel
2. The PDF will automatically navigate to the corresponding page
3. The referenced text will be highlighted in yellow
4. Use zoom controls and page navigation as needed
