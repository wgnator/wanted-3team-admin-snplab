import styled from 'styled-components';
import { CloseButton } from './PolicyConfirm';
interface AlertApplyProps {
  callback: () => void;
}

export default function AlertApply({ callback }: AlertApplyProps) {
  return (
    <Container>
      <Message>지원이 완료되었습니다</Message>
      <Button type="button" onClick={callback}>
        확인
      </Button>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  background-color: white;
  display: flex;
  border-radius: 1rem;
  width: 90%;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: 1.5rem;
  gap: 1rem;
`;
const Message = styled.p`
  font-weight: 800;
`;
const Button = styled(CloseButton)`
  text-align: right;
  color: tomato;
  font-size: 0.9rem;
`;
