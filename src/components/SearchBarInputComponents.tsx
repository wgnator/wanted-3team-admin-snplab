import { getDaysInMonth } from 'date-fns';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { getArrayOfEveryIntegerBetween } from '../utils/utils';

interface CommonPropsTypeForInput {
  setValue: SetStateAction<string>;
}

const MONTHS_RANGE = [1, 12];

export const TextInput = ({ placeholder, setValue }: CommonPropsTypeForInput & { placeholder: string }) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return <Input type="text" placeholder={placeholder} onChange={handleOnChange} />;
};

export const DateInput = ({ yearsRange, setValue }: CommonPropsTypeForInput & { yearsRange: number[] }) => {
  type SelectedDate = { year: string; month: string; day: string };
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    year: yearsRange[yearsRange.length - 1].toString(),
    month: '',
    day: '',
  });
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
      'asc',
    );
    setDaysOfSelectedMonth(daysArray);
  };

  useEffect(() => {
    if (selectedDate.year && selectedDate.month) getDaysOfSelectedMonth();
    else setDaysOfSelectedMonth(null);
  }, [selectedDate.year, selectedDate.month]);

  useEffect(() => {
    if (selectedDate.year) setValue(convertToDottedFormat(selectedDate));
  }, [selectedDate]);

  return (
    <SelectWrapper>
      <Select name="year" value={selectedDate.year || ''} onChange={handleOnChange}>
        {getArrayOfEveryIntegerBetween(yearsRange[0], yearsRange[1], 'desc').map((year, index) => (
          <option value={year} key={year}>
            {year}년
          </option>
        ))}
      </Select>
      <Select name="month" value={selectedDate.month || ''} onChange={handleOnChange}>
        <option value={''}>선택안함</option>
        {getArrayOfEveryIntegerBetween(MONTHS_RANGE[0], MONTHS_RANGE[1], 'asc').map((month, index) => (
          <option value={month} key={month}>
            {month}월
          </option>
        ))}
      </Select>
      <Select name="day" value={selectedDate.day || ''} onChange={handleOnChange}>
        <option value={''}>선택안함</option>
        {daysOfSelectedMonth?.map((day, index) => (
          <option value={day} key={day}>
            {day}일
          </option>
        ))}
      </Select>
    </SelectWrapper>
  );
};

export const RadioInput = ({
  fieldSetName,
  options,
  setValue,
}: CommonPropsTypeForInput & { fieldSetName: string; options: string[] }) => {
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <RadiosWrapper onChange={handleValueChange}>
      {options.reduce<JSX.Element[]>(
        (array, option, index) => [
          ...array,
          <Radio key={option} name={fieldSetName} id={option} value={option} />,
          <Label key={option + 'label'} htmlFor={option}>
            {option}
          </Label>,
        ],
        [],
      )}
    </RadiosWrapper>
  );
};

type InputComponentSelectorTypes = keyof typeof InputComponentSelector;

const InputComponentSelector = {
  name: (setValue: SetStateAction<string>) => <TextInput placeholder="이름 입력" setValue={setValue} />,
  date: (setValue: SetStateAction<string>) => <DateInput yearsRange={[2021, 2022]} setValue={setValue} />,
  gender: (setValue: SetStateAction<string>) => (
    <RadioInput fieldSetName="gender" options={['남', '여']} setValue={setValue} />
  ),
  birth: (setValue: SetStateAction<string>) => <DateInput yearsRange={[1922, 2022]} setValue={setValue} />,
  transportation: (setValue: SetStateAction<string>) => (
    <RadioInput
      fieldSetName="transportation"
      options={['자가용', '버스', '지하철', '택시', '자전거', 'KTX/기차', '전동킥보드', '도보']}
      setValue={setValue}
    />
  ),
  address: (setValue: SetStateAction<string>) => <TextInput placeholder="주소명(시 또는 구)" setValue={setValue} />,
};

export const getInputComponent = (
  fieldToSearch: InputComponentSelectorTypes,
  setValue: Dispatch<SetStateAction<string>>,
) => {
  if (fieldToSearch in InputComponentSelector) return InputComponentSelector[fieldToSearch](setValue);
};

const Input = styled.input`
  border: none;
  outline: none;
`;

const RadiosWrapper = styled.div`
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
  border-radius: 10px;
  font-size: 0.7rem;
  min-width: 2rem;
  text-align: center;
  font-weight: bold;
`;
const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Select = styled.select`
  border: none;
  font-size: 0.7rem;

  text-align: center;
  outline: none;
`;
