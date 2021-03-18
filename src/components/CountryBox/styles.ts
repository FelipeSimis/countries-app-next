import styled from 'styled-components';

export const Container = styled.a`
  max-width: 280px;
  margin: 12px;

  background: var(--elements);
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  > .image-container {
    min-width: 240px;
    width: 100%;

    img {
      width: 100%;
      height: 213px;
      object-fit: cover;

      border-radius: 8px 8px 0 0;
    }
  }
`;

export const Info = styled.div`
  padding: 20px 12px;

  h5 {
    font-size: 16px;
    margin-bottom: 12px;
  }

  > div {
    font-size: 14px;

    p {
      font-weight: 600;

      &:not(:first-child) {
        margin-top: 4px;
      }
    }

    span {
      font-weight: 300;
    }
  }
`;
