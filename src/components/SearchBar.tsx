import React, { FunctionComponentElement, SetStateAction, useEffect, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { GoTriangleDown } from 'react-icons/go';
import styled from 'styled-components';
import { searchQueryType } from '../interfaces/types';
import { theme } from '../styles/theme';
import { getInputComponent } from './SearchBarInputComponents';

type SearchBarProps = {
  setQuery: (value: searchQueryType) => void;
};

export default function SearchBar({ setQuery }: SearchBarProps) {
  const [fieldToSearch, setFieldToSearch] = useState('name');
  const [inputValue, setInputValue] = useState('');
  const [inputComponent, setInputComponent] =
    useState<FunctionComponentElement<{ setValue: SetStateAction<string> }>>();
  const formRef = useRef<HTMLFormElement>(null);

  const handleFieldToSearchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const temp = event.target.value;
    formRef.current?.reset();
    setFieldToSearch(temp);
  };

  const submit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue) setQuery({ category: fieldToSearch, searchString: inputValue });
    else alertUser();
    setInputValue('');
    formRef.current?.reset();
  };

  const alertUser = () => {
    window.alert('입력이 잘못됐습니다.');
  };

  useEffect(() => {
    setInputComponent(getInputComponent(fieldToSearch, setInputValue));
    setInputValue('');
    console.log(inputValue);
  }, [fieldToSearch]);

  return (
    <form ref={formRef} onSubmit={submit}>
      <Box
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <FieldToSearchPicker value={fieldToSearch} onChange={handleFieldToSearchChange}>
          <option value="name">지원자명</option>
          <option value="date">지원날짜</option>
          <option value="gender">성별</option>
          <option value="birth">생년월일</option>
          <option value="transportation">이용수단</option>
          <option value="address">거주지</option>
        </FieldToSearchPicker>
        <GoTriangleDown style={{ position: 'relative', left: '-1rem', fontSize: '0.6rem' }} />
        <InputWrapper>{inputComponent}</InputWrapper>

        <SubmitButton>
          <BiSearch style={{ color: theme.borderLightColor }} />
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
