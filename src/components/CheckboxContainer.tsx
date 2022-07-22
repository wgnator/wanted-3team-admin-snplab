import { ReactNode } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

interface CheckboxContainerProps {
  wholeController: ReactNode;
  checkboxes: ReactNode;
}
export default function CheckboxContainer({ wholeController, checkboxes }: CheckboxContainerProps) {
  return (
    <Container>
      <WholeController>{wholeController}</WholeController>
      <Checkboxes>{checkboxes}</Checkboxes>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const WholeController = styled.div`
  border-bottom: 1px solid ${theme.borderDarkColor};
  padding-bottom: 0.5rem;
`;
const Checkboxes = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
