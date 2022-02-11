import { ReactNode } from 'react';

// Component import
import { EmptyText } from '..';

// Style import
import { Container, Header, Title, Subtitle, Content } from './styles';

// Interface
interface ICardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;

  statementCard?: boolean;
}

const Card = ({ title, subtitle, statementCard, children }: ICardProps) => {
  return (
    <Container statementCard={statementCard}>
      {!!title && !!subtitle && (
        <Header>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </Header>
      )}

      <Content>{children || <EmptyText />}</Content>
    </Container>
  );
};

export { Card };
