import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Component import
import { Card } from '../Card';

const Category: React.FC = () => {
  // Hook
  const theme = useContext(ThemeContext);

  // Mock
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const colors = [theme.black, '#FFBB28', theme.orange, theme.blue, theme.pink];

  return (
    <Card title="Gastos por categoria" subtitle="Outubro - 2021">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} label outerRadius={100} dataKey="value">
            {data.map((_, index) => (
              <Cell
                key={`cell-${index * 3}`}
                fill={colors[index % colors.length]}
                stroke={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export { Category };
