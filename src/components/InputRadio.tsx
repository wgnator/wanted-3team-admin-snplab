import { ReactNode } from 'react';
import styled from 'styled-components';
import Label from './Label';

interface InputRadioProps {
  name: string;
  label: string;
  children: ReactNode;
}

export default function InputRadio({ label, name, children }: InputRadioProps) {
  return (
    <Container>
      <Wrapper>
        {children}
        <Label name={label} label={label} />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 0.5rem;
`;
