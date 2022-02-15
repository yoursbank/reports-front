import { ReactNode, useMemo } from 'react';
import { format, subMonths } from 'date-fns';
import ptBR from 'date-fns/esm/locale/pt-BR/index.js';

// Component import
import { EmptyText } from '..';

// Style import
import { Container, Header, Title, Subtitle, Content } from './styles';

// Interface
interface ICardProps {
  title?: string;
  children: ReactNode;

  statementCard?: boolean;
}

const Card = ({ title, statementCard, children }: ICardProps) => {
  const formattedDate = useMemo(() => {
    const date = new Date();
    const subMonth = subMonths(date, 1);

    if (!date) return 'Não foi possível mapear a data';

    return format(new Date(subMonth), 'MMMM - yyyy', {
      locale: ptBR,
    });
  }, []);

  return (
    <Container statementCard={statementCard}>
      {!!title && (
        <Header>
          <Title>{title}</Title>
          {!!children && <Subtitle>{formattedDate}</Subtitle>}
        </Header>
      )}

      <Content>{children || <EmptyText />}</Content>
    </Container>
  );
};

export { Card };
