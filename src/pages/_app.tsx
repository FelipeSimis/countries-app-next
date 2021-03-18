import { useCallback, useState } from 'react';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { ThemeProvider } from 'styled-components';
import 'nprogress/nprogress.css';

import { ThemeName, themes } from '../styles/themes';
import GlobalStyles from '../styles/GlobalStyles';

const TopProgressBar = dynamic(
  () => {
    return import('../components/TopProgressBar');
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [theme, setTheme] = useState<ThemeName>(() => {
    if (typeof window !== 'undefined') {
      const themeName = localStorage.getItem('@CountriesManager:theme');

      if (themeName) {
        return themeName as 'light' | 'dark';
      }
    }

    return 'dark';
  });
  const currentTheme = themes[theme];

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');

    localStorage.setItem(
      '@CountriesManager:theme',
      theme === 'light' ? 'dark' : 'light'
    );
  }, [setTheme, theme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <TopProgressBar />

      <Component {...pageProps} theme={theme} toggleTheme={toggleTheme} />

      <GlobalStyles />
    </ThemeProvider>
  );
}

export default MyApp;
