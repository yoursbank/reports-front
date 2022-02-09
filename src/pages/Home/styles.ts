import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;

  margin: 0 auto;
`;

export const Header = styled.header`
  position: absolute;
  z-index: -1;

  height: 200px;

  width: 100%;

  background-color: ${({ theme }) => theme.yellow};
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  color: ${({ theme }) => theme.black};

  max-width: 350px;
  margin: 2% auto 0;

  @media (max-width: 500px) {
    font-size: 2.2rem;
    margin: 6% auto;
  }
`;

export const Content = styled.main`
  margin-top: 170px;

  padding: 0 1rem;

  width: 100%;
  max-width: 700px;
`;
