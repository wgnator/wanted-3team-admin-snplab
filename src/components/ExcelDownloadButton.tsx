import styled from 'styled-components';
import { theme } from '../styles/theme';

export default function ExcelDownloadButton() {
  return <Container>엑셀 다운로드</Container>;
}

const Container = styled.button`
  background-color: ${theme.backgroundDarkColor};
  color: ${theme.fontDarkColor};
  font-weight: bold;
  border-radius: 10px;
  width: 7rem;
  height: 2rem;
  font-size: 0.8rem;
  border: none;
  position: relative;
  right: 0;
`;
