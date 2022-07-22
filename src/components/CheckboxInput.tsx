import { forwardRef, RefObject } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { RefWithNullType } from './Input';

interface CheckboxInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

export default forwardRef(function CheckboxInput({ name, label, ...rest }: CheckboxInputProps, ref) {
  return <InputElement id={label} name={name} {...rest} ref={ref as RefWithNullType} />;
});

const InputElement = styled.input`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 1.5px solid ${theme.borderLightColor};
  border-radius: 100%;
  color: ${theme.fontDarkColor};
  font-size: 0.8rem;
  padding-bottom: 0.5rem;
  aspect-ratio: 1;
  outline: none;
  ::placeholder {
    color: ${theme.fontLightColor};
  }
  &:checked {
    border: solid 1px ${theme.borderOnFocusColor};
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='rgb(75, 75, 75)' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  }
`;
