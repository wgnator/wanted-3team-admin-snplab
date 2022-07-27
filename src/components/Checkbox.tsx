import { forwardRef, MouseEvent } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import CheckboxInput from './CheckboxInput';
import ErrorMessage from './ErrorMessage';
import Label from './Label';

type EventFunction = (event: MouseEvent<HTMLDivElement>) => void;
type VoidFunction = () => void;

interface CheckboxProps {
  name: string;
  label: string;
  isValid?: boolean;
  preventBubbling?: boolean;
  errorMessage?: string;
  hasBorder?: boolean;
  onClickWrapper?: EventFunction;
  changeInput?: VoidFunction;
  changePage?: VoidFunction;
}

export default forwardRef(function Checkbox(
  {
    name,
    label,
    preventBubbling,
    isValid,
    errorMessage,
    hasBorder = false,
    onClickWrapper,
    changeInput,
    changePage,
  }: CheckboxProps,
  ref,
) {
  return (
    <Container onClick={onClickWrapper}>
      {!isValid && errorMessage && <ErrorMessage message={errorMessage} />}
      <CheckboxInput
        type={'checkbox'}
        name={name}
        label={name}
        value={name}
        ref={ref}
        onChange={changeInput}
        hasBorder={hasBorder}
        hasMouseEvent={!preventBubbling}
      />
      <Label label={label} name={name} />

      {changePage && (
        <CheckButton type="button" isActivate={true}>
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
