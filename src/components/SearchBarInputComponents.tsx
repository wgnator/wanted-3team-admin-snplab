import { getDaysInMonth } from 'date-fns';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { getArrayOfEveryIntegerBetween } from '../utils/utils';

interface CommonPropsTypeForInput {
  setValue: SetStateAction<any>;
  value: any;
}

const MONTHS_RANGE = [1, 12];

export const TextInput = ({ placeholder, setValue, value }: CommonPropsTypeForInput & { placeholder: string }) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return <Input type="text" value={value} placeholder={placeholder} onChange={handleOnChange} />;
};

export const DateInput = ({ yearsRange, setValue, value }: CommonPropsTypeForInput & { yearsRange: number[] }) => {

  useEffect(() => {
    value === '' &&
      setValue({
        year: yearsRange[yearsRange.length - 1].toString(),
        month: '',
        day: '',
      });
  }, [value]);
  
  const [daysOfSelectedMonth, setDaysOfSelectedMonth] = useState<number[] | null>();

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.name === 'year') setValue({ year: event.target.value, month: '', day: '' });
    else if (event.target.name === 'month') setValue({ ...value, month: event.target.value, day: '' });
    else setValue({ ...value, [event.target.name]: event.target.value });
  };

  const getDaysOfSelectedMonth = () => {
    const daysArray = getArrayOfEveryIntegerBetween(
      1,
      getDaysInMonth(new Date(Number(value.year), Number(value.month) - 1)),
      'asc',
    );
    setDaysOfSelectedMonth(daysArray);
  };

  useEffect(() => {
    if (value.year && value.month) getDaysOfSelectedMonth();
    else setDaysOfSelectedMonth(null);
  }, [value.year, value.month]);

  return (
    <SelectWrapper>
      <Select name="year" value={value.year || ''} onChange={handleOnChange}>
        {getArrayOfEveryIntegerBetween(yearsRange[0], yearsRange[1], 'desc').map((year, index) => (
          <option value={year} key={year} selected={value.year === year}>
            {year}년
          </option>
        ))}
      </Select>
      <Select name="month" value={value.month || ''} onChange={handleOnChange}>
        <option value={''}>선택안함</option>
        {getArrayOfEveryIntegerBetween(MONTHS_RANGE[0], MONTHS_RANGE[1], 'asc').map((month, index) => (
          <option value={month} key={month} selected={value.month === month}>
            {month}월
          </option>
        ))}
      </Select>
      <Select name="day" value={value.day || ''} onChange={handleOnChange}>
        <option value={''}>선택안함</option>
        {daysOfSelectedMonth?.map((day, index) => (
          <option value={day} key={day} selected={value.day === day}>
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
  value,
}: CommonPropsTypeForInput & { fieldSetName: string; options: string[] }) => {
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <OptionsWrapper onChange={handleValueChange}>
      {options.reduce<JSX.Element[]>(
        (array, option, index) => [
          ...array,
          <Radio key={option} checked={value === option} name={fieldSetName} id={option} value={option} />,
          <Label key={option + 'label'} htmlFor={option}>
            {option}
          </Label>,
        ],
        [],
      )}
    </OptionsWrapper>
  );
};

type CheckboxValueType = {
  value: string;
  checked: boolean;
};

export const CheckboxInput = ({
  fieldSetName,
  options,
  setValue,
  value,
}: CommonPropsTypeForInput & { fieldSetName: string; options: string[] }) => {
  // useEffect(() => {
  //   setValue(options.map((option) => ({ value: option, checked: false })));
  // }, [options]);
  useEffect(() => {
    value === '' && setValue(options.map((option) => ({ value: option, checked: false })));
  }, [value]);
  const handleCheckedChange = (index: number, isChecked: boolean) => {
    setValue(
      value.map((currentState: CheckboxValueType, _index: number) =>
        _index === index ? { ...currentState, checked: isChecked } : currentState,
      ),
    );
  };

  return (
    <OptionsWrapper>
      {options.map<JSX.Element>((option, index) => (
        <OptionWrapper>
          <Checkbox
            key={option}
            name={fieldSetName}
            id={option}
            value={option}
            checked={value[index]?.checked}
            onChange={(event) => {
              handleCheckedChange(index, event.target.checked);
            }}
          />
          <Label key={option + 'label'} htmlFor={option}>
            {option}
          </Label>
        </OptionWrapper>
      ))}
    </OptionsWrapper>
  );
};

const Input = styled.input`
  border: none;
  outline: none;
`;
const OptionsWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
const OptionWrapper = styled.div`
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
const Checkbox = styled.input.attrs((props) => ({ type: 'checkbox' }))`
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
