import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GroupMain from '../pages/group/GroupMain.jsx';
import Login from '../pages/signup-login/Login.jsx';
import Signup from '../pages/signup-login/Signup.jsx';
import GroupWrite from '../pages/group/GroupWrite.jsx';
import MyPage from '../pages/mypage/MyPage.jsx';
import Introduction from '../pages/app-introduction/Introduction.jsx';
import UserInfo from '../pages/signup-login/UserInfo.jsx';
import PostMain from '../pages/post/PostMain.jsx';
import PostWrite from '../pages/post/PostWrite.jsx';
import KakaoLoginRedirect from '../pages/kakao-login/KakaoLoginRedirect.jsx';
import Post from '../pages/post/Post.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Introduction />} />
        <Route path='/login' element={<Login />} />
        <Route path='/kakao/callback' element={<KakaoLoginRedirect />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/userinfo' element={<UserInfo />} />
        <Route path='/groupmain' element={<GroupMain />} />
        <Route path='/groupwrite' element={<GroupWrite />} />
        <Route path='/postmain/:id' element={<PostMain />} />
        <Route path='/postwrite/:id' element={<PostWrite />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/post' element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
