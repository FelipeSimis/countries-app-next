/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
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

const Map = dynamic(() => import('../../components/Map'), {
  ssr: false,
});

const CountryInfo = ({ country, theme, toggleTheme }: Props): JSX.Element => {
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
            <>
              <Row>
                <div className="image-wrapper">
                  <Image
                    src={country.flag}
                    alt={country.name}
                    width={440}
                    height={293}
                    objectFit="cover"
                    priority
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
                        Population: <span>{country.population}</span>
                      </p>

                      {country.region !== '' && (
                        <p>
                          Region: <span>{country.region}</span>
                        </p>
                      )}

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
                        Top Level Domain: <span>{country.topLevelDomain}</span>
                      </p>

                      {country.latlng?.length !== 0 && (
                        <p>
                          Latitude and Longitude:{' '}
                          <span>
                            {`${country.latlng[0].toFixed(
                              2
                            )}, ${country.latlng[1].toFixed(2)}`}
                          </span>
                        </p>
                      )}

                      {!!country.area && (
                        <p>
                          Area: <span>{country.area} km²</span>
                        </p>
                      )}

                      <p>
                        Currencies: <span>{country?.currencies}</span>
                      </p>

                      {country.cioc && (
                        <p>
                          IOC: <span>{country.cioc}</span>
                        </p>
                      )}

                      <p>
                        Languages: <span>{country?.languages}</span>
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

              {country.latlng?.length !== 0 && <Map country={country} />}
            </>
          </CountryContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default CountryInfo;

export const getStaticPaths: GetStaticPaths = async () => {
  const countries = await fetcher('/all');

  const paths = countries.map(country => {
    return { params: { name: country.alpha3Code } };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ctx => {
  const { name } = ctx.params;

  const countryData: Country = await fetcher(`/alpha/${name}`);

  const country = {
    ...countryData,
    population: countryData.population.toLocaleString(undefined, {
      minimumFractionDigits: 3,
      maximumSignificantDigits: 2,
    }),
    area:
      countryData.area !== null &&
      countryData.area.toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumSignificantDigits: 2,
      }),
    currencies: countryData.currencies
      ?.map(currency => currency.name)
      .join(', '),
    languages: countryData.languages?.map(language => language.name).join(', '),
  };

  return {
    props: {
      country,
    },
    revalidate: 60 * 60 * 24,
  };
};
