import styled from 'styled-components';
import { theme } from '../styles/theme';
import Input from './Input';
import Label from './Label';

interface InputCheckboxProps {
  name: string;
  label: string;
  value: string;
}

export default function InputCheckbox({ label, name, value }: InputCheckboxProps) {
  return (
    <Container>
      <Wrapper>
        <Input type="checkbox" name={name} label={label} defaultValue={value} />
        <Label name={label} label={label} color={theme.fontLightColor} />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  /* width: 100%; */
`;
const Wrapper = styled.div`
  border: 1px solid ${theme.fontLightColor};
  color: 1px solid ${theme.fontLightColor};
  border-radius: 1rem;
  padding: 0.3rem 1rem;
  display: flex;
  align-items: center;
  width: fit-content;
`;
