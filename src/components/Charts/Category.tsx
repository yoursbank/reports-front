import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

// Hook import
import { useCharts } from '../../hooks/charts';

// Component import
import { Card } from '../Card';

const Category: React.FC = () => {
  // Hook
  const theme = useContext(ThemeContext);
  const { categoryChartData } = useCharts();

  const chartColors = [
    theme.black,
    '#FFBB28',
    theme.orange,
    theme.blue,
    theme.pink,
  ];

  return (
    <Card title="Gastos por categoria">
      {categoryChartData[0] && (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryChartData}
              label
              dataKey="percent"
              nameKey="type"
            >
              {categoryChartData.map((_, index) => (
                <Cell
                  key={`cell-${index * 3}`}
                  fill={chartColors[index % chartColors.length]}
                  stroke={chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export { Category };
