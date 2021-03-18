import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import useSWR from 'swr';

import api from '../services/api';

import { fetcher } from '../utils/fetcher';

export interface Country {
  name: string;
  topLevelDomain: Array<string>;
  alpha3Code: string;
  capital: string;
  demonym: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  latlng?: [number, number] | [];
  area: number;
  borders?: Array<string>;
  currencies?: Array<{
    name: string;
  }>;
  languages?: Array<{
    name: string;
  }>;
  flag: string;
  cioc?: string;
}

interface CountriesContextData {
  filteredCountries: Country[];
  loading: boolean;
  handleSearchByCountry(country: string): Promise<void>;
  handleFilterCountries(region: string): void;
}

interface CountriesProviderProps {
  countries: Country[];
  children: ReactNode;
}

const CountriesContext = createContext<CountriesContextData>(
  {} as CountriesContextData
);

const useCountriesList = (countries?: Country[]) => {
  const { data, error } = useSWR(`/all`, fetcher, { initialData: countries });

  return {
    countries: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const CountriesProvider = ({
  countries,
  children,
}: CountriesProviderProps): JSX.Element => {
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  const { countries: data, isLoading } = useCountriesList(countries);

  const handleSearchByCountry = async (country: string) => {
    const { data: _countries } = await api.get(`/name/${country}`);

    setFilteredCountries(_countries);
  };

  const handleFilterCountries = useCallback(
    (region: string) => {
      if (data) {
        switch (region) {
          case 'all':
            setFilteredCountries(data);
            break;
          case 'africa':
            setFilteredCountries(
              data.filter(country => country.region === 'Africa')
            );
            break;
          case 'america':
            setFilteredCountries(
              data.filter(country => country.region === 'Americas')
            );
            break;
          case 'asia':
            setFilteredCountries(
              data.filter(country => country.region === 'Asia')
            );
            break;
          case 'europe':
            setFilteredCountries(
              data.filter(country => country.region === 'Europe')
            );
            break;
          case 'oceania':
            setFilteredCountries(
              data.filter(country => country.region === 'Oceania')
            );
            break;
          default:
            setFilteredCountries(data);
        }
      }
    },
    [data]
  );

  return (
    <CountriesContext.Provider
      value={{
        filteredCountries,
        handleFilterCountries,
        handleSearchByCountry,
        loading: isLoading,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};

function useCountry(): CountriesContextData {
  const context = useContext(CountriesContext);

  if (!context)
    throw new Error('useCountries must be used within an CountriesProvider');

  return context;
}

export { CountriesProvider, useCountry };
