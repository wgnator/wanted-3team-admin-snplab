import { Applicant } from '../interfaces/types';

interface DownloadFile {
  data: string;
  fileName: string;
  fileType: 'text/csv;charset=utf-8';
}

const downloadFile = ({ data, fileName, fileType }: DownloadFile) => {
  const BOM = '\uFEFF';

  const blob = new Blob([BOM + data], { type: fileType });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');

  a.href = url;
  a.download = fileName;

  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

// export const exportToCsv = <T>(data: T[], fileName: string = 'download') => {
export const exportToCsv = (applicants: Applicant[], fileName: string = 'download') => {
  if (!applicants.length) {
    alert('다운로드할 데이터가 없습니다!');
  }
  //속도
  const headers = ['round, date, name, birth, contact, email, transportation, address, accepted'];

  // 범용성
  // const headers = [String(Object.keys(data[0]))];

  const contents = applicants.reduce((acc: string[], content: Applicant) => {
    // 속도
    const { round, date, name, birth, contact, email, transportation, address, accepted } = content;
    acc.push([round, date, name, birth, contact, email, transportation, address, accepted].join(','));

    // 범용성
    // acc.push(Object.values(content).join(','));
    return acc;
  }, []);

  const convertedData = [...headers, ...contents].join('\n');

  downloadFile({
    data: convertedData,
    fileName,
    fileType: 'text/csv;charset=utf-8',
  });
};
