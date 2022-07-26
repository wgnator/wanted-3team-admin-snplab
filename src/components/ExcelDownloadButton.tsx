import styled from 'styled-components';
import { Applicant } from '../interfaces/types';
import { theme } from '../styles/theme';
import { exportToCsv } from '../utils/exportToCsv';

export default function ExcelDownloadButton({ data }: { data: Applicant[] }) {
  return <Button onClick={() => exportToCsv(data)}>엑셀 다운로드</Button>;
}

const Button = styled.button`
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
