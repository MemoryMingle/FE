import React, { useState } from 'react';
import { styled } from 'styled-components';
import Avatar from '../avatar/Avatar.jsx';
import CommentDropDown from '../../commentDropdown/CommentDropDown.jsx';
import days from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import IconComponents from '../iconComponent/IconComponents.jsx';

export default function Comment(prop) {
  const { comment, createdAt, commentDeleta, commentId, commentEdit } = prop;
  const storedUserId = localStorage.getItem('userId');
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const handleCommentEdit = async () => {
    await commentEdit(commentId, editedComment);
    setIsEditing(false);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommentEdit();
    }
  };
  days.extend(relativeTime).locale('ko');
  const commentTime = days(createdAt).fromNow();

  return (
    <Wrap>
      <UserInfo>
        <Avatar src={prop['User.profileUrl']} width='40px' height='40px' />
        <div>
          <NickName>{prop['User.nickname']}</NickName>
          <CreatedAt>{commentTime}</CreatedAt>
          {isEditing ? (
            <EditInputWrap>
              <EditInput
                type='text'
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                onKeyPress={handleKeyPress}
                onKeyDown={handleKeyPress}
              />
              <BTN onClick={handleCommentEdit}>
                <IconComponents
                  iconType='myPageCheck'
                  stroke='#4C4C4C'
                  width='17'
                  height='13'
                  viewBox='0 0 17 13'
                />
              </BTN>
            </EditInputWrap>
          ) : (
            <UserComment>{comment} </UserComment>
          )}
        </div>
      </UserInfo>
      {storedUserId == prop.userId ? (
        <ButtonWrap>
          <CommentDropDown
            commentDeleta={commentDeleta}
            toggleEdit={toggleEdit}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />
        </ButtonWrap>
      ) : null}
    </Wrap>
  );
}
const Wrap = styled.div`
  padding: 14px 25px 18px 23px;
  display: flex;
  height: 92px;
  justify-content: space-between;
  border-bottom: 0.5px solid #e4e4e4;
  background: white;
`;
const ButtonWrap = styled.div``;

const UserInfo = styled.div`
  word-break: break-all;
  display: flex;
  gap: 9px;
`;
const NickName = styled.div`
  color: #444;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const CreatedAt = styled(NickName)`
  color: #8888;
  padding-top: 3px;
`;
const UserComment = styled.div`
  color: #4c4c4c;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  padding-top: 8px;
  line-height: normal;
  color: #4c4c4c;
`;
const EditInput = styled.input`
  border-top: none;
  border-left: none;
  border-right: none;
  padding-right: 25px;
  width: 200px;
  border-bottom: 0.1px solid #6666;
  color: #4c4c4c;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  outline: none;
`;
const EditInputWrap = styled.div`
  position: relative;
`;
const BTN = styled.button`
  margin-left: 8px;
  position: absolute;
  right: 0;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`;
