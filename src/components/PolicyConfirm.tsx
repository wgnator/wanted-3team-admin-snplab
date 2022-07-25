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
        <Button onClick={closeModal}>
          <FiChevronLeft />
        </Button>
        <Title>서비스 이용약관</Title>
      </Navigation>
      <p dangerouslySetInnerHTML={{ __html: innerHtml }} />
    </Container>
  );
}

const Container = styled.div`
  p {
    padding: 1rem 1rem 0 1rem;
  }
`;
const Navigation = styled.div`
  display: flex;
  border-bottom: 1px solid ${theme.borderDarkColor};
  padding: 1rem 1rem;
  gap: 1rem;
`;
const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
`;
const Title = styled.div``;
