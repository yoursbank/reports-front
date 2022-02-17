/* eslint-disable no-console */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

// Service import
import { api } from '../services/api';

// Interface
interface ChartsContextData {
  usersListData: IUsersListDataProps[];
  goalsChartData: IGoalsChartDataProps[];
  categoryChartData: ICategoryChartDataProps[];
  statementTableData: IStatementTableDataProps[];

  selectedUser: IUsersListDataProps | undefined;
  handleSelectUser(user: IUsersListDataProps): void;

  loading: boolean;
  error: string;

  page: number;
  setPage(page: number): void;
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

interface IUsersListDataProps {
  name: string;
  id: string;
}

// Context
const ChartsContext = createContext<ChartsContextData>({} as ChartsContextData);

// Provider
const ChartsProvider: React.FC = ({ children }) => {
  // Local states
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState<
    IUsersListDataProps | undefined
  >(undefined);

  const [usersListData, setUsersListData] = useState<IUsersListDataProps[]>([]);
  const [goalsChartData, setGoalsChartData] = useState<IGoalsChartDataProps[]>(
    [],
  );
  const [categoryChartData, setCategoryChartData] = useState<
    ICategoryChartDataProps[]
  >([]);
  const [statementTableData, setStatementTableData] = useState<
    IStatementTableDataProps[]
  >([]);

  /**
   * Requests
   */

  useEffect(() => {
    try {
      const getUsers = async () => {
        setLoading(true);

        const { data } = await api.get<IUsersListDataProps[]>(
          `/reports/users/${page}/10`,
        );

        if (!Array.isArray(data)) throw new Error();

        setUsersListData(prevUsers => [...prevUsers, ...data]);
      };

      getUsers();
    } catch {
      setError('Não foi possível buscar os usuários');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (selectedUser?.id) {
      try {
        setLoading(true);

        const getGoalsReport = async () => {
          const { data } = await api.get<IGoalsChartDataProps[]>(
            `/reports/objectives/${selectedUser?.id}`,
          );

          if (!Array.isArray(data)) throw new Error();

          setGoalsChartData(data);
        };

        getGoalsReport();
      } catch {
        setError('Não foi possível buscar os objetivos do usuário selecionado');
      } finally {
        setLoading(false);
      }
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser?.id) {
      try {
        const getCategoryReport = async () => {
          setLoading(true);

          const { data } = await api.get<
            [{ porcentage: number; type: string }]
          >(`reports/costs-category/${selectedUser?.id}`);

          if (!Array.isArray(data)) throw new Error();

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

          // const hasValue = parsedData.every(item => item.percent > 0);

          setCategoryChartData(parsedData);
          // else setCategoryChartData([]);
        };

        getCategoryReport();
      } catch {
        setError('Não foi possível buscar os gastos do usuário selecionado');
      } finally {
        setLoading(false);
      }
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser?.id) {
      try {
        const getStatementReport = async () => {
          setLoading(true);

          const { data } = await api.get<IStatementTableDataProps[]>(
            `/reports/movements/${selectedUser?.id}`,
          );

          if (!Array.isArray(data)) throw new Error();

          setStatementTableData(data);
        };

        getStatementReport();
      } catch {
        setError(
          'Não foi possível buscar os dados do extrato do usuário selecionado',
        );
      } finally {
        setLoading(false);
      }
    }
  }, [selectedUser]);

  /**
   *
   */

  const handleSelectUser = useCallback((user: IUsersListDataProps) => {
    if (!user) return;

    setSelectedUser(user);
  }, []);

  /**
   * To prevent unnecessary rendering
   */

  const providerValue = useMemo(() => {
    return {
      usersListData,
      goalsChartData,
      categoryChartData,
      statementTableData,
      selectedUser,
      handleSelectUser,
      error,
      loading,
      page,
      setPage,
    };
  }, [
    categoryChartData,
    goalsChartData,
    statementTableData,
    usersListData,
    selectedUser,
    handleSelectUser,
    error,
    loading,
    page,
  ]);

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
export type { IUsersListDataProps };
