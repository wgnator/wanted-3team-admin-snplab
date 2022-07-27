import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { forwardRef, useEffect, useState } from 'react';
import { CloseButton as CCloseButton, Navigation as NNavigation } from './PolicyConfirm';
import { RefObject } from 'react';
import useAddress from '../hooks/useAddress';

interface AddressSelectorProps {
  validInput: (ref?: RefObject<HTMLInputElement>) => void;
}

export default forwardRef<HTMLInputElement, AddressSelectorProps>(function AddressSelector({ validInput }, ref) {
  const { getAddressApi, siAddress, searchAddress, guAddress } = useAddress();

  // @ts-ignore
  console.log('siAddress.regcodes', siAddress?.regcodes, 'guAddress.regcodes', guAddress?.regcodes);

  const [selectedSi, setSelectedSi] = useState<string | null>(null);
  const [selectedGu, setSelectedGu] = useState<string | null>(null);

  // @ts-ignore
  const cities: string[] = siAddress?.regcodes.map((regcode) => regcode.name) || [];
  // @ts-ignore
  const guList: string[] = guAddress?.regcodes.slice(1).map((regcode) => regcode.name?.split(' ')[1]) || [];

  const navigate = useNavigate();
  const closeModal = () => navigate('', { state: null });

  const submitAdress = () => {
    if (ref === null) return;
    // @ts-ignore
    ref.current.value = `${selectedSi || ''} ${selectedGu || ''}`;
    validInput();
    navigate('', { state: '' });
  };

  const selectCity = (city: string) => {
    if (selectedSi === city) return;
    setSelectedSi(city);
  };

  const selectCountry = (country: string) => {
    if (selectedGu === country) return;
    setSelectedGu(country);
  };

  useEffect(() => {
    getAddressApi();
  }, []);

  // useEffect(() => {
  //   if (!selectedSi) setSelectedSi('서울');
  // }, [siAddress]);

  useEffect(() => {
    if (selectedSi) searchAddress(selectedSi);
  }, [selectedSi]);

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
            {cities.map((si, idx) => (
              <SelectButton key={idx} hasSelect={si === selectedSi} type="button" onClick={() => selectCity(si)}>
                {si}
              </SelectButton>
            ))}
          </Cities>
          <Counties>
            {guList.length === 0 ? (
              <P>시/도를 선택하세요</P>
            ) : (
              guList.map(
                (gu, idx) =>
                  gu !== selectedSi && (
                    <SelectButton
                      key={idx}
                      hasSelect={gu === selectedGu}
                      type="button"
                      onClick={() => selectCountry(gu)}
                    >
                      {gu}
                    </SelectButton>
                  ),
              )
            )}
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
  height: 100%;
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
  background-color: ${(props) => (props.hasSelect ? theme.buttonLightColor : 'transparent')};
  color: ${(props) => (props.hasSelect ? theme.fontDarkColor : theme.fontLightColor)};
  border-radius: 0.5rem;
`;

const P = styled.p`
  font-size: 1rem;
  padding: 1rem 0;
`;
