export const onChangeNicknameHandler = (e, setNickname, setNicknameError = null) => {
  const value = e.target.value;
  setNickname(value);
  if (setNicknameError) nicknameCheckHandler(value, setNicknameError);
  else nicknameCheckHandler(value);
};

export const nicknameCheckHandler = (nickname, setNicknameError = null) => {
  const nicknameCheck = /^.{1,10}$/;
  if (nickname === '') {
    if (setNicknameError) setNicknameError('닉네임을 입력해주세요.');
    return false;
  } else if (!nicknameCheck.test(nickname)) {
    if (setNicknameError) setNicknameError('닉네임은 10자 이하로 입력해주세요.');
    return false;
  } else {
    if (setNicknameError) setNicknameError('');
    return true;
  }
};
