import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import api from '../api/index.jsx'

function ProtectedRoute() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await api.get('/userInfo', {
          withCredentials: true,
        });
        console.log(response.data);
        if (response.data) {
          setIsLogin(true);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    };
    checkLogin();
  }),
    [navigate];

  console.log('isLogin', isLogin);

  return isLogin ? <Outlet /> : null;
}

export default ProtectedRoute;
