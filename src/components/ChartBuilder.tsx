import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import AreaChartIcon from '@mui/icons-material/AreaChart';
import { VegaLite } from 'react-vega';
import { DataRow, ChartType, EncodingField, FieldType } from '../types';
import EncodingShelf from './EncodingShelf';
import DataTable from './DataTable';

interface ChartBuilderProps {
  data: DataRow[];
  columns: string[];
}

const ChartBuilder: React.FC<ChartBuilderProps> = ({ data, columns }) => {
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [xField, setXField] = useState<EncodingField | null>(null);
  const [yField, setYField] = useState<EncodingField | null>(null);
  const [colorField, setColorField] = useState<EncodingField | null>(null);

  // Infer field types based on data
  const inferFieldType = (column: string): FieldType => {
    const sampleValue = data[0]?.[column];
    if (typeof sampleValue === 'number') {
      return 'quantitative';
    }
    return 'nominal';
  };

  const spec = useMemo(() => {
    if (!xField && !yField) return null;

    const encoding: any = {};
    
    if (xField) {
      encoding.x = { field: xField.field, type: xField.type };
    }
    if (yField) {
      encoding.y = { field: yField.field, type: yField.type };
    }
    if (colorField) {
      encoding.color = { field: colorField.field, type: colorField.type };
    }

    return {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: 'A simple chart',
      data: { values: data },
      mark: chartType,
      encoding,
      width: 400,
      height: 300,
    };
  }, [chartType, xField, yField, colorField, data]);

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
      {/* Left Panel - Chart and Controls */}
      <Box sx={{ flex: 1, p: 2, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Chart Type
          </Typography>
          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={(_, value) => value && setChartType(value)}
            aria-label="chart type"
            fullWidth
          >
            <ToggleButton value="bar" aria-label="bar chart">
              <BarChartIcon sx={{ mr: 1 }} /> Bar
            </ToggleButton>
            <ToggleButton value="line" aria-label="line chart">
              <ShowChartIcon sx={{ mr: 1 }} /> Line
            </ToggleButton>
            <ToggleButton value="point" aria-label="scatter plot">
              <ScatterPlotIcon sx={{ mr: 1 }} /> Scatter
            </ToggleButton>
            <ToggleButton value="area" aria-label="area chart">
              <AreaChartIcon sx={{ mr: 1 }} /> Area
            </ToggleButton>
          </ToggleButtonGroup>
        </Paper>

        <EncodingShelf
          columns={columns}
          xField={xField}
          yField={yField}
          colorField={colorField}
          onXFieldChange={setXField}
          onYFieldChange={setYField}
          onColorFieldChange={setColorField}
          inferFieldType={inferFieldType}
        />

        <Paper elevation={2} sx={{ p: 3, mt: 2, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {spec ? (
            <VegaLite spec={spec} actions={false} />
          ) : (
            <Typography color="text.secondary">
              Select fields to create a chart
            </Typography>
          )}
        </Paper>
      </Box>

      {/* Right Panel - Data Table */}
      <Box sx={{ width: 400, borderLeft: '1px solid #e0e0e0', overflow: 'hidden' }}>
        <DataTable data={data} columns={columns} />
      </Box>
    </Box>
  );
};

export default ChartBuilder;