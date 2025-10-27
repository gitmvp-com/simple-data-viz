import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  Tabs,
  Tab,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Papa from 'papaparse';
import { DataRow } from '../types';

interface DataUploadProps {
  onDataLoad: (data: DataRow[], columns: string[]) => void;
}

const DataUpload: React.FC<DataUploadProps> = ({ onDataLoad }) => {
  const [tabValue, setTabValue] = useState(0);
  const [pasteValue, setPasteValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseData = (csvText: string) => {
    Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data.length > 0) {
          const columns = Object.keys(results.data[0] as object);
          onDataLoad(results.data as DataRow[], columns);
        }
      },
      error: (error) => {
        alert('Error parsing CSV: ' + error.message);
      },
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        parseData(text);
      };
      reader.readAsText(file);
    }
  };

  const handlePaste = () => {
    if (pasteValue.trim()) {
      parseData(pasteValue);
    }
  };

  const handleLoadSample = () => {
    const sampleData = `name,age,score,city
Alice,25,85,New York
Bob,30,92,San Francisco
Charlie,22,78,Boston
Diana,28,88,Seattle
Eve,35,95,Austin
Frank,29,82,Denver
Grace,26,90,Portland
Henry,31,87,Chicago`;
    parseData(sampleData);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 600,
          width: '100%',
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Load Your Data
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Upload a CSV file or paste your data to get started
        </Typography>

        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ mb: 2 }}>
          <Tab label="Upload File" />
          <Tab label="Paste Data" />
        </Tabs>

        {tabValue === 0 && (
          <Box sx={{ textAlign: 'center' }}>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <Button
              variant="contained"
              startIcon={<UploadFileIcon />}
              onClick={() => fileInputRef.current?.click()}
              size="large"
              fullWidth
              sx={{ mb: 2 }}
            >
              Choose CSV File
            </Button>
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <TextField
              multiline
              rows={8}
              fullWidth
              placeholder="Paste CSV data here...\n\nExample:\nname,age,score\nAlice,25,85\nBob,30,92"
              value={pasteValue}
              onChange={(e) => setPasteValue(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              startIcon={<ContentPasteIcon />}
              onClick={handlePaste}
              disabled={!pasteValue.trim()}
              fullWidth
              size="large"
            >
              Load Data
            </Button>
          </Box>
        )}

        <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #e0e0e0' }}>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 1 }}>
            Or try with sample data
          </Typography>
          <Button
            variant="outlined"
            onClick={handleLoadSample}
            fullWidth
            size="small"
          >
            Load Sample Data
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DataUpload;