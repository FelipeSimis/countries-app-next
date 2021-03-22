import { Container } from '../styles/pages/error';

const ErrorPage500 = (): JSX.Element => {
  return (
    <Container>
      <h1>Oops!</h1>
      <p>500 - Internal Server Error</p>
    </Container>
  );
};

export default ErrorPage500;
