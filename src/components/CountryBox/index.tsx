import { memo } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { Container, Info } from './styles';

interface CountryProps {
  flag: string;
  name: string;
  population: number;
  region: string;
  capital: string;
  href: string;
}

const CountryBox: NextPage<CountryProps> = ({
  flag,
  name,
  population,
  region,
  capital,
  href,
}) => {
  return (
    <Link href={href} passHref>
      <Container>
        <div className="image-container">
          <Image src={flag} alt={name} width="auto" height="auto" />
        </div>

        <Info>
          <h5>{name}</h5>

          <div>
            <p>
              Population:{' '}
              <span>
                {population.toLocaleString(undefined, {
                  minimumFractionDigits: 3,
                  maximumSignificantDigits: 2,
                })}
              </span>
            </p>

            <p>
              Region: <span>{region}</span>
            </p>

            <p>
              Capital:{' '}
              <span>{capital || 'This country does not have a capital'}</span>
            </p>
          </div>
        </Info>
      </Container>
    </Link>
  );
};

export default memo(CountryBox);
