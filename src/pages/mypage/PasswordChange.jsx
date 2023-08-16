import React, { useState } from 'react';
import { styled } from 'styled-components';
import Input from '../../components/common/input/Input.jsx';
import Header from '../../components/common/header/Header.jsx';
import Button from '../../components/common/button/Button.jsx';

const PasswordChange = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const [oldPasswordError, setOldPasswordError] = useState();
    const [newPasswordError, setNewPasswordError] = useState();
    const [confirmError, setConfirmError] = useState();

    const onChangeOldPwHandler = (e) => {
        const value = e.target.value;
        setOldPassword(value);
        oldPasswordCheckHandler(value);
    }

    const onChangeNewPwHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'newPassword') {
            setNewPassword(value);
            newPasswordCheckHandler(value, confirm);
        } else {
            setConfirm(value);
            newPasswordCheckHandler(newPassword, value);
        }
    }

    const oldPasswordCheckHandler = (oldPassword) => {
        if (oldPassword === '') {
            setOldPasswordError('현재 비밀번호를 입력해주세요.');
            return false;
        } else {
            setOldPasswordError('');
            return true;
        }
    }

    const newPasswordCheckHandler = (newPassword, confirm) => {
        const passwordRegex = /^[a-z\d!@*&-_]{8,16}$/;
        console.log("newPassword", newPassword); // TODO : 테스트 완료 후 삭제하기
        console.log("confirm", confirm);
        if (newPassword === '') {
            setNewPasswordError('비밀번호를 입력해주세요.');
            return false;
        } else if (!passwordRegex.test(newPassword)) {
            setNewPasswordError('비밀번호는 8~16자의 영소문자, 숫자, !@*&-_만 입력 가능합니다.');
            return false;
        } else if (confirm !== newPassword) {
            setNewPasswordError('');
            setConfirmError('비밀번호가 일치하지 않습니다.');
            return false;
        } else {
            setNewPasswordError('');
            setConfirmError('');
            return true;
        }
    }

    const passwordChangeHandler = (e) => {
        e.preventDefault();
        const oldResult = oldPasswordCheckHandler(oldPassword);
        if (oldResult) setOldPasswordError('');
        else return;

        const newResult = newPasswordCheckHandler(newPassword);
        if (newResult) { setNewPasswordError(''); setConfirmError(''); }
        else return;
    }

    return (
        <>
            <Header title={'비밀번호 변경'} />
            <Wrapper>
                <Form onSubmit={passwordChangeHandler}>
                    <InputWrapper>
                        <InputContainer>
                            <label htmlFor='oldPassword'>현재 비밀번호</label>
                            <Input
                                onChange={onChangeOldPwHandler}
                                type='password'
                                id='oldPassword'
                                name='oldPassword'
                                value={oldPassword}
                                placeholder='현재 비밀번호 입력'
                                theme='underLine'
                            />
                            {oldPasswordError && <small>{oldPasswordError}</small>}
                        </InputContainer>
                        <InputContainer>
                            <label htmlFor='newPassword'>새 비밀번호</label>
                            <Input
                                onChange={onChangeNewPwHandler}
                                type='password'
                                id='newPassword'
                                name='newPassword'
                                value={newPassword}
                                placeholder='새 비밀번호 입력'
                                theme='underLine'
                            />
                            {newPasswordError && <small>{newPasswordError}</small>}
                        </InputContainer>
                        <InputContainer>
                            <label htmlFor='confirm'>새 비밀번호 확인</label>
                            <Input
                                onChange={onChangeNewPwHandler}
                                type='password'
                                id='confirm'
                                name='confirm'
                                value={confirm}
                                placeholder='새 비밀번호 확인'
                                theme='underLine'
                            />
                            {confirmError && <small>{confirmError}</small>}
                        </InputContainer>
                    </InputWrapper>
                    <ButtonContainer>
                        <Button
                            type='submit'
                            size='large'
                            background='#5873FE'
                            color='#FFF'
                        >변경하기
                        </Button>
                    </ButtonContainer>
                </Form>
            </Wrapper>
        </>
    )
}

export default PasswordChange;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 12vh;
`;

const Form = styled.form`
    width: 100%;
`;

const InputWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4vh;
`;

const InputContainer = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1vh;

    label {
        width: 90%;
        align-self: flex-start;
        text-align: left;
        color: #5873FE;
        font-size: 16px;
        font-weight: 700;
    }

    small {
        width: 90%;
        align-self: flex-start;
        text-align: left;
        font-size: 13px;
        color: #FF7E62;
        font-weight: 600;
    }
    
`;

const ButtonContainer = styled.div`
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 8vh;

    button {
        font-weight: 700;
    }
`;

