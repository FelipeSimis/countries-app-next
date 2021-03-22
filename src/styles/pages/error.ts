import styled from 'styled-components';

export const Container = styled.div`
  min-width: 100%;
  min-height: 100vh;
  background: url('/globe.svg') no-repeat center;
  background-size: contain;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 40px;
    margin-bottom: 10px;
  }

  @media (min-width: 580px) {
    background-size: unset;
  }
`;
