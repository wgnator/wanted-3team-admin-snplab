import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';
import Label from './Label';

type DirectionType = 'row' | 'column';
interface InputContainerProps {
  children: React.ReactNode;
  name: string;
  label: string;
  subLabel?: string;
  isValid?: boolean;
  errorMessage?: string;
  direction?: DirectionType;
}

export default function InputContainerAbst({
  children,
  isValid,
  errorMessage = '',
  name,
  label,
  subLabel,
  direction = 'column',
}: InputContainerProps) {
  return (
    <Container direction={direction}>
      {!isValid && <ErrorMessage message={errorMessage} />}
      <Label name={name} label={label} subLabel={subLabel} />
      {children}
    </Container>
  );
}

const Container = styled.div<{ direction: DirectionType }>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: 1rem;
  align-items: center;
`;
