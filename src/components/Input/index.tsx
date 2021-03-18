import {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';

import AlertIcon from '../../assets/icons/alert-circle.svg';
import SearchIcon from '../../assets/icons/search.svg';

import { Container, Error } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input = ({ name, ...rest }: Props): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const { fieldName, defaultValue = '', error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFocused={isFocused}>
      <SearchIcon />

      <input
        ref={inputRef}
        id={fieldName}
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />

      {error && (
        <Error>
          <AlertIcon />
          <span>{error}</span>
        </Error>
      )}
    </Container>
  );
};

export default Input;
