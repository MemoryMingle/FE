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
import PasswordChange from '../pages/mypage/PasswordChange.jsx';
import Post from '../pages/post/Post.jsx';
import GroupEdit from '../pages/group/GroupEdit.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Introduction />} />
        <Route path='/login' element={<Login />} />
        <Route path='/api/login/kakao/callback' element={<KakaoLoginRedirect />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/userinfo' element={<UserInfo />} />
        <Route path='/groupmain' element={<ProtectedRoute />}>
          <Route index element={<GroupMain />} />
        </Route>
        <Route path='/groupwrite' element={<ProtectedRoute />}>
          <Route index element={<GroupWrite />} />
        </Route>
        <Route path='/postmain/:id' element={<ProtectedRoute />}>
          <Route index element={<PostMain />} />
        </Route>
        <Route path='/postwrite/:id' element={<ProtectedRoute />}>
          <Route index element={<PostWrite />} />
        </Route>
        <Route path='/mypage' element={<ProtectedRoute />}>
          <Route index element={<MyPage />} />
        </Route>
        <Route path='/pwchange' element={<ProtectedRoute />}>
          <Route index element={<PasswordChange />} />
        </Route>
        <Route path='/post' element={<ProtectedRoute />}>
          <Route index element={<Post />} />
        </Route>
        <Route path='/groupedit/:id' element={<ProtectedRoute />}>
          <Route index element={<GroupEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
