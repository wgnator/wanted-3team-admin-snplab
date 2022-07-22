import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface ModalProps {
  children: ReactNode;
  height: '100%' | '50%';
}

export default function Modal({ children, height = '100%' }: ModalProps) {
  const navigate = useNavigate();
  const closeModal = () => navigate('', { state: '' });

  return (
    <Container>
      <Background onClick={closeModal} />
      <Contents height={height}>{children}</Contents>
    </Container>
  );
}
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #00000077;
`;
const Contents = styled.div<{ height: '100%' | '50%' }>`
  position: absolute;
  max-height: ${(props) => props.height};
  max-width: 450px;
  background-color: white;
  overflow-y: scroll;
`;
