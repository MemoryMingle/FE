import React from 'react';
import { styled } from 'styled-components';
import Footer from '../../layout/footer/Footer';
import useStickyMode from '../../hooks/useStickyMode.jsx';
import IconComponents from '../../components/common/iconComponent/IconComponents.jsx';
import { useNavigate, useParams } from 'react-router-dom';
// import api from '../../api/index.jsx';
import Photo from '../../components/common/photo/Photo.jsx';
import Profile from '../../components/common/profile/Profile.jsx';
import PlusButton from '../../components/common/button/PlusButton.jsx';
import { useRecoilState } from 'recoil';
import { selectedProfileState, modalState } from '../../recoil/Atom';
import ProfileModal from '../../components/common/modal/ProfileModal.jsx';
import shareKakao from '../../utils/shareKakao';
import { useGroupData } from '../../api/postMainApi.js';
import LoadingSpinner from '../../components/common/loading/LoadingSpinner.jsx';

export default function PostMain() {
  const stkicky = useStickyMode(115);
  // const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [, setPostData] = useRecoilState(selectedProfileState);

  const { id } = useParams();
  const navigate = useNavigate();
  const kakaoShared = shareKakao();
  const { data, isLoading, isError } = useGroupData(id);
  const storedUserId = localStorage.getItem('userId');
  localStorage.setItem('groupName', data?.groupName);

  const handleProfileClick = (id) => {
    setPostData(id);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error fetching data</div>;

  const processedPlace = data?.place
    ? JSON.parse(data.place)
        .map((item) => item.replace(/["]/g, ''))
        .join(', ')
    : '';
  return (
    <div style={{ position: 'relative' }}>
      <Wrap>
        <ProfileModal isOpen={isOpen} closeModal={closeModal} />
        <Head $heady={stkicky}>
          <BackButton onClick={() => navigate(-1)}>
            <IconComponents iconType='vectorLeft' stroke='white' />
          </BackButton>
          {stkicky && <p>{data?.groupName}</p>}
          <CamereButton onClick={() => navigate(`/postwrite/${id}`)}>
            <IconComponents iconType='camera' stroke='white' />
          </CamereButton>
        </Head>
        <div>
          <CoverImage data={data}></CoverImage>
          <Side>
            <GroupTitle>
              <Title>
                <h4>{data?.groupName}</h4>
                {Number(storedUserId) === data?.userId ? (
                  <div style={{ cursor: 'pointer' }}>
                    <IconComponents
                      iconType='vectorRight'
                      stroke='#9C9C9C'
                      viewBox='0 0 10 15'
                      width=' 6.302px'
                      height='19px'
                      onClick={() => navigate(`/groupedit/${id}`)}
                    />
                  </div>
                ) : null}
              </Title>
              <FriendAdd onClick={() => kakaoShared()}>
                <IconComponents
                  iconType='inviteFriends'
                  stroke='#8E8E8E'
                  width='15px'
                  height='15px'
                  viewBox='0 0 15 15'
                />
                <p>공유하기</p>
              </FriendAdd>
            </GroupTitle>
            <DateLocation>
              <WrapDate>
                <IconComponents
                  iconType='date'
                  width='20'
                  height='20'
                  stroke='#8E8E8E'
                />
                <p>
                  {data?.startDate.substr(0, 10).replace(/-/g, '.')}-
                  {data?.endDate.substr(0, 10).replace(/-/g, '.')}
                </p>
              </WrapDate>
              <WrapLocation>
                <IconComponents
                  iconType='location'
                  width='20'
                  height='20'
                  stroke='#8E8E8E'
                />
                <p>{processedPlace}</p>
              </WrapLocation>
            </DateLocation>
            <AvatarContainer>
              {data?.participants.map((element) => {
                return (
                  <Profile
                    key={element.userId}
                    userId={element.userId}
                    url={element.profileUrl}
                    name={element.nickname}
                    onClick={() => handleProfileClick(element)}
                  />
                );
              })}
            </AvatarContainer>
          </Side>
          <Content>
            <PlusButton
              borderradious='none'
              height='130px'
              background='#D9D9D9'
              onClick={() => {
                setPostData(data);
                navigate(`/postwrite/${id}`);
              }}
            />
            {data?.memories?.map((url, i) => {
              return (
                <Photo
                  key={i}
                  image={url.imageUrl}
                  onClick={() => navigate(`/postmain/${id}/${url.memoryId}`)}
                />
              );
            })}
          </Content>
        </div>
        <div style={{ height: '59px' }}></div>
      </Wrap>
      <Foot>
        <Footer />
      </Foot>
    </div>
  );
}
const Wrap = styled.div`
  width: 100%;
  position: relative;
  height: 100vh;
`;
const CoverImage = styled.div`
  background-image: ${(props) => `url(${props.data?.thumbnailUrl})`};
  width: 100%;
  height: 206px;
  background-position: center;
  background-size: cover;
`;
const Head = styled.div`
  display: flex;
  color: white;
  top: 0;
  justify-content: space-between;
  padding: 58px 25px 7px 25px;
  height: 93px;
  position: fixed;
  background: ${(props) => (props.$heady ? '#5873FE' : 'transparent')};
  transition: all 0.2s;
  @media (max-width: 428px) {
    width: 100%;
  }
  @media (min-width: 429px) {
    width: 428px;
  }
`;
const CamereButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;
const BackButton = styled(CamereButton)``;
const Side = styled.div`
  width: 100%;
  height: 174px;
  padding: 18px 24px;
`;
const GroupTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.div`
  display: flex;
  gap: 10px;
  h4 {
    color: #4c4c4c;
  }
`;
const FriendAdd = styled.div`
  cursor: pointer;
  display: flex;
  gap: 5px;
  p {
    color: #8e8e8e;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
const DateLocation = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
const WrapDate = styled.div`
  display: flex;
  align-items: center;
  p {
    color: #666;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
const WrapLocation = styled.div`
  display: flex;
  align-items: center;
  p {
    color: #666;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
const AvatarContainer = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 12.5px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1px;
  background: white;
`;

const Foot = styled.div`
  position: fixed;
  bottom: 0;
  @media (max-width: 428px) {
    width: 100%;
  }
  @media (min-width: 429px) {
    width: 428px;
  }
`;
