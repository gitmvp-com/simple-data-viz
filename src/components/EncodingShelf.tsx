import React from 'react';
import {
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { EncodingField, FieldType } from '../types';

interface EncodingShelfProps {
  columns: string[];
  xField: EncodingField | null;
  yField: EncodingField | null;
  colorField: EncodingField | null;
  onXFieldChange: (field: EncodingField | null) => void;
  onYFieldChange: (field: EncodingField | null) => void;
  onColorFieldChange: (field: EncodingField | null) => void;
  inferFieldType: (column: string) => FieldType;
}

const EncodingShelf: React.FC<EncodingShelfProps> = ({
  columns,
  xField,
  yField,
  colorField,
  onXFieldChange,
  onYFieldChange,
  onColorFieldChange,
  inferFieldType,
}) => {
  const handleFieldChange = (
    value: string,
    setter: (field: EncodingField | null) => void
  ) => {
    if (value === '') {
      setter(null);
    } else {
      setter({
        field: value,
        type: inferFieldType(value),
      });
    }
  };

  const handleTypeChange = (
    type: FieldType,
    field: EncodingField | null,
    setter: (field: EncodingField | null) => void
  ) => {
    if (field) {
      setter({ ...field, type });
    }
  };

  const renderFieldSelector = (
    label: string,
    field: EncodingField | null,
    onFieldChange: (field: EncodingField | null) => void
  ) => (
    <Grid item xs={12}>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth size="small">
          <InputLabel>{label}</InputLabel>
          <Select
            value={field?.field || ''}
            label={label}
            onChange={(e) => handleFieldChange(e.target.value, onFieldChange)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {columns.map((col) => (
              <MenuItem key={col} value={col}>
                {col}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {field && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
              Type:
            </Typography>
            <ToggleButtonGroup
              value={field.type}
              exclusive
              size="small"
              onChange={(_, value) => value && handleTypeChange(value, field, onFieldChange)}
            >
              <ToggleButton value="quantitative">Quantitative</ToggleButton>
              <ToggleButton value="nominal">Nominal</ToggleButton>
              <ToggleButton value="ordinal">Ordinal</ToggleButton>
              <ToggleButton value="temporal">Temporal</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        )}
      </Box>
    </Grid>
  );

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Encoding Shelf
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Map your data fields to visual properties
      </Typography>
      <Grid container spacing={2}>
        {renderFieldSelector('X Axis', xField, onXFieldChange)}
        {renderFieldSelector('Y Axis', yField, onYFieldChange)}
        {renderFieldSelector('Color', colorField, onColorFieldChange)}
      </Grid>
    </Paper>
  );
};

export default EncodingShelf;