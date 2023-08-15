import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Footer from '../../layout/footer/Footer';
import useStickyMode from '../../hooks/useStickyMode.jsx';
import IconComponents from '../../components/common/iconComponent/IconComponents.jsx';
import { useParams } from 'react-router-dom';
import api from '../../api/index.jsx';

export default function Test() {
  const stkicky = useStickyMode(115);
  console.log(stkicky);
  const [data, setData] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    api.get(`group/${id}`, { withCredentials: true }).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);
  return (
    <div style={{ position: 'relative' }}>
      <Wrap>
        <Head $heady={stkicky}>
          <IconComponents iconType='vectorLeft' stroke='white' />
          {stkicky && <p>{data?.groupName}</p>}
          <IconComponents iconType='camera' stroke='white' />
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
          </Side>
          <Content>
            {Array.from({ length: 17 }, (_, index) => (
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
const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid green;
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
