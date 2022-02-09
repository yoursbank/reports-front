import { ReactNode } from 'react';

// Style import
import { Container, Header, Title, Subtitle } from './styles';

// Interface
interface ICardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

const Card = ({ title, subtitle, children }: ICardProps) => {
  return (
    <Container>
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
