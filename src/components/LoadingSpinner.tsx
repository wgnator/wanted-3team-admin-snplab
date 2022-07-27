import styled, { keyframes } from 'styled-components';

export default function LoadingSpinner() {
  return (
    <Container>
      <div className="loading-spinner"></div>
    </Container>
  );
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  opacity: 0.4;
  position: absolute;
  top: 0;
  left: 0;
  .loading-spinner {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 4px solid gray;
    border-top: 4px solid white;
    animation: ${spin} 1s linear infinite;
  }
`;
