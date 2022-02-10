import { ReactNode } from 'react';

// Style import
import { Container, Header, Title, Subtitle } from './styles';

// Interface
interface ICardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;

  noData?: boolean;
  statementCard?: boolean;
}

const Card = ({
  title,
  subtitle,
  noData,
  statementCard,
  children,
}: ICardProps) => {
  return (
    <Container noData={noData} statementCard={statementCard}>
      {!!title && !!subtitle && (
        <Header>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </Header>
      )}

      {children}
    </Container>
  );
};

export { Card };
