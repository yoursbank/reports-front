import React, { useMemo } from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { format } from 'date-fns';
import ptBR from 'date-fns/esm/locale/pt-BR/index.js';

// Hook import
import { useCharts } from '../../hooks/charts';

// Util import
import { statementInformation, formatCurrency } from '../../utils/index';

// Component import
import { Card } from '../Card';

const Statement: React.FC = () => {
  // Hooks
  const { statementTableData } = useCharts();

  const formattedDate = useMemo(() => {
    if (!statementTableData[0]?.date) return 'Não foi possível mapear a data';

    return format(new Date(statementTableData[0].date), 'MMMM - yyyy', {
      locale: ptBR,
    });
  }, [statementTableData]);

  return (
    <Card title="Extrato mensal" subtitle={formattedDate} statementCard>
      <TableContainer style={{ marginBottom: 10 }}>
        <Table aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell align="right">Valor</TableCell>
              <TableCell align="right">Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statementTableData.map(statement => {
              const {
                title,
                icon: Icon,
                statementColor,
              } = statementInformation(statement.type);

              return (
                <TableRow key={statement.date}>
                  <TableCell component="th" scope="row">
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Icon color={statementColor} />
                      <span style={{ marginLeft: 10 }}>{title}</span>
                    </div>
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    {formatCurrency(statement.value)}
                  </TableCell>
                  <TableCell align="right">
                    {format(new Date(statement.date), 'dd/MM/yyyy')}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export { Statement };
