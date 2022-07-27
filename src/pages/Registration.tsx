import styled from 'styled-components';
import Input from '../components/Input';
import InputRadio from '../components/InputRadio';
import { theme } from '../styles/theme';
import { FormEvent, KeyboardEvent, MouseEvent, RefObject, useEffect, useRef, useState } from 'react';
import { ERROR_MESSAGES, keyCodes, MODAL_OPTIONS, MODAL_PATHS, REGEXS } from '../constants/constants';
import InputContainerAbst from '../components/InputContainer';
import Modal from '../components/Modal';
import { useLocation, useNavigate } from 'react-router-dom';
import PersonalInformationPolicy from '../assets/privacy_policy';
import PolicyConfirm from '../components/PolicyConfirm';
import CheckboxInput from '../components/CheckboxInput';
import Checkbox from '../components/Checkbox';
import CheckboxContainer from '../components/CheckboxContainer';
import AddressSelector from '../components/AddressSelector';
import AlertApply from '../components/AlertApply';
import debouunce from '../utils/debounce';
import useRegister from '../hooks/useRegister';
import { TransportationTypes } from '../interfaces/types';

interface Transportations {
  버스: boolean;
  지하철: boolean;
  택시: boolean;
  'KTX/기차': boolean;
  도보: boolean;
  자전거: boolean;
  전동킥보드: boolean;
  자가용: boolean;
}

const INPUT_NAMES = [
  '이름',
  '생년월일',
  '거주지역',
  '연락처',
  '이메일',
  '주교통수단',
  '개인정보처리방침',
  '제3자정보제공',
] as const;

type InputNameTypes = typeof INPUT_NAMES[number];
type InputValidationTypes = Extract<InputNameTypes, '이름' | '생년월일' | '연락처' | '이메일' | '거주지역'>;

export default function Registration() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { modal: keyof typeof PersonalInformationPolicy };
  const { postApplicants } = useRegister();
  const [inputStatus, setInputStatus] = useState({
    이름: { isValid: false, message: '' },
    생년월일: { isValid: false, message: '' },
    거주지역: { isValid: false, message: '' },
    연락처: { isValid: false, message: '' },
    이메일: { isValid: false, message: '' },
    주교통수단: { isValid: false, message: '' },
    개인정보처리방침: { isValid: false, message: '' },
    제3자정보제공: { isValid: false, message: '' },
  });

  const [transportations, setTransportations] = useState<Transportations>({
    버스: false,
    지하철: false,
    택시: false,
    'KTX/기차': false,
    도보: false,
    자전거: false,
    전동킥보드: false,
    자가용: false,
  });
  const [hasValidation, setHasValidation] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);
  const genderRefs = [femaleRef, maleRef];
  const birthRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const agreeAllRef = useRef<HTMLInputElement>(null);
  const personalInformationRef = useRef<HTMLInputElement>(null);
  const consentToProvideInformationRef = useRef<HTMLInputElement>(null);

  const checkValidation = (name: InputValidationTypes, value: string) => new RegExp(REGEXS[name]).test(value);

  const addDotToBirth = (event: KeyboardEvent<HTMLInputElement>, ref: RefObject<HTMLInputElement>) => {
    if (!ref.current?.value) return;
    const { value } = ref.current;
    const { key, code } = event;

    if (code === keyCodes.backspace) {
      return;
    }
    if (code === keyCodes.space) {
      event.preventDefault();
      return;
    }

    if (+key >= 0 && +key <= 9) {
      if (ref.current.value.includes(' ')) ref.current.value = ref.current.value.trim();
      if (value.length === 4 || value.length === 7) {
        ref.current.value = ref.current.value + '.';
      }
      return;
    }
  };

  const validateInput = (ref: RefObject<HTMLInputElement>) => {
    if (!ref.current) return;
    const { name, value } = ref.current as { name: InputValidationTypes; value: string };

    const passedValidation = checkValidation(name, value);
    if (inputStatus[name].isValid === passedValidation) return;

    setInputStatus((prevState) => {
      prevState[name].isValid = passedValidation;
      prevState[name].message = passedValidation ? '' : ERROR_MESSAGES[name];
      return { ...prevState };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasValidation) return;

    const postData = {
      round: 1,
      name: nameRef.current?.value,
      gender: maleRef.current?.checked ? maleRef.current?.value : femaleRef.current?.value,
      birth: birthRef.current?.value,
      address: addressRef.current?.value,
      contact: contactRef.current?.value,
      email: emailRef.current?.value,
      transportation: Object.entries(transportations)
        .filter(([transportation, isValid]) => isValid && transportation)
        .map((transportation) => transportation[0]),
    };

    // @ts-ignore
    postApplicants(postData);
    alertDoneApply();
  };

  const toggleTransportation = (transportation: TransportationTypes) => {
    setTransportations((prevState) => {
      const newState = { ...prevState, [transportation]: !prevState[transportation] };
      const isValidTransportations = !!Object.values(newState).find(Boolean);

      setInputStatus((prevInputState) => {
        prevInputState.주교통수단.isValid = isValidTransportations;
        prevInputState.주교통수단.message = prevState[transportation] ? '' : ERROR_MESSAGES.주교통수단;
        return { ...prevInputState };
      });

      return newState;
    });
  };

  const isTrue = (...rest: boolean[]) => (rest.find((value) => value === false) === undefined ? true : false);

  const agreeAll = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!agreeAllRef.current || !personalInformationRef.current || !consentToProvideInformationRef.current) return;
    let agreeAll = agreeAllRef.current;
    let personalInfo = personalInformationRef.current;
    let consentToProvideInfo = consentToProvideInformationRef.current;
    let newCheckValue = true;

    if (isTrue(personalInfo.checked, consentToProvideInfo.checked)) newCheckValue = false;

    agreeAll.checked = newCheckValue;
    personalInfo.checked = newCheckValue;
    consentToProvideInfo.checked = newCheckValue;

    setInputStatus((prevState) => {
      prevState.개인정보처리방침.isValid = newCheckValue;
      prevState.제3자정보제공.isValid = newCheckValue;
      return { ...prevState };
    });
  };

  const changeAgreeAll = (values: boolean[]) => {
    if (!agreeAllRef.current) return;
    if (values.filter((value) => value === true).length === values.length) {
      agreeAllRef.current.checked = true;
      return;
    }
    agreeAllRef.current.checked = false;
  };

  const changePolicy = (target: RefObject<HTMLInputElement>) => {
    setInputStatus((prevState) => {
      if (!target.current) return prevState;
      const { name, checked } = target.current as { name: keyof typeof inputStatus; checked: boolean };
      prevState[name].isValid = checked;
      prevState[name].message = checked ? '' : ERROR_MESSAGES[name];

      changeAgreeAll([prevState.개인정보처리방침.isValid, prevState.제3자정보제공.isValid]);
      return { ...prevState };
    });
  };

  const seePersonalInformation = () => {
    navigate('', { state: { modal: MODAL_PATHS.개인정보처리방침 } });
  };
  const seeConsentToProvideInformation = () => {
    navigate('', { state: { modal: MODAL_PATHS.제3자정보제공 } });
  };
  const alertDoneApply = () => {
    navigate('', { state: { modal: MODAL_PATHS.doneAlly } });
  };
  const seeAddressSelector = () => {
    addressRef.current?.blur();
    navigate('', { state: { modal: MODAL_PATHS.adressSelector } });
  };

  const selectModalComponent = (modalPath: keyof typeof MODAL_PATHS) => {
    switch (modalPath) {
      case MODAL_PATHS.doneAlly:
        return <AlertApply callback={() => navigate(MODAL_OPTIONS.doneAlly.goWhenClosing)} />;
      case MODAL_PATHS.adressSelector:
        return <AddressSelector ref={addressRef} validInput={() => validateInput(addressRef)} />;
      case MODAL_PATHS.개인정보처리방침:
        return <PolicyConfirm innerHtml={PersonalInformationPolicy[modalPath]} />;
      case MODAL_PATHS.제3자정보제공:
        return <PolicyConfirm innerHtml={PersonalInformationPolicy[modalPath]} />;
    }
  };

  useEffect(() => {
    const validLength = Object.values(inputStatus).filter((input) => !input.isValid).length;

    if (validLength === 0) return setHasValidation(true);
    hasValidation === true && setHasValidation(false);
  }, [inputStatus, personalInformationRef, consentToProvideInformationRef]);

  return (
    <Container>
      <Wrapper>
        <Title>
          <span>크라우드 워커에 지원하기 위해</span>
          <span>필요한 정보를 입력해 주세요</span>
        </Title>
        <Form onSubmit={handleSubmit}>
          <InputContainerAbst
            isValid={inputStatus.이름.isValid}
            errorMessage={inputStatus.이름.message}
            name="이름"
            label="이름"
            children={
              <Input
                name="이름"
                type={'text'}
                placeholder="홍길동"
                onChange={() =>
                  debouunce({
                    callback() {
                      return validateInput(nameRef);
                    },
                    timeout: 300,
                  })
                }
                ref={nameRef}
                required
              />
            }
          />
          <InputContainerAbst
            name="성별"
            label="성별"
            children={
              <div style={{ display: 'flex', width: '100%' }}>
                {['여자', '남자'].map((gender, idx) => (
                  <InputRadio
                    key={idx}
                    name="성별"
                    label={gender}
                    children={
                      <CheckboxInput
                        type={'radio'}
                        name={'성별'}
                        label={gender}
                        value={gender}
                        ref={genderRefs[idx]}
                        defaultChecked={!!!idx}
                        hasBorder
                      />
                    }
                  />
                ))}
              </div>
            }
          />
          <InputContainerAbst
            isValid={inputStatus.생년월일.isValid}
            errorMessage={inputStatus.생년월일.message}
            name="생년월일"
            label="생년월일"
            children={
              <Input
                name="생년월일"
                type={'string'}
                placeholder="YYYY.MM.DD"
                ref={birthRef}
                onChange={() => validateInput(birthRef)}
                onKeyDown={(event) => addDotToBirth(event, birthRef)}
              />
            }
          />
          <InputContainerAbst
            isValid={inputStatus.거주지역.isValid}
            errorMessage={inputStatus.거주지역.message}
            name="거주지역"
            label="거주지역"
            children={
              <Input
                name="거주지역"
                type={'text'}
                placeholder="겨주지역 선택"
                ref={addressRef}
                onClick={seeAddressSelector}
                onFocus={seeAddressSelector}
              />
              // <Input
              //   name="거주지역"
              //   type={'text'}
              //   placeholder="겨주지역 선택"
              //   ref={addressRef}
              //   onChange={validateInput}
              // />
            }
          />

          <InputContainerAbst
            isValid={inputStatus.연락처.isValid}
            errorMessage={inputStatus.연락처.message}
            name="연락처"
            label="연락처"
            children={
              <Input
                name="연락처"
                type={'string'}
                placeholder="'-'없이 입력해 주세요"
                ref={contactRef}
                onChange={() => validateInput(contactRef)}
              />
            }
          />

          <InputContainerAbst
            isValid={inputStatus.이메일.isValid}
            errorMessage={inputStatus.이메일.message}
            name="이메일"
            label="이메일"
            children={
              <Input
                name="이메일"
                type={'email'}
                placeholder="MYD@snplap.com"
                ref={emailRef}
                onChange={() => validateInput(emailRef)}
              />
            }
          />
          <InputContainerAbst
            isValid={inputStatus.주교통수단.isValid}
            errorMessage={inputStatus.주교통수단.message}
            name="주로 이용하는 교통수단"
            label="주로 이용하는 교통수단"
            subLabel="주로 이용하는 교통수단을 모두 선택해주세요"
            children={
              <InputCheckboxWrapper>
                {Object.keys(transportations).map((transportation, idx) => (
                  <TransportationButton
                    key={idx}
                    type="button"
                    onClick={() => toggleTransportation(transportation as TransportationTypes)}
                    isActivate={transportations[transportation as TransportationTypes]}
                  >
                    {transportation}
                  </TransportationButton>
                ))}
              </InputCheckboxWrapper>
            }
          />

          <CheckboxContainer
            wholeController={
              <Checkbox
                name="이용약관 모두 동의"
                label="이용약관 모두 동의"
                ref={agreeAllRef}
                onClickWrapper={agreeAll}
                preventBubbling
                hasBorder
              />
            }
            checkboxes={
              <>
                <Checkbox
                  name={MODAL_PATHS.개인정보처리방침}
                  label="개인정보 처리방침 고지 (필수)"
                  isValid={inputStatus.개인정보처리방침.isValid}
                  errorMessage={inputStatus.개인정보처리방침.message}
                  ref={personalInformationRef}
                  changeInput={() => changePolicy(personalInformationRef)}
                  changePage={seePersonalInformation}
                />
                <Checkbox
                  name={MODAL_PATHS.제3자정보제공}
                  label="제3자 정보제공 동의 (필수)"
                  isValid={inputStatus.제3자정보제공.isValid}
                  errorMessage={inputStatus.제3자정보제공.message}
                  ref={consentToProvideInformationRef}
                  changeInput={() => changePolicy(consentToProvideInformationRef)}
                  changePage={seeConsentToProvideInformation}
                />
              </>
            }
          />

          <ConfirmButton isActivate={hasValidation}>지원하기</ConfirmButton>
        </Form>
      </Wrapper>
      {state?.modal && (
        <Modal
          height={MODAL_OPTIONS[state.modal].height}
          contentPosition={MODAL_OPTIONS[state.modal].position}
          goWhenClosing={MODAL_OPTIONS[state.modal].goWhenClosing}
          children={selectModalComponent(state.modal)}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  background-color: lightgray;
  height: 100vh;
  overflow-y: hidden;
`;

const Wrapper = styled.div`
  max-width: 400px;
  overflow-y: scroll;
  background-color: white;
  margin: 0 auto;
  height: 100%;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  padding: 2rem 1rem;
`;

const Title = styled.div`
  color: ${theme.fontDarkColor};
  font-weight: 800;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  gap: 2rem;
  flex-direction: column;
`;

const InputCheckboxWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 0.5rem 0.7rem;
`;

const Button = styled.button<{ isActivate: boolean }>`
  color: ${(props) => (props.isActivate ? theme.buttonLightColor : theme.fontLightColor)};
  background-color: ${(props) => (props.isActivate ? theme.buttonDarkColor : theme.buttonLightColor)};
  border: none;
  border-radius: 1rem;
  font-weight: 600;
  padding: 1rem 0;
  cursor: pointer;
`;

const ConfirmButton = styled(Button)`
  pointer-events: ${(props) => (props.isActivate ? 'all' : 'none')};
  background-color: ${(props) => (props.isActivate ? theme.buttonDarkColor : theme.buttonLightColor)};
`;

const TransportationButton = styled(Button)`
  background-color: ${(props) => (props.isActivate ? theme.buttonDarkColor : 'transparent')};
  border: 1px solid ${(props) => (props.isActivate ? theme.buttonDarkColor : theme.borderLightColor)};
  padding: 0.5rem 1rem;
`;
