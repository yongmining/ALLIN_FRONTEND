import React from 'react';

const KAKAO_REST_API_KEY = '96fc49ad6635ee98b7975b4e00cd5322';
const KAKAO_REDIRECT_URI = `http://localhost:3000/auth`;
const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
const loginHandler = (platform) => {
  switch (platform) {
    case 'N':
      // window.location.href =
      break;
    case 'K':
      window.location.href = KAKAO_AUTH_URI;
      break;
    default:
      break;
  }
};

const Home = () => {
  return (
    <div>
      <div className="home">
        <p>You Film Face?</p>
      </div>
      <div className="home">
        <p>감정을 보여주세요</p>
        <div>
          <div onClick={() => loginHandler('K')}>
            <img src="../../../img/kakaoLogin.png" alt="카카오 로그인" />
          </div>
          <br />
          <button onClick={() => loginHandler('N')}>비회원 로그인</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
