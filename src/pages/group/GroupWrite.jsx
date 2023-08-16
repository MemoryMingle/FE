import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import api from '../../api/index.jsx';
import { uploadImage } from '../../hooks/uploadImage.js';
import WriteImageUpload from '../../components/common/input/WriteImageUpload.jsx';
import { DatePicker, Space } from 'antd';
import Input from '../../components/common/input/Input.jsx';
import FriendSearchModal from '../../components/common/modal/NicknameModal.jsx';

function GroupWrite() {
  const [groupName, setGroupName] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [chosenFile, setChosenFile] = useState(null);
  const [place, setPlace] = useState('');
  const [places, setPlaces] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [participants, setParticipant] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  const [isModalOpen, setModalOpen] = useState(false);

  const { RangePicker } = DatePicker;
  const onChange = (value, dateString) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };

  console.log('starDate', startDate);
  console.log('endDate', endDate);

  const searchUser = async (nickname) => {
    try {
      const response = await api.get(`/nickname/${nickname}`, {
        withCredentials: true,
      });

      const userData = response.data;
      console.log('nickname', response);
      console.log(userData);
      setSearchResult(response.data.findByNicknameData);
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message === '로그인이 필요한 기능입니다.'
      ) {
        console.error('User needs to log in to access this feature.');
      } else {
        console.error('Error fetching user data:', error);
      }
    }
  };

  //데이터 보내는 로직
  const submitHandler = async (e) => {
    e.preventDefault();
    let imageUrlFromCloud = '';
    if (chosenFile) {
      imageUrlFromCloud = await uploadImage(chosenFile);
    }
    console.log('url', imageUrlFromCloud);
    const payload = {
      groupName: groupName,
      thumbnailUrl: imageUrlFromCloud,
      place: places,
      participant: selectedFriends.map((friend) => friend.userId.toString()),
      startDate: startDate,
      endDate: endDate,
    };

    try {
      const response = await api.post('/group', payload, {
        withCredentials: true,
      });
      console.log(response.data);
      navigate('/groupmain');
    } catch (error) {
      console.error('Error sending group data:', error);
    }
  };

  //이미지 처리하는 로직
  const imageHandler = (e) => {
    const file = e.target.files[0];
    setChosenFile(file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setThumbnailUrl(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const universalHandler = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'groupName':
        setGroupName(value);
        break;
      case 'place':
        setPlace(value);
        break;
      case 'participants':
        setParticipant(value);
        searchUser(value);
        break;
      default:
        break;
    }
  };

  const deletePlaceHandler = (indexToDelete) => {
    setPlaces((prevPlaces) =>
      prevPlaces.filter((_, index) => index !== indexToDelete)
    );
  };

  const navigate = useNavigate();
  const backButtonHandler = () => {
    navigate('/groupmain');
  };

  const placeButtonHandler = () => {
    const newPlaces = place;
    setPlaces((prevPlaces) => [...prevPlaces, newPlaces]);
    setPlace('');
  };

  const addFriendHandler = (item) => {
    const newFriend = {
      userId: item.userId,
      loginId: item.loginId,
      nickname: item.nickname,
      profileUrl: item.profileUrl,
    };
    setSelectedFriends((prevFriend) => [...prevFriend, newFriend]);
    setParticipant('');
    setSearchResult([]);
  };

  const removeFriendHandler = (id) => {
    setSelectedFriends((prevfri) => prevfri.filter((item) => item.userId !== id));
  };

  const isUserSelected = (loginId) => {
    return selectedFriends.some((friend) => friend.loginId === loginId);
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <WriteHeader>
          <div>
            <BackButton onClick={backButtonHandler}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/svgs/icon_back.svg`}
                alt='left'
              />
            </BackButton>
          </div>
          <div>앨범 만들기</div>
          <div>
            <SubmitButton type='submit'>확인</SubmitButton>
          </div>
        </WriteHeader>

        <WriteBody>
          <Input
            color='#4C4C4C'
            theme='underLine'
            name='groupName'
            type='text'
            value={groupName}
            placeholder='앨범 이름을 입력해주세요'
            onChange={universalHandler}
            required
          />
          <WriteImageWrapper>
            {thumbnailUrl ? (
              <ThumbnailWrapper>
                <ThumbedImage src={thumbnailUrl} alt='Uploaded Thumbnail' />
                <ImageInput type='file' accept='image/*' onChange={imageHandler} />
              </ThumbnailWrapper>
            ) : (
              <WriteImageUpload
                height='20vh'
                onImageChange={imageHandler}
                bgcolor='rgba(245, 246, 248, 1)'
                color="#BDBDBD"
              >
                썸네일 추가하기
              </WriteImageUpload>
            )}
          </WriteImageWrapper>
          <StDateWrapper>
            <DivHeaderText>함께한 추억 기간 </DivHeaderText>
            <Space
              direction='vertical'
              size={12}
              style={{
                width: '100%',
              }}
            >
              <RangePicker
                showTime={{}}
                format='YYYY-MM-DD'
                onChange={onChange}
                style={{
                  width: '100%',
                  height: '44px',
                  backgroundColor: '#F5F5F5',
                  border: 'none',
                }}
              />
            </Space>
          </StDateWrapper>
          <PlaceContainer>
            <DivHeaderText>함께한 추억 장소</DivHeaderText>
            <PlaceInputWrapper>
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/locationicon.png`}
                alt='placeicon'
                className='inputIcon'
              />
              <GroupWriteInput
                name='place'
                placeholder='추억을 나눈 장소를 입력해주세요'
                value={place}
                onChange={universalHandler}
              />
              {place && (
                <PlaceAddButton className='button' onClick={placeButtonHandler}>
                  추가
                </PlaceAddButton>
              )}
            </PlaceInputWrapper>
            {places.map((place, index) => (
              <PlaceResult key={index}>
                {place}
                <PlaceRemoveButton onClick={() => deletePlaceHandler(index)}>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/image/cancleplace.png`}
                    alt='left'
                  />
                </PlaceRemoveButton>
              </PlaceResult>
            ))}
          </PlaceContainer>
          <div style={{ width: '100%' }}>
            <DivHeaderText>함께한 친구들 </DivHeaderText>
            <FriendSearchButton onClick={() => setModalOpen(!isModalOpen)}>
              <FriendContentWrap>
                <FriendSearchImage
                  src={`${process.env.PUBLIC_URL}/assets/image/friendsearchicon.png`}
                  alt='search'
                />
                <FriendSearchText>
                  {' '}
                  추억을 나눈 친구를 검색해주세요{' '}
                </FriendSearchText>
              </FriendContentWrap>
            </FriendSearchButton>
            {isModalOpen && (
              <FriendSearchModal
                isopen={isModalOpen}
                onClose={() => setModalOpen(false)}
                universalHandler={universalHandler}
                isUserSelected={isUserSelected}
                searchResult={searchResult}
                addFriendHandler={addFriendHandler}
                participants={participants}
              />
            )}
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {selectedFriends &&
              selectedFriends.map((item) => {
                return (
                  <SelectFrindWrapper key={item.userId}>
                    <ProfileImage src={item.profileUrl} alt={item.nickname} />
                    <p> {item.nickname} </p>
                    <SelectFrindRemover
                      onClick={() => removeFriendHandler(item.userId)}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/image/friendremover.png`}
                        alt='remover'
                      />
                    </SelectFrindRemover>
                  </SelectFrindWrapper>
                );
              })}
          </div>
        </WriteBody>
      </Form>
    </>
  );
}

export default GroupWrite;

const DivHeaderText = styled.p`
  margin-top: 12px;
  margin-bottom: 2px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  color: #4c4c4c;
`;

const SelectFrindWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SelectFrindRemover = styled.button`
  position: absolute;
  border: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  color: #fff;
  background-color: transparent;
  top: 0;
  right: 0;
`;

const ProfileImage = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 100%;
`;

const Form = styled.form`
  width: 100%;
`;

const WriteHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 80px;
  background-color: #fff;
  align-items: center;
`;

const WriteBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow: scroll;
`;

const StDateWrapper = styled.div`
  width: 100%;
`;

const GroupWriteInput = styled.input`
  width: 100%;
  height: 44px;
  padding-right: 50px;
  border-radius: 7px;
  background-color: #f5f5f5;
  border: none;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #c2c2c2;
    font-size: 15px;
    font-style: normal;
    line-height: normal;
  }
`;
const PlaceContainer = styled.div`
  position: relative;
  width: 100%;
`;
const PlaceInputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 7px;

  .inputIcon {
    margin-right: 8px;
    margin-left: 10px;
    margin-top: 7px;
  }
`;

const SubmitButton = styled.button`
  border: none;
  background-color: transparent;
  color: rgba(88, 115, 254, 1);
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  line-height: normal;
  margin-right: 20px;
`;

const BackButton = styled.button`
  margin-left: 20px;
  background-color: transparent;
  border: none;
`;

const WriteImageWrapper = styled.div`
  width: 100%;
`;

const ThumbedImage = styled.img`
  width: 100%;
  height: 20vh;
  object-fit: cover;
  border-radius: 7px;
`;

const ImageInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 20vh;
`;

const PlaceResult = styled.div`
  margin-left: 5px;
  margin-top: 15px;
  height: 30px;
  display: inline-flex;
  background-color: #5873fe;
  border-radius: 20px;
  color: #fff;
  padding: 8px 4px 8px 10px;
  font-size: 13px;
  align-items: center;
`;

const PlaceRemoveButton = styled.button`
  padding-top: 2px;
  align-items: center;
  border: none;
  background-color: transparent;
`;

const PlaceAddButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

// FriendSearch Button styledcomponent
const FriendSearchButton = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  background-color: rgba(245, 245, 245, 1);
`;

const FriendSearchImage = styled.img`
  width: 20px;
  height: 20px;
`;

const FriendContentWrap = styled.div`
  display: flex;
  position: absolute;
  left: 10px;
  gap: 9px;
`;

const FriendSearchText = styled.p`
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: #c2c2c2;
`;

