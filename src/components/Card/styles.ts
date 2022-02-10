import styled, { css } from 'styled-components';

export const Container = styled.div<{
  noData?: boolean;
  statementCard?: boolean;
}>`
  display: flex;
  flex-direction: column;

  ${({ noData }) =>
    !noData &&
    css`
      align-items: center;
      justify-content: space-between;
    `}

  background-color: ${({ theme }) => theme.white};

  width: 100%;

  /* For the table not to overlap the card */
  ${({ statementCard }) =>
    statementCard
      ? css`
          min-height: 330px;
        `
      : css`
          height: 330px;
        `}

  border-radius: 1rem;

  padding: 1rem;
  margin-bottom: 2rem;

  -webkit-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.13);
  box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.13);

  @media (max-width: 330px) {
    height: 370px;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  margin-bottom: 1rem;

  @media (max-width: 573px) {
    flex-direction: column;
  }
`;

export const Title = styled.h3`
  font-size: 1.5rem;

  @media (max-width: 573px) {
    font-size: 1.35rem;
  }
`;

export const Subtitle = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.blue};
`;
