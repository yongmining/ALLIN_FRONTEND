import { useLocation } from 'react-router-dom';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callKakaoLogoutAPI } from '../api/loginApi';
import '../css/common.css';
import { deleteGuest } from '../api/memberApi';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = JSON.parse(window.localStorage.getItem('accessToken'));

  const logout = () => {
    dispatch(callKakaoLogoutAPI());
    dispatch(deleteGuest());
    navigate('/', { replace: true });
  };

  const isProfilePage = location.pathname === '/profil';
  const isMainPage = location.pathname === '/';

  return (
    <div className="common">
      <div className="headerLogo">
        <img src="/img/logo.png" alt="Logo" onClick={logout} />
        <div className="custom-link" onClick={logout}>
          All-in
        </div>
      </div>
      {token && !isProfilePage && !isMainPage && (
        <header className="back-color">
          <div>
            <span onClick={() => navigate(`/profilInfo`)}>마이페이지</span>
            <span onClick={logout}>로그아웃</span>
          </div>
        </header>
      )}
    </div>
  );
}

export default Header;
