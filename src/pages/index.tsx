import { GetServerSideProps } from 'next';
import Head from 'next/head';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { CountriesProvider, Country } from '../hooks/countries';

import { Header, HomeContent } from '../components';

import { fetcher } from '../utils/fetcher';

interface Props {
  theme: string;
  toggleTheme(): void;
  countries: Country[];
}

const Home = ({ theme, toggleTheme, countries }: Props): JSX.Element => {
  return (
    <CountriesProvider countries={countries}>
      <Header theme={theme} toggleTheme={toggleTheme} />

      <Head>
        <title>Countries Manager</title>
      </Head>

      <HomeContent />
    </CountriesProvider>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const countries = await fetcher('/all');

  return {
    props: {
      countries,
    },
  };
};
