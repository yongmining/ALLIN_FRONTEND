const Socialkakao = () => {
  const Rest_api_key = '96fc49ad6635ee98b7975b4e00cd5322'; //REST API KEY
  const redirect_uri = 'http://localhost:3000/auth'; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <>
      <div className="kakaologin">
        <button onClick={handleLogin}>카카오 로그인</button>
        .........{' '}
      </div>
    </>
  );
};
export default Socialkakao;
