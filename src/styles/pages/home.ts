import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background: var(--background);
`;

export const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Row = styled.div`
  width: 100%;
  margin-bottom: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 16px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (min-width: 650px) {
      justify-content: space-between;
      flex-direction: row;
    }
  }

  @media (min-width: 650px) {
    flex-direction: row;
  }
`;

export const Select = styled.div`
  position: relative;

  width: 150px;
  margin: 16px;
  padding: 16px;

  background: var(--elements);

  select {
    appearance: none;

    box-shadow: none;
    border: 0 !important;
    background-image: none;
    background: var(--elements);
    border-radius: 4px;

    color: var(--text);
    cursor: pointer;

    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;

    width: 100%;
    height: 52px;
    padding: 0 0 0 12px;
  }

  svg {
    position: absolute;
    top: 20px;
    right: 8px;
    z-index: 10;

    color: var(--text);
    pointer-events: none;
  }
`;

export const CountriesContainer = styled.div`
  display: flex;
  align-items: space-between;
  justify-content: center;
  flex-wrap: wrap;
`;
