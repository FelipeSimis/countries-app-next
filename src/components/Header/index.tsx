import { NextPage } from 'next';

import SunIcon from '../../assets/icons/sun.svg';
import MoonIcon from '../../assets/icons/moon.svg';

import { Container, Wrapper, Button } from './styles';

interface Props {
  theme: string;
  toggleTheme: () => void;
}

const Header: NextPage<Props> = ({ theme, toggleTheme }) => {
  return (
    <Container currentTheme={theme}>
      <Wrapper>
        <span>Where in the world?</span>

        <Button type="button" onClick={toggleTheme}>
          {theme === 'dark' ? <MoonIcon /> : <SunIcon />}

          {`${theme.charAt(0).toUpperCase() + theme.slice(1)} Mode`}
        </Button>
      </Wrapper>
    </Container>
  );
};

export default Header;
