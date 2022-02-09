import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

// Component import
import { Card } from '../Card';

// Mock
const data = [
  {
    name: '10/09',
    value: 1,
    percent: 1,
  },
  {
    name: '20/09',
    value: 25,
    percent: 10,
  },
  {
    name: '30/09',
    value: 20,
    percent: 20,
  },
  {
    name: '01/10',
    value: 22,
    percent: 30,
  },
  {
    name: '01/10',
    value: 15,
    percent: 40,
  },
  {
    name: '10/10',
    value: 35,
    percent: 40,
  },
];

const Goals: React.FC = () => {
  // Hook
  const theme = useContext(ThemeContext);

  return (
    <Card title="Objetivos" subtitle="Setembro - Outubro - Novembro">
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: -15,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis dataKey="percent" />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#0d39d9"
            fill={theme.blue}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export { Goals };
