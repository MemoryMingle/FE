import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import GroupPageHeader from '../../layout/header/GroupPageHeader';
import Footer from '../../layout/footer/Footer.js';
import { getGroupData } from '../../api/groupMainApi';
import { useQuery } from 'react-query';

function GroupMain() {
  const navigate = useNavigate();
  const writeButtonHandler = () => {
    navigate(`/groupwrite`);
  };

  // groupdata 가져오기
  const {
    data: groupData,
    isError,
    isLoading,
  } = useQuery('groupData', getGroupData);

  return (
    <>
      <MainContainer>
        <GroupPageHeader />
        <GroupWrapper>
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error fetching group data</div>
          ) : groupData && groupData.length === 0 ? (
            <PreMainContainer>
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/3dhand.png`}
                alt='handicon'
              />
              <PreMainContentWrapper>
                <PreMainText>지금 추억을 추가해보세요 </PreMainText>
                <PreMainButton onClick={writeButtonHandler}>
                  <PreMainPlus
                    src={`${process.env.PUBLIC_URL}/assets/image/plusimg.png`}
                    alt='logo'
                  />
                  추억 만들기
                </PreMainButton>
              </PreMainContentWrapper>
            </PreMainContainer>
          ) : (
            <>
              <ButtonWrapper>
                <WriteButton onClick={writeButtonHandler}>
                  <PlusImage
                    src={`${process.env.PUBLIC_URL}/assets/image/plusimg.png`}
                    alt='logo'
                  />
                </WriteButton>
              </ButtonWrapper>
              {groupData.map((item) => {
                const formattedStartDate = item.startDate
                  ? item.startDate.slice(0, 10)
                  : '';
                const formattedEndDate = item.endDate
                  ? item.endDate.slice(0, 10)
                  : '';

                return (
                  <ButtonWrapper key={item.groupId}>
                    <GroupEditButton
                      onClick={() => navigate(`/groupedit/${item.groupId}`)}
                    >
                      <EditIcon
                        src={`${process.env.PUBLIC_URL}/assets/svgs/iconedit.svg`}
                        alt='editicon'
                      />
                    </GroupEditButton>
                    <GroupDetailButton
                      onClick={() => navigate(`/postmain/${item.groupId}`)}
                    >
                      {' '}
                      <ThumbNaiilImage src={item.thumbnailUrl} alt='cover' />
                    </GroupDetailButton>
                    <div
                      style={{
                        lineHeight: '1px',
                        paddingLeft: '2px',
                        marginTop: '12px',
                      }}
                    >
                      <h4> {item.groupName}</h4>
                      <p
                        style={{
                          fontSize: '12px',
                          color: 'gray',
                          marginTop: '12px',
                        }}
                      >
                        {formattedStartDate}~{formattedEndDate}
                      </p>
                    </div>
                  </ButtonWrapper>
                );
              })}
            </>
          )}
        </GroupWrapper>
        <footer style={{ marginTop: 'auto' }}>
          <Footer />
        </footer>
      </MainContainer>
    </>
  );
}

export default GroupMain;

const GroupEditButton = styled.button`
  position: absolute;
  right: 10px;
  top: 12px;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const GroupDetailButton = styled.button`
  width: 100%;
  height: 170px;
  border-radius: 12px;
  border: none;
`;

const EditIcon = styled.img`
  width: 8px;
  height: 23px;
`;
const ThumbNaiilImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

//container and wrapper
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const GroupWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  align-items: flex-start;
  justify-content: flex-start;
`;
const ButtonWrapper = styled.div`
  margin-top: 12px;
  width: 40%;
  padding-bottom: 24px;
  cursor: pointer;
  margin-left: 24px;
  position: relative;
`;

//styled
const WriteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 170px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 50px;
  color: white;
  background-color: rgba(88, 115, 254, 1);
`;

const PlusImage = styled.img`
  margin: 0;
`;

const PreMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
`;

const PreMainContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  margin-top: 1rem;
  align-items: center;
`;

const PreMainButton = styled.button`
  border: none;
  width: 167px;
  height: 52px;
  border-radius: 26.321px;
  background: #5873fe;
  color: #fff;
`;

const PreMainText = styled.p`
  color: #4c4c4c;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const PreMainPlus = styled.img`
  width: 12px;
`;
