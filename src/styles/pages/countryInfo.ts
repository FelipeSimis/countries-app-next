import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const buttonCSS = css`
  display: flex;
  align-items: center;
  padding: 8px 12px;

  width: fit-content;

  background: var(--elements);
  border-radius: 4px;
  box-shadow: -1px 1px 3px 0px ${shade(0.2, 'hsl(207, 26%, 17%)')};

  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

export const GoBackContainer = styled.div`
  width: 100%;
  padding: 0 30px;

  > a {
    margin: 50px 0;
    font-size: 14px;

    ${buttonCSS}

    svg {
      margin-right: 6px;
    }
  }
`;

export const CountryContainer = styled.div`
  width: 100%;
  padding: 0 30px;

  .leaflet-container {
    z-index: 5;

    margin: 20px 0;
  }
`;

export const Row = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  .image-wrapper {
    max-width: 440px;

    img {
      width: 100%;
      object-fit: cover;
      flex-shrink: 0;
    }
  }

  @media (min-width: 820px) {
    flex-direction: row;
    align-items: center;

    .image-wrapper img {
      height: 308px;
    }
  }
`;

export const Info = styled.div`
  flex: 1;

  h5 {
    margin: 30px 0 20px 0;

    font-size: 20px;
    font-weight: 700;
  }

  .wrapper-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .first-section {
      margin-bottom: 25px;
    }

    p {
      margin: 4px 0;

      font-size: 14px;
      font-weight: 600;

      span {
        font-size: inherit;
        font-weight: 300;
      }
    }

    @media (min-width: 820px) {
      flex-direction: row;

      .first-section {
        margin-bottom: 0;
        margin-right: 40px;
      }
    }
  }

  @media (min-width: 820px) {
    max-width: 50%;

    padding-left: 30px;
  }
`;

export const BorderCountries = styled.div`
  .border-countries-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    a {
      ${buttonCSS}

      margin: 6px;

      font-size: 13px;
    }
  }
`;
