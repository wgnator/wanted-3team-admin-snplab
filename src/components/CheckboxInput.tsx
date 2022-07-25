import { forwardRef } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { RefWithNullType } from './Input';

interface CheckboxInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  hasBorder?: boolean;
}

export default forwardRef(function CheckboxInput({ name, label, hasBorder = false, ...rest }: CheckboxInputProps, ref) {
  return <InputElement id={label} name={name} {...rest} ref={ref as RefWithNullType} hasBorder={hasBorder} />;
});

const InputElement = styled.input<{ hasBorder: boolean }>`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: ${(props) => (props.hasBorder ? `1.3px solid ${theme.borderLightColor}` : 'none')};
  border-radius: 100%;
  color: ${theme.fontDarkColor};
  font-size: 0.8rem;
  padding-bottom: 0.5rem;
  aspect-ratio: 1;
  outline: none;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='rgb(245, 245, 245)' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");

  ::placeholder {
    color: ${theme.fontLightColor};
  }

  &:checked {
    ${(props) =>
      props.hasBorder
        ? `background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='rgb(255, 255, 255)' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e")};
        background-color:${theme.buttonDarkColor};
        border-color:${theme.buttonDarkColor}`
        : `background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='rgb(75, 75, 75)' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e")}`}
  }
`;
