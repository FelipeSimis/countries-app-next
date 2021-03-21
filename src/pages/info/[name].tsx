/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import useSWR from 'swr';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'leaflet/dist/leaflet.css';

import ArrowLeft from '../../assets/icons/arrow-left.svg';

import { Country } from '../../hooks/countries';

import api from '../../services/api';

import { Header } from '../../components';

import {
  Container,
  Wrapper,
  GoBackContainer,
  CountryContainer,
  Row,
  Info,
  BorderCountries,
} from '../../styles/pages/countryInfo';

interface Props {
  country: Country;
  theme: string;
  toggleTheme(): void;
}

const fetcher = (url: string) => api.get(url).then(res => res.data);

const useCountry = (country: Country) => {
  const { data, error } = useSWR(`/alpha/${country.alpha3Code}`, fetcher, {
    initialData: country,
  });

  return {
    country: data as Country,
    isLoading: !error && !data,
    isError: error,
  };
};

const Map = dynamic(() => import('../../components/Map'), {
  ssr: false,
});

const CountryInfo = ({
  country: data,
  theme,
  toggleTheme,
}: Props): JSX.Element => {
  const { country, isLoading } = useCountry(data);

  return (
    <>
      <Head>
        <title>Countries Manager {country && `- ${country.name}`}</title>
      </Head>

      <Header theme={theme} toggleTheme={toggleTheme} />

      <Container>
        <Wrapper>
          <GoBackContainer>
            <Link href="/">
              <a>
                <ArrowLeft />
                Back
              </a>
            </Link>
          </GoBackContainer>

          <CountryContainer>
            {isLoading ? (
              <Loader
                type="ThreeDots"
                color="var(--elements)"
                height={80}
                width={80}
              />
            ) : (
              <>
                <Row>
                  <div className="image-wrapper">
                    <Image
                      src={country.flag}
                      alt={country.name}
                      width={440}
                      height={293}
                    />
                  </div>

                  <Info>
                    <h5>{country.name}</h5>

                    <div className="wrapper-info">
                      <div className="first-section">
                        <p>
                          Native Name: <span>{country.nativeName}</span>
                        </p>

                        <p>
                          Population:{' '}
                          <span>
                            {country.population?.toLocaleString(undefined, {
                              minimumFractionDigits: 3,
                              maximumSignificantDigits: 2,
                            })}
                          </span>
                        </p>

                        <p>
                          Region: <span>{country.region}</span>
                        </p>

                        {country.subregion && (
                          <p>
                            Sub Region: <span>{country.subregion}</span>
                          </p>
                        )}

                        {country.capital && (
                          <p>
                            Capital: <span>{country.capital}</span>
                          </p>
                        )}

                        {country.demonym && (
                          <p>
                            Demonym: <span>{country.demonym}</span>
                          </p>
                        )}
                      </div>

                      <div className="second-section">
                        <p>
                          Top Level Domain:{' '}
                          <span>{country.topLevelDomain}</span>
                        </p>

                        {country.latlng.length !== 0 && (
                          <p>
                            Latitude and Longitude:{' '}
                            <span>
                              {`${country.latlng[0].toFixed(
                                2
                              )}, ${country.latlng[1].toFixed(2)}`}
                            </span>
                          </p>
                        )}

                        {country.area !== null && (
                          <p>
                            Area:{' '}
                            <span>
                              {country.area?.toLocaleString(undefined, {
                                minimumFractionDigits: 3,
                                maximumSignificantDigits: 2,
                              })}{' '}
                              km²
                            </span>
                          </p>
                        )}

                        <p>
                          Currencies:{' '}
                          <span>
                            {country.currencies?.map(currency => currency.name)}
                          </span>
                        </p>

                        {country.cioc && (
                          <p>
                            IOC: <span>{country.cioc}</span>
                          </p>
                        )}

                        <p>
                          Languages:{' '}
                          {country.languages?.map((language, index) => {
                            return index === 0 ? (
                              <span key={language.name}>{language.name}</span>
                            ) : (
                              <span key={language.name}>, {language.name}</span>
                            );
                          })}
                        </p>
                      </div>
                    </div>

                    {country.borders?.length !== 0 && (
                      <BorderCountries>
                        <span>Border Countries: </span>

                        <div className="border-countries-container">
                          {country.borders?.map(border => (
                            <Link key={border} href={`/info/${border}`}>
                              <a>{border}</a>
                            </Link>
                          ))}
                        </div>
                      </BorderCountries>
                    )}
                  </Info>
                </Row>

                {country.latlng.length !== 0 && <Map country={country} />}
              </>
            )}
          </CountryContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default CountryInfo;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { name } = ctx.query;

  const country: Country = await fetcher(`/alpha/${name}`);

  return {
    props: {
      country,
    },
  };
};
