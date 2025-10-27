# Simple Data Viz

A simplified MVP version of [Microsoft Data Formulator](https://github.com/microsoft/data-formulator) - Create simple visualizations from CSV data.

## Overview

This is a minimal viable product (MVP) that demonstrates the core concept of Data Formulator: transforming data into visualizations through an intuitive interface. Unlike the full Data Formulator which includes AI-powered features, database integration, and advanced analytics, this MVP focuses on the essential functionality:

- 📊 **Simple data upload** (CSV files or paste)
- 📈 **Basic chart creation** (Bar, Line, Scatter, Area)
- 🎨 **Visual encoding** (X, Y, Color mappings)
- 📋 **Data preview** table

## Key Differences from Full Data Formulator

| Feature | Data Formulator | Simple Data Viz (MVP) |
|---------|----------------|----------------------|
| AI-Powered Charts | ✅ | ❌ |
| Database Support | ✅ (DuckDB, MySQL, etc.) | ❌ |
| Authentication | ✅ | ❌ |
| Multiple Datasets | ✅ | ❌ |
| Advanced Transformations | ✅ | ❌ |
| Data Threads | ✅ | ❌ |
| LLM Integration | ✅ | ❌ |
| Basic Visualization | ✅ | ✅ |
| CSV Upload | ✅ | ✅ |

## Features

### 1. Data Upload
- Upload CSV files
- Paste CSV data directly
- Load sample data to get started

### 2. Chart Types
- Bar Chart
- Line Chart
- Scatter Plot
- Area Chart

### 3. Visual Encoding
- Map data fields to X and Y axes
- Add color encoding for additional dimensions
- Automatically infer field types (quantitative/nominal/ordinal/temporal)
- Manually adjust field types as needed

### 4. Data Preview
- View your data in a table format
- See row and column counts
- Scroll through up to 100 rows

## Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/gitmvp-com/simple-data-viz.git
cd simple-data-viz

# Install dependencies
npm install
# or
yarn install
```

### Running the Application

```bash
# Start development server
npm start
# or
yarn start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
# Create production build
npm run build
# or
yarn build
```

## Usage

1. **Load Data**
   - Click "Choose CSV File" to upload a CSV file, or
   - Switch to "Paste Data" tab and paste your CSV content, or
   - Click "Load Sample Data" to try with example data

2. **Select Chart Type**
   - Choose from Bar, Line, Scatter, or Area chart

3. **Configure Encodings**
   - Select which field to use for X axis
   - Select which field to use for Y axis
   - Optionally select a field for Color encoding
   - Adjust field types (Quantitative, Nominal, Ordinal, Temporal) if needed

4. **View Results**
   - See your chart update in real-time
   - Preview your data in the table on the right

## Technology Stack

This MVP uses the same core dependencies as Data Formulator:

- **React** 18.2.0 - UI framework
- **TypeScript** 4.9.5 - Type safety
- **Vite** 5.4.19 - Build tool
- **Material-UI** 7.1.1 - UI components
- **Vega-Lite** 5.5.0 - Declarative visualization grammar
- **React-Vega** 7.6.0 - React wrapper for Vega
- **PapaParse** 5.4.1 - CSV parsing

## Project Structure

```
src/
├── components/
│   ├── ChartBuilder.tsx    # Main chart building interface
│   ├── DataUpload.tsx      # Data upload component
│   ├── EncodingShelf.tsx   # Field mapping controls
│   └── DataTable.tsx       # Data preview table
├── App.tsx                 # Main app component
├── index.tsx              # App entry point
├── types.ts               # TypeScript type definitions
└── index.css              # Global styles
```

## Future Enhancements

To transform this MVP into a more feature-rich application, consider adding:

- More chart types (pie, histogram, heatmap)
- Data filtering and sorting
- Export charts as images
- Save/load chart configurations
- Multiple datasets support
- Basic data transformations (aggregations, grouping)

## Credits

This MVP is inspired by [Microsoft Data Formulator](https://github.com/microsoft/data-formulator).

## License

MIT License - feel free to use this project for learning and development purposes.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.
