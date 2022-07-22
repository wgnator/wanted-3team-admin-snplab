import { forwardRef, MouseEvent } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import CheckboxInput from './CheckboxInput';
import ErrorMessage from './ErrorMessage';
import Label from './Label';

interface CheckboxProps {
  name: string;
  label: string;
  isValid?: boolean;
  errorMessage?: string;
  onClickWrapper?: (event: MouseEvent<HTMLDivElement>) => void;
  changeInput?: () => void;
  changePage?: () => void;
}

export default forwardRef(function Checkbox(
  { name, label, isValid, errorMessage, onClickWrapper, changeInput, changePage }: CheckboxProps,
  ref,
) {
  return (
    <Container onClick={onClickWrapper}>
      {!isValid && errorMessage && <ErrorMessage message={errorMessage} />}
      <CheckboxInput type={'checkbox'} name={name} label={name} value={name} ref={ref} onChange={changeInput} />
      <Label label={label} name={name} />

      {changePage && (
        <CheckButton isActivate={true}>
          <BiChevronRight onClick={changePage} />
        </CheckButton>
      )}
    </Container>
  );
});

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const CheckButton = styled.button<{ isActivate: boolean }>`
  display: flex;
  gap: 1rem;
  align-items: center;
  color: ${(props) => (props.isActivate ? '' : theme.fontLightColor)};
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
