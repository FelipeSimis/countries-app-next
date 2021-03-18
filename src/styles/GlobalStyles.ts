import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html {
    min-height: 100%;
  }

  body {
    background: var(--background);
  }

  body, #root {
    min-height: 100vh;
  }

  *, input, button {
    font-family: Nunito, sans-serif;
    color: var(--text);
    transition: background 0.4s ease;
  }

  button {
    border: 0;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--elements);
    border-radius: 8px;
  }

  :root {
    ${({ theme }) => {
      let append = '';

      Object.entries(theme).forEach(([key, value]) => {
        append += `--${key}: ${value};`;
      });

      return append;
    }}
  }
`;
