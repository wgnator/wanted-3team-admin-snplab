import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { REGION } from '../constants/constants';
import { theme } from '../styles/theme';
import { forwardRef, useEffect, useState } from 'react';
import { CloseButton as CCloseButton, Navigation as NNavigation } from './PolicyConfirm';
import { RefObject } from 'react';

type City = keyof typeof REGION;
type Country = typeof REGION[City][number];

interface AddressSelectorProps {
  validInput: (ref?: RefObject<HTMLInputElement>) => void;
}

export default forwardRef<HTMLInputElement, AddressSelectorProps>(function AddressSelector({ validInput }, ref) {
  const [adress, setAddress] = useState<[City, Country]>(['서울특별시', '강남구']);

  const cities = Object.keys(REGION);

  const navigate = useNavigate();
  const closeModal = () => navigate('', { state: null });

  const submitAdress = () => {
    if (ref === null) return;
    // @ts-ignore
    ref.current.value = adress.join(' ');
    validInput();
    navigate('', { state: '' });
  };

  const selectCity = (city: City) => {
    if (adress[0] === city) return;
    setAddress(([_, prevCountry]) => [city, prevCountry]);
  };
  const selectCountry = (country: Country) => {
    if (adress[1] === country) return;
    setAddress(([prevCity, _]) => [prevCity, country]);
  };

  return (
    <Container>
      <Navigation>
        <CloseButton onClick={closeModal}>
          <AiOutlineClose />
        </CloseButton>
        <Title>거주지역 선택</Title>
      </Navigation>
      <Main>
        <TitleMain>
          <h2>시/도</h2>
          <h2>시/구/군</h2>
        </TitleMain>
        <CitiesAndCounties>
          <Cities>
            {cities.map((city, idx) => (
              <SelectButton
                key={idx}
                hasSelect={city === adress[0]}
                type="button"
                onClick={() => selectCity(city as City)}
              >
                {city}
              </SelectButton>
            ))}
          </Cities>
          <Counties>
            {REGION[adress[0]].map((country, idx) => (
              <SelectButton
                key={idx}
                hasSelect={country === adress[1]}
                type="button"
                onClick={() => selectCountry(country as Country)}
              >
                {country}
              </SelectButton>
            ))}
          </Counties>
        </CitiesAndCounties>
        <Button onClick={submitAdress}>확인</Button>
      </Main>
    </Container>
  );
});

const Container = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;
const Navigation = styled(NNavigation)`
  height: 3.5rem;
`;
const CloseButton = styled(CCloseButton)`
  position: absolute;
`;
const Title = styled.h1`
  font-weight: 600;
  font-size: 1.2rem;
  text-align: center;
  width: 100%;
`;
const Main = styled.div`
  position: relative;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: calc(100% - 3.5rem);
`;
const TitleMain = styled.div`
  display: flex;
  h2 {
    width: 100%;
    text-align: center;
    font-weight: 800;
  }
`;
const CitiesAndCounties = styled.div`
  display: flex;
  font-size: 1.2rem;
  overflow: hidden;
  gap: 0.5rem;
`;
const Cities = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  overflow-y: scroll;
  gap: 0.5rem;
`;
const Counties = styled(Cities)``;

const Button = styled.button`
  padding: 1rem 0;
  width: 100%;
  cursor: pointer;
  border: none;
  border-radius: 1rem;
  color: white;
  font-size: 1rem;
  background-color: ${theme.buttonDarkColor};
  color: white;
  border-radius: 1rem;
`;

const SelectButton = styled(Button)<{ hasSelect: boolean }>`
  cursor: pointer;
  border: none;
  background-color: ${(props) => (props.hasSelect ? theme.buttonLightColor : 'transparent')};
  color: ${(props) => (props.hasSelect ? theme.fontDarkColor : theme.fontLightColor)};
  width: 100%;
  border-radius: 1rem;
  padding: 1rem 0;
  font-size: 1rem;
  border-radius: 0.5rem;
`;
