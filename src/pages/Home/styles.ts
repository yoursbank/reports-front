import styled from 'styled-components';

export const Header = styled.header`
  position: absolute;
  z-index: -1;

  height: 200px;

  width: 100%;

  background-color: ${({ theme }) => theme.yellow};

  > div {
    display: flex;
    justify-content: flex-end;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  color: ${({ theme }) => theme.black};

  max-width: 350px;
  height: 100px;

  overflow: hidden;
  text-overflow: ellipsis;

  margin: 2% auto 0;

  @media (max-width: 500px) {
    font-size: 2.2rem;
    margin: 6% auto;
  }
`;

export const Content = styled.main`
  margin: 120px auto 20px;

  padding: 0 1rem;

  width: 100%;
  max-width: 700px;
`;

export const ButtonsContainer = styled.div`
  z-index: 1;

  padding-top: 20px;
  padding-left: 40px;
`;
