import React, { useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ThemeContext } from 'styled-components';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

// Hook import
import { useCharts } from '../../hooks/charts';

// Component import
import { Card } from '../index';

// Interface
interface IChartDataProps {
  date: string;
  value: number;
  percent?: number;
}

const Goals: React.FC = () => {
  // Hook
  const { goalsChartData } = useCharts();
  const theme = useContext(ThemeContext);

  // Local state
  const [data, setData] = useState<IChartDataProps[]>([]);

  useEffect(() => {
    const chartData: IChartDataProps[] = [];

    const sumObjectiveValues = goalsChartData.reduce((acc, operation) => {
      return acc + operation.totalAmount;
    }, 0);

    goalsChartData.map(goal => {
      chartData.push({
        date: format(new Date(goal.createdAt), 'dd/yyyy'),
        value: goal.totalAmount,
        percent: sumObjectiveValues,
      });

      setData(chartData);

      return goalsChartData;
    }, []);
  }, [goalsChartData]);

  return (
    <Card title="Objetivos">
      {goalsChartData[0] && (
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 10,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date" />
            <YAxis dataKey="percent" />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0d39d9"
              fill={theme.blue}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export { Goals };
