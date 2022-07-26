import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Applicant } from '../interfaces/types';
import { theme } from '../styles/theme';

export default function ApplicantsList({ data, updateApplicantData }: ApplicantsListProps) {
  const [arrayOfFilteredData, setArrayOfFilteredData] = useState<Applicant[][]>([]);

  //listsOfCurrentTab csv 다운로드!!
  const [listsOfCurrentTab, setListsOfCurrentTab] = useState<Applicant[]>([]);
  const [numOfCurrentTab, setNumOfCurrentTab] = useState<number>(1);

  const [listsOfCurrentPage, setListsOfCurrentPage] = useState<Applicant[]>([]);
  const [numOfCurrentPage, setNumOfCurrentPage] = useState<number>(1);

  const [numOfPages, setNumOfPages] = useState<number>(0);
  const [numOfStartBtn, setNumOfStartBtn] = useState<number>(1);
  const listsPerPage = 17;

  const handleTabClick = (numOfTab: number) => {
    setNumOfCurrentTab(numOfTab);
    setListsOfCurrentTab(arrayOfFilteredData[numOfTab - 1]);
    setNumOfCurrentPage(1);
    setNumOfStartBtn(1);
  };

  const handleCheckboxClick = (id: number, accepted: boolean) => {
    const newListsOfCurrentTab = listsOfCurrentTab.map((applicant) =>
      applicant.id === id ? { ...applicant, accepted: !applicant['accepted'] } : applicant,
    );
    setListsOfCurrentTab(newListsOfCurrentTab);
    arrayOfFilteredData[numOfCurrentTab - 1] = newListsOfCurrentTab;
    setArrayOfFilteredData(arrayOfFilteredData);

    updateApplicantData(id, !accepted);
  };

  const getlistsOfCurrentPage = (data: Applicant[]) => {
    const indexOfLast = numOfCurrentPage * listsPerPage;
    const indexOfFirst = indexOfLast - listsPerPage;
    const listsOfCurrentPage = data?.slice(indexOfFirst, indexOfLast);
    setListsOfCurrentPage(listsOfCurrentPage);
  };

  useEffect(() => {
    let round = 1;
    let total = data;
    let initialFilteredArray = [];
    while (total?.length > 0) {
      const filtered = total
        .filter((applicant: Applicant) => applicant.round === round)
        .map((applicant: Applicant, index: number) => {
          return { ...applicant, order: index + 1 };
        });
      total = total.filter((applicant: Applicant) => applicant.round !== round);
      initialFilteredArray.push(filtered);
      setArrayOfFilteredData(initialFilteredArray);
      round++;
    }
  }, [data]);

  useEffect(() => {
    setListsOfCurrentTab(arrayOfFilteredData[numOfCurrentTab - 1]);
  }, [arrayOfFilteredData]);

  useEffect(() => {
    getlistsOfCurrentPage(listsOfCurrentTab);
    setNumOfPages(Math.ceil(listsOfCurrentTab?.length / listsPerPage));
  }, [numOfCurrentPage, listsOfCurrentTab]);

  return (
    <Container>
      <Tabs>
        {arrayOfFilteredData.map(
          (filteredData, index) =>
            filteredData.length > 0 && (
              <Tab
                key={index + 1}
                data-key={index + 1}
                className={numOfCurrentTab === index + 1 ? 'selected' : ''}
                onClick={(e) => handleTabClick(Number(e.target.dataset.key))}
              >
                {index + 1}차 모집
              </Tab>
            ),
        )}
      </Tabs>
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
          </tr>
        </thead>
        <tbody>
          {listsOfCurrentPage?.map((applicant: Applicant, index: number) => (
            <tr key={applicant.id}>
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
                  onChange={() => handleCheckboxClick(applicant.id, applicant.accepted)}
                />
              </td>
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

const Tabs = styled.ul`
  display: flex;
  justify-content: space-around;
`;

const Tab = styled.li`
  display: inline-block;
  width: 100%;
  height: 3rem;
  text-align: center;
  line-height: 3rem;
  font-weight: 600;
  background-color: ${theme.backgroundLightColor};
  color: ${theme.fontLightColor};
  cursor: pointer;
  &.selected {
    background-color: ${theme.backgroundMediumColor};
    color: ${theme.fontDarkColor};
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
