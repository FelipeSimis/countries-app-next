import styled, { css } from 'styled-components';

interface ContainerProps {
  currentTheme: string;
}

export const Container = styled.header<ContainerProps>`
  padding: 20px 30px;

  background: var(--elements);

  ${props =>
    props.currentTheme === 'dark'
      ? css`
          box-shadow: 0px 3px 13px 1px rgba(31, 39, 46, 1);
        `
      : css`
          box-shadow: 0px 3px 13px 1px rgba(230, 230, 230, 1);
        `}
`;

export const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 14px;
    font-weight: 600;

    margin-right: 20px;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;

  background: none;

  font-size: 11px;
  font-weight: 600;

  svg {
    width: 18px;
    height: 18px;
    margin-right: 10px;

    color: var(--text);
  }
`;
