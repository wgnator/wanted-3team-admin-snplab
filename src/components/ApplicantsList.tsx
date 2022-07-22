import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Applicant } from '../interfaces/types';
import { theme } from '../styles/theme';
import { dataExample } from './dataExample';

export default function ApplicantsList() {
  const [data, setData] = useState<Applicant[]>([]);
  const [listsOfCurrentPage, setListsOfCurrentPage] = useState<Applicant[]>([]);
  const [numOfCurrentPage, setNumOfCurrentPage] = useState<number>(1);
  const [numOfPages, setNumOfPages] = useState<number>(0);
  const [numOfStartBtn, setNumOfStartBtn] = useState<number>(1);
  const listsPerPage = 20;

  const handleCheckboxClick = (id: number) => {
    const newData = data.map((applicant) => {
      if (applicant.id == id) {
        return { ...applicant, accepted: !applicant['accepted'] };
      } else return applicant;
    });
    setData(newData);
  };

  const getlistsOfCurrentPage = (data: Applicant[]) => {
    const indexOfLast = numOfCurrentPage * listsPerPage;
    const indexOfFirst = indexOfLast - listsPerPage;
    const listsOfCurrentPage = data.slice(indexOfFirst, indexOfLast);
    setListsOfCurrentPage(listsOfCurrentPage);
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   const data = await fetch('../../database.json');
    //   const obj = await data.json();
    //   const register = obj.register.map((applicant: Applicant, index: number) => {
    //     return { ...applicant, order: index + 1 };
    //   });
    //   setData(register);
    //   setNumOfPages(Math.ceil(obj.register.length / listsPerPage));
    // };
    // fetchData();
    const register = dataExample.map((applicant: Applicant, index: number) => {
      return { ...applicant, order: index + 1 };
    });
    setData(register);
    setNumOfPages(Math.ceil(dataExample.length / listsPerPage));
  }, []);

  useEffect(() => {
    getlistsOfCurrentPage(data);
  }, [numOfCurrentPage, data]);

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Num.</th>
            <th>지원날짜</th>
            <th>지원자명</th>
            <th>성별</th>
            <th>생년월일</th>
            <th>연락처</th>
            <th>이메일</th>
            <th>이용수단</th>
            <th>거주지</th>
            <th>당첨여부</th>
            <th>지원회차</th>
          </tr>
        </thead>
        <tbody>
          {listsOfCurrentPage.map((applicant: Applicant, index: number) => (
            <tr key={index}>
              <td>{applicant.order}</td>
              <td>{applicant.date}</td>
              <td>{applicant.name}</td>
              <td>{applicant.gender}</td>
              <td>{applicant.birth}</td>
              <td>{applicant.contact}</td>
              <td>{applicant.email}</td>
              <td>{applicant.transportation}</td>
              <td>{applicant.address}</td>
              <td>
                <input
                  type="checkbox"
                  checked={applicant.accepted}
                  onChange={() => handleCheckboxClick(applicant.id)}
                />
              </td>
              <td>{`${applicant.round}차`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Arrow onClick={() => setNumOfStartBtn((prev) => prev - 5)} disabled={numOfStartBtn > 1 ? false : true}>
          &lt;
        </Arrow>
        <ol>
          {new Array(5).fill('').map((_, index) => (
            <li key={numOfStartBtn + index}>
              {numOfStartBtn + index <= numOfPages && (
                <Button
                  onClick={(e) => {
                    setNumOfCurrentPage(Number(e.target.textContent));
                  }}
                  color={numOfCurrentPage === numOfStartBtn + index ? theme.borderOnFocusColor : theme.borderDarkColor}
                >
                  {numOfStartBtn + index}
                </Button>
              )}
            </li>
          ))}
        </ol>
        <Arrow
          onClick={() => setNumOfStartBtn((prev) => prev + 5)}
          disabled={numOfStartBtn + 4 >= numOfPages ? true : false}
        >
          &gt;
        </Arrow>
      </Pagination>
    </Container>
  );
}

const Container = styled.div`
  width: 95%;
  padding-bottom: 16px;
  background-color: ${theme.backgroundMediumColor};
`;

const Table = styled.table`
  width: 100%;
  margin-bottom: 16px;
  text-align: center;
  th,
  td {
    padding: 4px;
  }
`;

const Pagination = styled.nav`
  display: flex;
  justify-content: center;
  ol {
    display: flex;
  }
`;

const Button = styled.button`
  margin: 4px;
  padding: 2px 0;
  width: 24px;
  border-radius: 4px;
  color: ${(props) => props.color};
  background-color: white;
  border: 1px solid ${(props) => props.color};
  cursor: pointer;
`;

const Arrow = styled.button`
  margin: 4px;
  padding: 2px 0;
  width: 24px;
  border-radius: 4px;
  color: ${(props) => (props.disabled ? theme.borderLightColor : theme.borderDarkColor)};
  background-color: white;
  border: 1px solid ${(props) => (props.disabled ? theme.borderLightColor : theme.borderDarkColor)};
  cursor: pointer;
`;
