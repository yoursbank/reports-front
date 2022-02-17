import React from 'react';
import { CircularProgress } from '@mui/material';

// Hook import
import { useCharts } from '../../hooks/charts';

// Style import
import { Text } from './styles';

const EmptyText: React.FC = () => {
  // Hooks
  const { loading } = useCharts();

  return loading ? <CircularProgress /> : <Text>Sem dados calculado.</Text>;
};

export { EmptyText };
