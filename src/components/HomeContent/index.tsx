import { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useCountry } from '../../hooks/countries';

import Input from '../Input';

import { CountryBox } from '..';

import ArrowDownIcon from '../../assets/icons/chevron-down.svg';

import {
  Container,
  Wrapper,
  Row,
  Select,
  CountriesContainer,
} from '../../styles/pages/home';

const HomeContent = (): JSX.Element => {
  const formRef = useRef<FormHandles>(null);

  const [region, setRegion] = useState('all');

  const {
    loading,
    filteredCountries,
    handleFilterCountries,
    handleSearchByCountry,
  } = useCountry();

  const handleSubmit = useCallback(
    async ({ country }, { reset }) => {
      if (country === '') return;

      formRef.current.setErrors({});

      await handleSearchByCountry(country).catch(() => {
        formRef.current.setFieldError('country', 'Country not found');
      });

      reset();
    },
    [handleSearchByCountry]
  );

  useEffect(() => {
    handleFilterCountries(region);
  }, [handleFilterCountries, region]);

  return (
    <Container>
      <Wrapper>
        <Row>
          <Form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
            <Input name="country" placeholder="Search for a country..." />

            <Select>
              <select onChange={e => setRegion(e.target.value)}>
                <option disabled>Filter by region</option>
                <option value="all">All</option>
                <option value="africa">Africa</option>
                <option value="america">America</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="oceania">Oceania</option>
              </select>

              <ArrowDownIcon />
            </Select>
          </Form>
        </Row>

        <CountriesContainer>
          {!loading &&
            filteredCountries.map(country => (
              <CountryBox
                key={country.name}
                flag={country.flag}
                name={country.name}
                population={country.population}
                region={country.region}
                capital={country.capital}
                href={`/info/${country.alpha3Code}`}
              />
            ))}
        </CountriesContainer>
      </Wrapper>
    </Container>
  );
};

export default HomeContent;
