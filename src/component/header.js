import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callKakaoLogoutAPI } from '../api/loginApi';
import '../css/common.css';
import { deleteGuest } from '../api/memberApi';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = JSON.parse(window.localStorage.getItem('accessToken'));
  const code = JSON.parse(window.localStorage.getItem('guestCode'));

  const logout = () => {
    if (token) {
      dispatch(callKakaoLogoutAPI());
    } else if (code) {
      dispatch(deleteGuest());
    }
    navigate('/', { replace: true });
  };

  console.log(token);
  console.log(code);

  return (
    <div className="common">
      <div className="headerLogo">
        <img src="/img/logo.png" alt="Logo" onClick={logout} />
        <div className="custom-link" onClick={logout}>
          All-in
        </div>
      </div>
      {token && (
        <header className="back-color dis-flex align-center">
          <span onClick={() => navigate(`/profilInfo`)}>마이페이지</span>
          <span onClick={logout}>로그아웃</span>
        </header>
      )}
    </div>
  );
}

export default Header;
