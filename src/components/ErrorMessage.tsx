import styled from 'styled-components';

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return <Span>{message}</Span>;
}

export default ErrorMessage;

const Span = styled.span`
  position: absolute;
  top: 0;
  right: 2rem;
  font-size: 0.8rem;
  font-weight: 400;
  color: tomato;
`;
