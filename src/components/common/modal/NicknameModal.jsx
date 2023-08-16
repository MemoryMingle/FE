import { css, keyframes, styled } from "styled-components";
import PropTypes from 'prop-types';

function FriendSearchModal({
    onClose,
    isopen,
    universalHandler,
    searchResult,
    addFriendHandler,
    isUserSelected,
    participants,
  }) {
    return (
      <ModalContainer isopen={isopen}>
        <ModalButtonWrapper>
          <ModalButton onClick={onClose}>
            <img src={`${process.env.PUBLIC_URL}/assets/image/line.png`} alt='line' />
          </ModalButton>
        </ModalButtonWrapper>
        <div style={{ position: 'fix' }}>
          <ModalWriteInput
            name='participants'
            placeholder='친구 아이디'
            value={participants}
            onChange={universalHandler}
          />
        </div>
  
        {searchResult
          .filter((item) => !isUserSelected(item.loginId))
          .map((item) => {
            return (
              <ResultWrapper key={item.userId}>
                <ResultProfileImage src={item.profileUrl} alt='profileImg' />
                <div>
                  <p>{item.loginId} </p>
                  <p>{item.nickname} </p>
                </div>
                <ResultAddButton
                  onClick={() => {
                    addFriendHandler(item);
                    onClose();
                  }}
                >
                  {' '}
                  추가
                </ResultAddButton>
              </ResultWrapper>
            );
          })}
      </ModalContainer>
    );
  }
  
  const ResultWrapper = styled.div`
    width: 100%;
    height: 60px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    padding: 5px;
    justify-content: space-between;
  `;
  
  const ResultProfileImage = styled.img`
    width: 54px;
    height: 54px;
    border-radius: 100%;
    object-fit: cover;
  `;
  
  const ResultAddButton = styled.button`
    width: 75px;
    height: 28px;
    border: none;
    color: white;
    background-color: rgba(88, 115, 254, 1);
    border-radius: 12px;
  `;
  
  const ModalContainer = styled.div`
    position: fixed;
    width: 100%;
    left: 0;
    right: 0;
    bottom: ${({ isopen }) => (isopen ? '-9%' : '-100%')};
    background-color: #fff;
    padding: 1rem;
    z-index: 10;
    transition: bottom 0.4s ease-out;
    animation: ${({ isopen }) =>
      isopen
        ? css`
            ${slideUp} 0.8s
          `
        : css`
            ${slideDown} 1s
          `};
    height: 100%;
    border-radius: 30px;
    box-shadow: 0px -10px 14px 0px rgba(199, 199, 199, 0.25);
    overflow: scroll;
  `;
  
  const slideUp = keyframes`
    0% {
      bottom: -100%;
    }
    100% {
      bottom: -9%;
    }
    `;
  
  const slideDown = keyframes`
    from {
      bottom: -9%;
    }
    to {
      bottom: -100%;
    }
    `;
  
  const ModalButton = styled.button`
    border: none;
    background-color: transparent;
    align-items: center;
  `;
  
  const ModalButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  const ModalWriteInput = styled.input`
    width: 100%;
    height: 44px;
    padding-right: 50px;
    border-radius: 7px;
    background-color: #f5f5f5;
    border: none;
    margin-top: 25px;
  
    &:focus {
      outline: none;
    }
  `;
  
  FriendSearchModal.propTypes = {
    onClose: PropTypes.func,
    isopen: PropTypes.bool,
    universalHandler: PropTypes.func,
    searchResult: PropTypes.array,
    addFriendHandler: PropTypes.func,
    isUserSelected: PropTypes.func,
    participants: PropTypes.array,
  };
  
  export default FriendSearchModal