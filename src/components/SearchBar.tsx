import React, { FunctionComponentElement, SetStateAction, useEffect, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { GoTriangleDown } from 'react-icons/go';
import styled from 'styled-components';
import { SearchCategory, SearchQueryType } from '../interfaces/types';
import { theme } from '../styles/theme';
import { convertToDottedFormat } from '../utils/utils';
import { DateInput, RadioInput, TextInput, CheckboxInput } from './SearchBarInputComponents';

type SearchBarProps = {
  setQuery: (value: SearchQueryType) => void;
};

export default function SearchBar({ setQuery }: SearchBarProps) {
  const [fieldToSearch, setFieldToSearch] = useState<SearchCategory>(SearchCategory.NAME);
  const [inputValue, setInputValue] = useState<string>('');

  const handleFieldToSearchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFieldToSearch(event.target.value as SearchCategory);
  };

  const submit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const processedValue = processInputValue(inputValue);
    if (inputValue) setQuery({ category: fieldToSearch, searchString: processedValue });
    else alertUser();
    setInputValue('');
  };

  const processInputValue = (inputValue: any) => {
    if (fieldToSearch === 'name') return inputValue;
    if (fieldToSearch === 'date') return convertToDottedFormat(inputValue);
    if (fieldToSearch === 'gender') return inputValue;
    if (fieldToSearch === 'birth') return convertToDottedFormat(inputValue);
    if (fieldToSearch === 'transportation')
      return inputValue.filter((state) => state.checked === true).map((checkboxState) => checkboxState.value);
    if (fieldToSearch === 'address') return inputValue;
  };

  const alertUser = () => {
    window.alert('입력이 잘못됐습니다.');
  };

  useEffect(() => {
    setInputValue('');
  }, [fieldToSearch]);

  return (
    <form onSubmit={submit}>
      <Box
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <FieldToSearchPicker value={fieldToSearch} onChange={handleFieldToSearchChange}>
          <option value={SearchCategory.NAME}>지원자명</option>
          <option value={SearchCategory.DATE}>지원날짜</option>
          <option value={SearchCategory.GENDER}>성별</option>
          <option value={SearchCategory.BIRTH}>생년월일</option>
          <option value={SearchCategory.TRANSPORTATION}>이용수단</option>
          <option value={SearchCategory.ADDRESS}>거주지</option>
        </FieldToSearchPicker>
        <GoTriangleDown style={{ position: 'relative', left: '-1rem', fontSize: '0.6rem' }} />
        <InputWrapper>
          {(() => {
            switch (fieldToSearch) {
              case 'name':
                return <TextInput placeholder="이름 입력" setValue={setInputValue} value={inputValue} />;
              case 'date':
                return <DateInput yearsRange={[2021, 2022]} setValue={setInputValue} value={inputValue} />;
              case 'gender':
                return (
                  <RadioInput
                    fieldSetName="gender"
                    options={['남', '여']}
                    setValue={setInputValue}
                    value={inputValue}
                  />
                );
              case 'birth':
                return <DateInput yearsRange={[1922, 2022]} setValue={setInputValue} value={inputValue} />;
              case 'transportation':
                return (
                  <CheckboxInput
                    fieldSetName="transportation"
                    options={['자가용', '버스', '지하철', '택시', '자전거', 'KTX/기차', '전동킥보드', '도보']}
                    setValue={setInputValue}
                    value={inputValue}
                  />
                );
              case 'address':
                return <TextInput placeholder="주소명(시 또는 구)" setValue={setInputValue} value={inputValue} />;
            }
          })()}
        </InputWrapper>

        <SubmitButton>
          <BiSearch style={{ color: theme.borderDarkColor }} />
        </SubmitButton>
      </Box>
    </form>
  );
}

const Box = styled.div`
  width: fit-content;
  min-width: 15rem;
  max-width: 40rem;
  height: 2rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: left;
  border: ${theme.borderLightColor} 1px solid;
  &:focus-within {
    border: ${theme.borderOnFocusColor} 1px solid;
  }
  transition: all 1s;
`;

const FieldToSearchPicker = styled.select`
  z-index: 1;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  border-right: 1px solid ${theme.borderDarkColor};
  padding-left: 0.625rem;
  width: 4.5rem;
  font-size: 0.7rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  position: relative;
  outline: none;
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  height: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
`;

const SubmitButton = styled.button`
  flex: none;
  margin-left: auto;
  background-color: inherit;
  border: none;
  display: flex;
  align-items: center;
`;
