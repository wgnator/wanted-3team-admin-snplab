import { Applicant } from '../interfaces/types';

const initialData = [
  {
    round: 1,
    id: 1,
    date: '2022.07.21',
    name: '정윤서',
    birth: '1998.01.10',
    contact: '010-5897-8991',
    email: 'jys1391@gmail.com',
    transportation: '자가용',
    address: '청주시 청원구',
    accepted: true,
  },
  {
    round: 1,
    id: 2,
    date: '2022.07.21',
    name: '홍길동',
    birth: '1998.08.21',
    contact: '010-7897-8531',
    email: 'gildong@gmail.com',
    transportation: '버스',
    address: '서울시 상당구',
    accepted: false,
  },
  {
    round: 1,
    id: 5,
    date: '2022.07.21',
    name: '홍길동',
    birth: '1998.08.21',
    contact: '010-7897-8531',
    email: 'gildong@gmail.com',
    transportation: '버스',
    address: '청주시 상당구',
    accepted: false,
  },
  {
    round: 1,
    id: 6,
    date: '2022-05-11',
    name: '장발장',
    birth: '1987.08.21',
    contact: '010-7897-8531',
    email: 'baljang@gmail.com',
    transportation: '버스',
    address: '서울시 강남구',
    accepted: true,
  },
  {
    round: 1,
    id: 7,
    date: '2022-05-11',
    name: '김석',
    birth: '1981.12.25',
    contact: '010-7897-8531',
    email: 'baljang@gmail.com',
    transportation: '버스',
    address: '대전광역시',
    accepted: true,
  },
];

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

// export const exportToCsv = (data: Applicant[]) => {
export const exportToCsv = (data = initialData) => {
  const headers = ['round, date, name, birth, contact, email, transportation, address, accepted'];

  const applicantsInformation = data.reduce((acc: string[], applicant: any) => {
    const { round, date, name, birth, contact, email, transportation, address, accepted } = applicant;
    acc.push([round, date, name, birth, contact, email, transportation, address, accepted].join(','));
    return acc;
  }, []);

  const convertedData = [...headers, ...applicantsInformation].join('\n');

  downloadFile({
    data: convertedData,
    fileName: 'applicants.csv',
    fileType: 'text/csv;charset=utf-8',
  });
};
