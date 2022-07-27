import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const modalHeights = {
  '100%': '100%',
  '50%': '50%',
} as const;
export const modalPositions = {
  bottom: 'bottom',
  center: 'center',
} as const;

type ModalHeights = keyof typeof modalHeights;
type ModalContentPosition = keyof typeof modalPositions;

interface ModalProps {
  children: ReactNode;
  contentPosition: ModalContentPosition;
  height: ModalHeights;
  goWhenClosing: string;
}

export default function Modal({ children, contentPosition, height = modalHeights['100%'], goWhenClosing }: ModalProps) {
  const navigate = useNavigate();
  const closeModal = () => navigate(goWhenClosing, { state: '' });

  return (
    <Container>
      <Background onClick={closeModal} />
      <Contents height={height} position={contentPosition}>
        {children}
      </Contents>
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
const Contents = styled.div<{ height: ModalHeights; position: ModalContentPosition }>`
  position: absolute;
  top: ${(props) => (props.position === 'center' ? '50%' : '')};
  translate: ${(props) => (props.position === 'center' ? '0 -50%' : '')};
  bottom: ${(props) => (props.position === 'bottom' ? 0 : '')};
  max-height: ${(props) => props.height};
  max-width: 400px;
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: ${(props) => (props.position === 'center' ? 'center' : '')};
`;
