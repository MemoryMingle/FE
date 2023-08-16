import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Footer from '../../layout/footer/Footer';
import useStickyMode from '../../hooks/useStickyMode.jsx';
import IconComponents from '../../components/common/iconComponent/IconComponents.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/index.jsx';

export default function PostMain() {
  const stkicky = useStickyMode(115);
  console.log(stkicky);
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(id);
    api.get(`group/${id}`, { withCredentials: true }).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);
  const processedPlace = data?.place
    ? JSON.parse(data.place)
        .map((item) => item.replace(/["]/g, ''))
        .join(', ')
    : '';

  return (
    <div style={{ position: 'relative' }}>
      <Wrap>
        <Head $heady={stkicky}>
          <IconComponents iconType='vectorLeft' stroke='white' />
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
                <h3>{data?.groupName}</h3>
                <IconComponents iconType='vectorRight' stroke='#787777' />
              </Title>
              <FriendAdd>
                <IconComponents iconType='inviteFriends' stroke='#8E8E8E' />
                <p>친구초대</p>
              </FriendAdd>
            </GroupTitle>
            <DateLocation>
              <WrapDate>
                <IconComponents iconType='date' stroke='#8E8E8E' />
                <p>
                  {' '}
                  {data?.startDate.substr(0, 10)}~{data?.endDate.substr(0, 10)}
                </p>
              </WrapDate>
              <WrapLocation>
                <IconComponents iconType='location' stroke='#8E8E8E' />
                <p>{processedPlace}</p>
              </WrapLocation>
            </DateLocation>
            <AvatarContainer>
              {data?.participants.map((element) => {
                return (
                  <AvatarWrap key={element.userId}>
                    <AvatarImage src={element.profileUrl} />
                    <span>{element.nickname}</span>
                  </AvatarWrap>
                );
              })}
            </AvatarContainer>
          </Side>
          <Content>
            {Array.from({ length: 1 }, (_, index) => (
              <Box key={index} />
            ))}
          </Content>
        </div>
        <div style={{ height: '72px' }}></div>
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
`;
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
  gap: 12px;
  h3 {
    color: #4c4c4c;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
const FriendAdd = styled.div`
  display: flex;
  p {
    color: #8e8e8e;
    font-size: 12px;
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
    font-weight: 600;
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
    font-weight: 600;
    line-height: normal;
  }
`;
const AvatarContainer = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 12.5px;
`;
const AvatarWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5px;
  align-items: center;
  span {
    color: #4c4c4c;
    font-size: 11px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
const AvatarImage = styled.img`
  width: 43px;
  height: 43px;
  border-radius: 50%;
  background: black;
`;
const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5px;
`;
const Box = styled.div`
  height: 130px;
  background: #555;
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
