import { Link, useLocation } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callKakaoLogoutAPI } from "../api/loginApi";
import "../css/common.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = JSON.parse(window.localStorage.getItem("accessToken"));

  const logout = () => {
    dispatch(callKakaoLogoutAPI());
    navigate("/", { replace: true });
  };

  const isProfilePage = location.pathname === "/profil";
  const isMainPage = location.pathname === "/";

  return (
    <div className="common">
      <div className="headerLogo">
        <img src="/img/logo.png" alt="Logo" />
        <Link to="/" className="custom-link">
          All-in
        </Link>
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
