import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { blue } from '@mui/material/colors';
import DataUpload from './components/DataUpload';
import ChartBuilder from './components/ChartBuilder';
import { DataRow } from './types';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
  },
});

function App() {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const handleDataLoad = (loadedData: DataRow[], loadedColumns: string[]) => {
    setData(loadedData);
    setColumns(loadedColumns);
  };

  const handleReset = () => {
    setData([]);
    setColumns([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 1 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 300 }}>
              Simple Data Viz
            </Typography>
            {data.length > 0 && (
              <Button onClick={handleReset} variant="outlined" size="small">
                Reset Data
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
          {data.length === 0 ? (
            <DataUpload onDataLoad={handleDataLoad} />
          ) : (
            <ChartBuilder data={data} columns={columns} />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;