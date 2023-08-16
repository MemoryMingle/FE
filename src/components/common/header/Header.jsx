import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ icon, title }) => {
    const navigate = useNavigate();

    return (
        <HeaderContainer>
            <BackButton src={`${process.env.PUBLIC_URL}assets/svgs/${icon || 'icon_back'}.svg`} alt='back' onClick={() => navigate(-1)} />
            <Title>{title}</Title>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 5vw;
    position: relative;
    top: 3vh;
`;

const BackButton = styled.img`
    display: flex;
    width: 8.602px;
    height: 17.745px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
`;

const Title = styled.h1`
    width: 100%;
    text-align: center;
    color: #4C4C4C;
    font-size: 16px;
    font-weight: 600;
`;

Header.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
}

export default Header;