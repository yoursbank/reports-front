/* eslint-disable no-console */
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

// Service import
import { api } from '../services/api';

// Interface
interface ChartsContextData {
  goalsChartData: IGoalsChartDataProps[];
  categoryChartData: ICategoryChartDataProps[];
  statementTableData: IStatementTableDataProps[];
}

interface IGoalsChartDataProps {
  active: boolean;
  createdAt: Date;
  totalAmount: number;
}

interface ICategoryChartDataProps {
  type: string;
  percent: number;
}

interface IStatementTableDataProps {
  date: string;
  value: number;
  type: string;
}

// Context
const ChartsContext = createContext<ChartsContextData>({} as ChartsContextData);

// Provider
const ChartsProvider: React.FC = ({ children }) => {
  // Local states
  const [goalsChartData, setGoalsChartData] = useState<IGoalsChartDataProps[]>(
    [],
  );
  const [categoryChartData, setCategoryChartData] = useState<
    ICategoryChartDataProps[]
  >([]);
  const [statementTableData, setStatementTableData] = useState<
    IStatementTableDataProps[]
  >([]);

  api.defaults.headers.Authorization =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGMxZTc0OTA0OWQ1N2Y5ODlhMjRmZSIsImlhdCI6MTY0NDYwNzI0N30.ihRHbg8V5zQ83713SRd_8M4uAKZ64RJIqT8RnAxvTns';

  useEffect(() => {
    const getGoalsReport = async () => {
      const { data } = await api.get<IGoalsChartDataProps[]>(
        '/reports/objectives',
      );

      if (!Array.isArray(data)) {
        console.error('Os dados do objetivos não é conforme o esperado');
        return;
      }

      setGoalsChartData(data);
    };

    getGoalsReport();
  }, []);

  useEffect(() => {
    const getCategoryReport = async () => {
      const { data } = await api.get<[{ porcentage: number; type: string }]>(
        'reports/costs-category',
      );

      if (!Array.isArray(data)) {
        console.error('Os dados do extrato não é conforme o esperado');
        return;
      }

      const parsedData: ICategoryChartDataProps[] = Array.from(data).map(
        item => {
          const formattedType =
            (item.type === 'TRANSPORT' && 'Transporte') ||
            (item.type === 'STORES' && 'Lazer') ||
            (item.type === 'SERVICE' && 'Investimentos') ||
            (item.type === 'FOOD' && 'Alimentação');

          return {
            percent: Number(item.porcentage),
            type: String(formattedType),
          };
        },
      );

      const hasValue = parsedData.every(item => item.percent > 0);

      if (hasValue) setCategoryChartData(parsedData);
      else setCategoryChartData([]);
    };

    getCategoryReport();
  }, []);

  useEffect(() => {
    const getStatementReport = async () => {
      const { data } = await api.get<IStatementTableDataProps[]>(
        '/reports/movements',
      );

      if (!Array.isArray(data)) {
        console.error('Os dados do extrato não é conforme o esperado');
        return;
      }

      setStatementTableData(data);
    };

    getStatementReport();
  }, []);

  /**
   * To prevent unnecessary rendering
   */

  const providerValue = useMemo(() => {
    return {
      goalsChartData,
      categoryChartData,
      statementTableData,
    };
  }, [categoryChartData, goalsChartData, statementTableData]);

  /**
   *
   */

  return (
    <ChartsContext.Provider value={providerValue}>
      {children}
    </ChartsContext.Provider>
  );
};

// Hook
function useCharts(): ChartsContextData {
  const context = useContext(ChartsContext);

  if (!context)
    throw new Error('useCharts must be used within a ChartsProvider');

  return context;
}

export { useCharts, ChartsProvider };
