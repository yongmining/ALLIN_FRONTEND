import React, { useState } from 'react';
import '../../css/profil.css'; // CSS 파일을 import
import { useNavigate } from 'react-router-dom';

function Profil() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState(null); // 나이 상태 (null로 초기화)
  const [isMaleChecked, setIsMaleChecked] = useState(false); // 남자 체크 여부 상태
  const [isFemaleChecked, setIsFemaleChecked] = useState(false); // 여자 체크 여부 상태
  const [profilImageUrl, setprofilImageUrl] = useState(''); // 랜덤 이미지 URL 상태

  const handleNicknameChange = (e) => {
    // 닉네임 입력 시 최대 5자로 제한
    const input = e.target.value.substring(0, 5);
    setNickname(input);
  };

  const handleMaleCheckboxChange = () => {
    // 남자 체크박스 변경 시
    setIsMaleChecked(!isMaleChecked); // 체크 상태를 반전
    // 여자 체크 해제
    if (!isMaleChecked) {
      setIsFemaleChecked(false);
    }
  };

  const handleFemaleCheckboxChange = () => {
    // 여자 체크박스 변경 시
    setIsFemaleChecked(!isFemaleChecked); // 체크 상태를 반전
    // 남자 체크 해제
    if (!isFemaleChecked) {
      setIsMaleChecked(false);
    }
  };

  const handleAgeInputChange = (e) => {
    // 나이 입력 변경 시
    const input = e.target.value;
    // 입력값이 비어 있으면 null로 설정
    if (input === '' || (parseInt(input, 10) >= 1 && parseInt(input, 10) <= 99)) {
      setAge(input === '' ? null : parseInt(input, 10));
    }
  };

  const getProfilImage = () => {
    // 백엔드에서 랜덤 이미지 URL을 가져와서 상태에 설정
    // 예시: const randomImageUrl = 'https://example.com/random-image.jpg';
    // 아래처럼 백엔드에서 이미지 URL을 가져오는 방식으로 수정하세요.
    // axios 또는 fetch를 사용하여 백엔드 API에서 이미지 URL을 가져올 수 있습니다.
    // 이 예제에서는 랜덤한 URL을 사용하므로 실제 백엔드 호출을 대체합니다.
    const profilImageUrl = 'https://example.com/random-image.jpg';
    setprofilImageUrl(profilImageUrl);
  };

  const handleRegistration = () => {
    // 사용자가 입력한 정보를 저장하거나 활용하는 코드를 작성하세요.

    // 예를 들어, 다음 페이지로 이동하고 사용자 정보를 props로 전달할 수 있습니다.
    navigate('/takepicture', { state: { nickname, age, isMaleChecked, isFemaleChecked, profilImageUrl } });
  };

  return (
    <div className="profil">
      <img className="profilImage" src={getProfilImage} alt="ProfilImage" />
      <div className="profilText">
        <div>
          닉네임 : &nbsp;
          <input
            type="text"
            name="nickname"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={handleNicknameChange}
          />
        </div>
        <div>
          나 이 :&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            name="age"
            placeholder="나이를 입력해주세요 (1~99)"
            value={age === null ? '' : age} // null이면 빈 문자열로 표시
            onChange={handleAgeInputChange}
          />
        </div>
        <div className="genderbox">
          성 별 : &nbsp;&nbsp;&nbsp;
          <div>
            남자
            <input type="checkbox" name="genderMale" checked={isMaleChecked} onChange={handleMaleCheckboxChange} />
          </div>
          &nbsp;&nbsp;
          <div>
            여자
            <input
              type="checkbox"
              name="genderFemale"
              checked={isFemaleChecked}
              onChange={handleFemaleCheckboxChange}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
      <div className="allmdBtn">
        <button onClick={handleRegistration}>등록</button>
        <button onClick={() => navigate('/')}>취소</button>
      </div>
    </div>
  );
}

export default Profil;
