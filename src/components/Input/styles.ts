import styled, { css } from 'styled-components';

interface ContainerProps {
  isErrored: boolean;
  isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`
  flex: 1;
  display: flex;
  align-items: center;
  margin: 16px;
  padding: 16px;

  max-width: 400px;

  position: relative;

  background: var(--elements);
  border-radius: 4px;
  min-width: 200px;

  ${props =>
    props.isFocused &&
    css`
      input::placeholder {
        opacity: 0.5;
      }
    `}

  svg {
    color: var(--text);
  }

  input {
    width: calc(100% - 50px);

    background: none;
    border: 0;

    position: absolute;
    top: 0;
    left: 45px;
    right: 0;
    bottom: 0;

    font-size: 14px;
    color: var(--text);

    &::placeholder {
      color: var(--text);

      transition: opacity 0.2s ease;
    }
  }
`;

export const Error = styled.div`
  position: absolute;
  left: 90%;

  display: flex;
  align-items: center;

  > span {
    width: 100px;
    background: var(--background);
    padding: 8px;

    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text);
    opacity: 0;
    visibility: hidden;

    transition: opacity 0.4s;

    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);

    &::before {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);

      border-width: 6px 6px 0 6px;
      border-style: solid;
      border-color: var(--text) transparent;
    }
  }

  > svg * {
    color: var(--text);
    flex-shrink: 0;
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }

  @media (min-width: 768px) {
    left: 92%;
  }
`;
