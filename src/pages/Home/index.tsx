import React from 'react';

// Chart import
import { Goals, Category, Statement } from '../../components/Charts';

// Hook import
import { useCharts } from '../../hooks/charts';

// Component import
import { ListUsers } from '../../components';

// Style import
import { Header, Title, Content, ButtonsContainer } from './styles';

const Home: React.FC = () => {
  // Hooks
  const { selectedUser } = useCharts();

  return (
    <>
      <Header>
        {selectedUser ? (
          <Title>Relatório mensal de {selectedUser.name}</Title>
        ) : (
          <Title>Selecione um usuário</Title>
        )}
      </Header>

      <ButtonsContainer>
        <ListUsers />
      </ButtonsContainer>

      <Content>
        <Goals />
        <Category />
        <Statement />
      </Content>
    </>
  );
};

export { Home };
