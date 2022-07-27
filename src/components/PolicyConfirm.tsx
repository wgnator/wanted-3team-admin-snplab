import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';

interface PolicyConfirmProps {
  innerHtml: string;
}

export default function PolicyConfirm({ innerHtml }: PolicyConfirmProps) {
  const navigate = useNavigate();
  const closeModal = () => navigate('', { state: null });
  return (
    <Container>
      <Navigation>
        <CloseButton onClick={closeModal}>
          <FiChevronLeft />
        </CloseButton>
        <Title>서비스 이용약관</Title>
      </Navigation>
      <p dangerouslySetInnerHTML={{ __html: innerHtml }} />
    </Container>
  );
}

const Container = styled.div`
  overflow-y: scroll;
  background-color: white;
  p {
    padding: 1rem 1rem 0 1rem;
  }
`;
export const Navigation = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.borderDarkColor};
  padding: 1rem 1rem;
  gap: 1rem;
`;
export const CloseButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
`;
const Title = styled.div``;
