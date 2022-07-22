import React, { SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { SearchCategory } from '../interfaces/types';
import { theme } from '../styles/theme';

interface commonPropsType {
  setValue: SetStateAction<string>;
}

export const TextInput = ({ placeholder, setValue }: commonPropsType & { placeholder: string }) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return <Input type="text" placeholder={placeholder} onChange={handleOnChange} />;
};

export const DateInput = ({ setValue }: commonPropsType) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value.replaceAll('-', '.'));
  };
  return <Input type="date" onChange={handleOnChange} />;
};

export const RadioInput = ({
  fieldSetName,
  options,
  setValue,
}: commonPropsType & { fieldSetName: string; options: string[] }) => {
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Radios onChange={handleValueChange}>
      {options.reduce<JSX.Element[]>(
        (array, option) => [
          ...array,
          <Radio name={fieldSetName} id={option} value={option} />,
          <Label htmlFor={option}>{option}</Label>,
        ],
        [],
      )}
    </Radios>
  );
};

export const getInputComponent = (fieldToSearch: SearchCategory, setValue: SetStateAction<string>) => {
  return InputComponents[fieldToSearch](setValue);
};

const InputComponents = {
  name: (setValue: SetStateAction<string>) => TextInput({ placeholder: '이름 입력', setValue: setValue }),
  date: (setValue: SetStateAction<string>) => DateInput({ setValue: setValue }),
  gender: (setValue: SetStateAction<string>) =>
    RadioInput({ fieldSetName: 'gender', options: ['남', '여'], setValue: setValue }),
  birth: (setValue: SetStateAction<string>) => DateInput({ setValue: setValue }),
  transportation: (setValue: SetStateAction<string>) =>
    RadioInput({
      fieldSetName: 'transportation',
      options: ['자가용', '버스', '지하철', '택시', '자전거', 'KTX/기차', '전동킥보드', '도보'],
      setValue: setValue,
    }),
  address: (setValue: SetStateAction<string>) => TextInput({ placeholder: '주소명(시 또는 구)', setValue: setValue }),
};

const Input = styled.input`
  border: none;
  outline: none;
`;

const Radios = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
const Radio = styled.input.attrs((props) => ({ type: 'radio' }))`
  opacity: 0;
  width: 0px;
  &:checked + label {
    background-color: ${theme.buttonDarkColor};
    color: white;
    border-color: ${theme.buttonDarkColor};
  }
`;
const Label = styled.label`
  color: ${theme.fontMediumColor};
  border: 1.3px solid ${theme.fontMediumColor};
  padding: 0.2rem;
  border-radius: 12px;
  font-size: 0.7rem;
`;
