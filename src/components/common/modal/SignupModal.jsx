import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Button from '../button/Button.jsx';

const SignupModal = () => {
    const navigate = useNavigate();

    return (
        <ModalWrapper>
            <ModalBackground></ModalBackground>
            <ModalBody>
                <img src={`${process.env.PUBLIC_URL}assets/svgs/signup_check.svg`} alt='회원가입 확인' />
                <TextContainer>
                    <h2>회원가입 완료</h2>
                    <p>지금 바로 우리들의 추억을<br />만들어보세요!</p>
                </TextContainer>
                <ButtonContainer>
                    <Button
                        onClick={() => navigate('/userinfo')}
                        size='large'
                        background='#5873FE'
                        color='#FFF'
                    >확인
                    </Button>
                </ButtonContainer>
            </ModalBody>
        </ModalWrapper>
    )
}

export default SignupModal;

const ModalWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center; 
`;

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    opacity: 0.8;
    background-color: #000;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center; 
`;

const ModalBody = styled.div`
    position: relative;
    padding: 1.25rem;
    border-radius: 1.75rem;
    opacity: 1;
    background: #FFF;
    width: 80%;
    height: 27.25rem;
    flex-shrink: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        margin-top: 3rem;
    }
`;

const TextContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    color: #4C4C4C;
    line-height: 129.336%;
    h2 {
        margin-bottom: 2rem;
        font-size: 24px;
        font-weight: 700;
    }
    p {
        font-size: 16px;
        font-weight: 500;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    width: 100%;
    button {
        width: 100%;
        font-weight: 700;
    }
`;