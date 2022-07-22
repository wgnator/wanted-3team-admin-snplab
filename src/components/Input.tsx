import { forwardRef, RefObject } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

export type RefWithNullType = RefObject<HTMLInputElement> | null | undefined;

export default forwardRef(function Input({ name, label, ...rest }: InputProps, ref) {
  return <InputElement id={label} name={name} {...rest} ref={ref as RefWithNullType} />;
});

const InputElement = styled.input`
  width: 100%;
  border: none;
  color: ${theme.fontDarkColor};
  font-size: 0.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${theme.borderLightColor};
  ::placeholder {
    color: ${theme.fontLightColor};
  }
  :focus {
    outline: none;
    border-bottom: solid 1px ${theme.borderOnFocusColor};
  }
`;
