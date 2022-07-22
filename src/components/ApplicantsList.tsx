import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Applicant } from '../interfaces/types';

export default function ApplicantsList() {
  const [data, setData] = useState<Applicant[]>([]);
  const [currentLists, setCurrentLists] = useState<Applicant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const listsPerPage = 5;

  const handleCheckboxClick = (id: number) => {
    const newData = data.map((applicant) => {
      if (applicant.id == id) {
        return { ...applicant, accepted: !applicant['accepted'] };
      } else return applicant;
    });
    setData(newData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('../../database.json');
      const obj = await data.json();
      setData(obj.register);
      console.log('데이터요청 함수 실행');
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getCurrentLists = async (data: Array) => {
      const indexOfLast = currentPage * listsPerPage;
      const indexOfFirst = indexOfLast - listsPerPage;
      const currentLists = await data.slice(indexOfFirst, indexOfLast);
      setCurrentLists(currentLists);
    };
    getCurrentLists(data);
  }, [currentPage, data]);

  return (
    <>
      <table>
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
          {currentLists.map((applicant: Applicant, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
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
      </table>
      <div>currentpage : {currentPage}</div>
      <div>listsPerPage : {listsPerPage}</div>
      <Pagination>
        <button>&lt;</button>
        <ol>
          {[1, 2, 3, 4, 5].map((el) => (
            <li key={el}>
              <button
                onClick={(e) => {
                  setCurrentPage(Number(e.target.textContent));
                }}
              >
                {el}
              </button>
            </li>
          ))}
        </ol>
        <button>&gt;</button>
      </Pagination>
    </>
  );
}

const Pagination = styled.nav`
  display: flex;
  ol {
    display: flex;
  }
`;
