import React, { useState } from 'react';
import { styled } from 'styled-components';
import { signup, idDuplicateCheck } from '../../api/auth'
import SignupPageHeader from '../../layout/header/SignupPageHeader';

import SignupModal from '../../components/common/modal/SignupModal.jsx';
import Input from '../../components/common/input/Input.jsx';

function Signup() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const [isIdCheck, setIsIdCheck] = useState(false); // 중복 검사를 했는지 안했는지
  const [isIdAvailable, setIsIdAvailable] = useState(false); // 아이디 사용 가능한지 아닌지

  const onChangeIdHandler = (e) => {
    const idValue = e.target.value;
    setId(idValue);
    idCheckHandler(idValue);
  }

  const onChangePasswordHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
      passwordCheckHandler(value, confirm);
    } else {
      setConfirm(value);
      passwordCheckHandler(password, value);
    }
  }

  const idCheckHandler = async (id) => {
    const idRegex = /^[a-z\d]{5,10}$/;
    if (id === '') {
      setIdError('아이디를 입력해주세요.');
      setIsIdAvailable(false);
      return false;
    } else if (!idRegex.test(id)) {
      setIdError('아이디는 5~10자의 영소문자, 숫자만 입력 가능합니다.');
      setIsIdAvailable(false);
      return false;
    }
    try {
      const responseData = await idDuplicateCheck(id);
      if (responseData) {
        setIdError('사용 가능한 아이디입니다.');
        setIsIdCheck(true);
        setIsIdAvailable(true);
        return true;
      } else {
        setIdError('이미 사용중인 아이디입니다.');
        setIsIdAvailable(false);
        return false;
      }
    } catch (error) {
      alert('서버 오류입니다. 관리자에게 문의하세요.');
      console.error(error);
      return false;
    }
  }

  const passwordCheckHandler = (password, confirm) => {
    const passwordRegex = /^[a-z\d!@*&-_]{8,16}$/;
    console.log("password", password); // TODO : 테스트 완료 후 삭제하기
    console.log("confirm", confirm);
    if (password === '') {
      setPasswordError('비밀번호를 입력해주세요.');
      return false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError('비밀번호는 8~16자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.');
      return false;
    } else if (confirm !== password) {
      setPasswordError('');
      setConfirmError('비밀번호가 일치하지 않습니다.');
      return false;
    } else {
      setConfirmError('');
      return true;
    }
  }

  const signupHandler = async (e) => {
    e.preventDefault();

    const idCheckresult = await idCheckHandler(id);
    if (idCheckresult) setIdError('');
    else return;
    if (!isIdCheck || !isIdAvailable) {
      alert('아이디 중복 검사를 해주세요.');
      return;
    }

    const passwordCheckResult = passwordCheckHandler(password, confirm);
    if (passwordCheckResult) { setPasswordError(''); setConfirmError(''); }
    else return;

    try {
      const responseData = await signup(id, password, confirm);
      if (responseData) {
        setOpenModal(true);
      } else {
        alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
      console.error(error);
    }
  }

  return (
    <>
      <SignupPageHeader />
      <Wrapper>
        <form onSubmit={signupHandler}>
          <InputWrapper>
            <InputContainer>
              <label htmlFor='id'>아이디</label>
              <Input
                onChange={onChangeIdHandler}
                type="text"
                id='id'
                name='id'
                value={id}
                placeholder='아이디 입력'
                theme='underLine'
                maxLength={10}
              />
              {idError && <small className={isIdAvailable ? 'idAvailable' : ''}>{idError}</small>}
            </InputContainer>
            <InputContainer>
              <label htmlFor='id'>비밀번호</label>
              <Input
                onChange={onChangePasswordHandler}
                type="password"
                id='password'
                name='password'
                value={password}
                placeholder='비밀번호 입력'
                theme='underLine'
                maxLength={16}
              />
              {passwordError && <small>{passwordError}</small>}
              <Input
                onChange={onChangePasswordHandler}
                type="password"
                id='confirm'
                name='confirm'
                value={confirm}
                placeholder='비밀번호 확인'
                theme='underLine'
                maxLength={16}
              />
              {confirmError && <small>{confirmError}</small>}
            </InputContainer>
          </InputWrapper>
          <ButtonContainer>
            <button type='submit'>가입하기</button>
          </ButtonContainer>
        </form>
        {setOpenModal ? openModal && (<SignupModal />) : null}
      </Wrapper>
    </>
  )
}

export default Signup;

const Wrapper = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  //height: 100vh;
  //border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-top: -50%;
`;

const InputContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
  @media (max-height: 750px) {
    margin-bottom: 1rem;
  }

  label {
    align-self: flex-start;
    text-align: left;
    margin-left: 5vw;
    color: #5873FE;
    font-family: Apple SD Gothic Neo;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  small {
    align-self: flex-start;
    text-align: left;
    margin-left: 5vw;
    margin-right: 5vw;
    font-size: 0.8rem;
    color: #FF7E62;
    font-family: Apple SD Gothic Neo;
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    word-break: break-all;
    overflow-wrap: break-word;
    white-space: pre-line;
  }

  .idAvailable {
    color: #4C4C4C;
  }
`;

const ButtonContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  bottom: -30vh;
  @media (max-height: 750px) {
    bottom: -27vh;
  }
  button {
    width: 90%;
    height: 3.5625rem;
    flex-shrink: 0;
    border: none;
    border-radius: 1.78125rem;
    background: #5873FE;
    color: #FFF;
    text-align: center;
    font-family: Apple SD Gothic Neo;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
