import { getDaysInMonth } from 'date-fns';
import React, { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SearchCategory } from '../interfaces/types';
import { theme } from '../styles/theme';

interface commonPropsType {
  setValue: SetStateAction<string>;
}

const YEARS_RANGE = [2021, 2022];
const MONTHS_RANGE = [1, 12];

const getArrayOfEveryIntegerBetween = (num1: number, num2: number) => {
  const high = Math.max(num1, num2);
  const low = Math.min(num1, num2);
  return new Array(high - low + 1).fill(null).map((_, index) => low + index);
};

export const TextInput = ({ placeholder, setValue }: commonPropsType & { placeholder: string }) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return <Input type="text" placeholder={placeholder} onChange={handleOnChange} />;
};

export const DateInput = ({ setValue }: commonPropsType) => {
  type SelectedDate = { year: string; month: string; day: string };
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({ year: '', month: '', day: '' });
  const [daysOfSelectedMonth, setDaysOfSelectedMonth] = useState<number[] | null>();

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.name === 'year') setSelectedDate({ year: event.target.value, month: '', day: '' });
    else if (event.target.name === 'month') setSelectedDate({ ...selectedDate, month: event.target.value, day: '' });
    else setSelectedDate({ ...selectedDate, [event.target.name]: event.target.value });
  };

  const convertToDottedFormat = (data: SelectedDate) => {
    if (!data.year) return;
    return `${data.year}.${data.month && data.month + '.'}${data.day}`;
  };

  const getDaysOfSelectedMonth = () => {
    const daysArray = getArrayOfEveryIntegerBetween(
      1,
      getDaysInMonth(new Date(Number(selectedDate.year), Number(selectedDate.month) - 1)),
    );
    setDaysOfSelectedMonth(daysArray);
  };

  useEffect(() => {
    if (selectedDate.year && selectedDate.month) getDaysOfSelectedMonth();
  }, [selectedDate.month]);

  useEffect(() => {
    if (selectedDate.year) setValue(convertToDottedFormat(selectedDate));
  }, [selectedDate]);

  return (
    <div>
      <select name="year" value={selectedDate.year || ''} onChange={handleOnChange}>
        {getArrayOfEveryIntegerBetween(YEARS_RANGE[0], YEARS_RANGE[1]).map((year, index) => (
          <option value={year} key={year}>
            {year}년
          </option>
        ))}
      </select>
      <select name="month" value={selectedDate.month || ''} onChange={handleOnChange}>
        <option value={''}>선택안함</option>
        {getArrayOfEveryIntegerBetween(MONTHS_RANGE[0], MONTHS_RANGE[1]).map((month, index) => (
          <option value={month} key={month}>
            {month}월
          </option>
        ))}
      </select>
      <select name="day" value={selectedDate.day || ''} onChange={handleOnChange}>
        <option value={''}>선택안함</option>
        {daysOfSelectedMonth?.map((day, index) => (
          <option value={day} key={day}>
            {day}일
          </option>
        ))}
      </select>
    </div>
  );
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
  name: (setValue: SetStateAction<string>) => <TextInput placeholder="이름 입력" setValue={setValue} />,
  date: (setValue: SetStateAction<string>) => <DateInput setValue={setValue} />,
  gender: (setValue: SetStateAction<string>) => (
    <RadioInput fieldSetName="gender" options={['남', '여']} setValue={setValue} />
  ),
  birth: (setValue: SetStateAction<string>) => <DateInput setValue={setValue} />,
  transportation: (setValue: SetStateAction<string>) => (
    <RadioInput
      fieldSetName="transportation"
      options={['자가용', '버스', '지하철', '택시', '자전거', 'KTX/기차', '전동킥보드', '도보']}
      setValue={setValue}
    />
  ),
  address: (setValue: SetStateAction<string>) => <TextInput placeholder="주소명(시 또는 구)" setValue={setValue} />,
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
