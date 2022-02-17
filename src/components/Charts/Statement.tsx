import React from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { format } from 'date-fns';

// Hook import
import { useCharts } from '../../hooks/charts';

// Util import
import { statementInformation, formatCurrency } from '../../utils/index';

// Component import
import { Card } from '../Card';

const Statement: React.FC = () => {
  // Hooks
  const { statementTableData } = useCharts();

  return (
    <Card title="Extrato mensal" statementCard>
      {!!statementTableData[0] && (
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
                      <p style={{ color: statementColor, minWidth: 100 }}>
                        {formatCurrency(statement.value)}
                      </p>
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
      )}
    </Card>
  );
};

export { Statement };
