import React from 'react';

// Chart import
import { Goals, Category, Statement } from '../../components/Charts';

// Style import
import { Container, Header, Title, Content } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Relatório mensal de Vitor Rubim</Title>
      </Header>

      <Content>
        <Goals />
        <Category />
        <Statement />
      </Content>
    </Container>
  );
};

export { Home };
