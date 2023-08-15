import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Footer from '../../layout/footer/Footer.js';
import api from '../../api/index.jsx';
import { useNavigate, useParams } from 'react-router-dom';

function PostMain() {
  const [scrolltop, setScrolltop] = useState(0);
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolltop(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const Header_Max_Height = 408;
  const Header_Min_Height = 100;
  const animateHeaderHeight =
    scrolltop >= 307 ? Header_Min_Height : Header_Max_Height;

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          height: animateHeaderHeight,
          position: 'fixed',
          background: '#C2C2C2',
          width: '428px',
          top: '0',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all ease 0.5s 0s',
        }}
      >
        <Head scrolltop={scrolltop} data={data}>
          <Icons>
            <img
              src={`${process.env.PUBLIC_URL}/assets/svgs/VectorLeft.svg`}
              alt='left'
            />
            <img src={`${process.env.PUBLIC_URL}/assets/svgs/Add.svg`} alt='add' />
          </Icons>
        </Head>
        <Side
          style={{
            display: scrolltop >= 307 ? 'none' : 'block',
            background: 'white',
            height: '40%',
          }}
        >
          <MemoryName>
            <MemoryNameLeft>
              <span>{data?.groupName}</span>
              <img
                src={`${process.env.PUBLIC_URL}/assets/svgs/VectorRight.svg`}
                alt='left'
              />
            </MemoryNameLeft>
            <MemoryNameRight>
              <img
                src={`${process.env.PUBLIC_URL}/assets/svgs/AddFriend.svg`}
                alt='left'
              />
              <span>친구초대</span>
            </MemoryNameRight>
          </MemoryName>
          <Avatar>
            <div>
              <img src='' alt='' />
              <span>Name</span>
            </div>
            <div>
              <img src='' alt='' />
              <span>Name</span>
            </div>
          </Avatar>
          <Location>
            <span>{data?.place}</span>
            <span>
              {data?.startDate.substr(0, 10)}-{data?.endDate.substr(0, 10)}
            </span>
          </Location>
        </Side>
      </div>

      <WrapContent>
        <Box onClick={() => navigate(`/postwrite/${id}`)}>
          <img src={`${process.env.PUBLIC_URL}/assets/svgs/plus.svg`} alt='plus' />
        </Box>
        {data?.memories.map((e) => {
          return (
            <Box
              onClick={() => navigate(`/postdetail/${e.memoryId}`)}
              key={e.memoryId}
            >
              <img
                src={e.imageUrl}
                alt='rasm'
                height={130}
                style={{ width: '100%' }}
              />
            </Box>
          );
        })}
      </WrapContent>
      <Foot>
        <Footer />
      </Foot>
    </div>
  );
}

export default PostMain;
const Foot = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Head = styled.div`
  height: ${(props) => (props.scrolltop >= 307 ? 'none' : 'block')};
  background-image: ${(props) => `url(${props.data?.thumbnailUrl})`};
  background-position: center;
  background-size: cover;
  height: 60%;
  padding: 57px 23px;
`;
const Box = styled.div`
  display: flex;
  background: #d9d9d9;
  align-items: center;
  justify-content: center;
  height: 130px;
`;

const WrapContent = styled.div`
  margin-top: 25.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2px;
`;

const Side = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const MemoryName = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 18px 24px;
`;

const MemoryNameLeft = styled.div`
  display: flex;
  gap: 5px;
  span {
    color: #535353;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const MemoryNameRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  span {
    color: #a6a6a6;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
const Avatar = styled.div`
  display: flex;
  padding: 0px 22px 0px 22px;
  gap: 17px;

  div {
    display: flex;
    flex-direction: column;
    gap: 2px;
    text-align: center;
  }
  img {
    width: 33px;
    height: 33px;
    border-radius: 50%;
    background: #c1c1c1;
  }
  span {
    color: #a6a6a6;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
const Location = styled.div`
  display: flex;
  padding: 15px 24px;
  flex-direction: column;
  gap: 5px;
  span {
    color: #a6a6a6;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
