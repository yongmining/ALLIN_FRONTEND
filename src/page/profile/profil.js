import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../css/profil.css';
import { getCurrentMember, getUpdateMember, getGuestMembmer } from '../../api/memberApi';
import { callKakaoLogoutAPI } from '../../api/loginApi';

function Profil() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const members = useSelector((store) => store.memberReducer);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getCurrentMember());
    } else {
      dispatch(getGuestMembmer());
    }
  }, []);

  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState(null);
  const [isMaleChecked, setIsMaleChecked] = useState(false);
  const [isFemaleChecked, setIsFemaleChecked] = useState(false);

  const [form, setForm] = useState({
    memberNickname: '',
    memberAge: '',
    memberGender: '',
  });

  const logout = () => {
    dispatch(callKakaoLogoutAPI());
    navigate('/', { replace: true });
  };

  const handleNicknameChange = (e) => {
    const input = e.target.value.substring(0, 5);
    setNickname(input);
  };

  const handleMaleCheckboxChange = () => {
    // 남자 체크박스 변경 시
    setIsMaleChecked(!isMaleChecked);
    // 여자 체크 해제
    if (!isMaleChecked) {
      setIsFemaleChecked(false);
    }
  };

  const handleFemaleCheckboxChange = () => {
    // 여자 체크박스 변경 시
    setIsFemaleChecked(!isFemaleChecked);
    // 남자 체크 해제
    if (!isFemaleChecked) {
      setIsMaleChecked(false);
    }
  };

  const handleAgeInputChange = (e) => {
    const input = e.target.value;
    if (input === '' || (parseInt(input, 10) >= 1 && parseInt(input, 10) <= 99)) {
      setAge(input === '' ? null : parseInt(input, 10));
    }
  };

  const handleRegistration = () => {
    const memberNo = members.memberNo;
    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    // FormData나 다른 방식으로 수정할 데이터 설정
    const updatedData = {
      memberNickname: nickname,
      memberAge: age,
      memberGender: isMaleChecked ? '남자' : '여자',
      // 필요한 경우 다른 데이터도 포함
    };

    setForm(updatedData);
    dispatch(getUpdateMember(memberNo, updatedData));
    navigate('/takepictureanalyze');
  };

  return (
    <div className="profil">
      <img className="profilImage" src={members.memberImage} alt="ProfilImage" />
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
        <button onClick={logout}>취소</button>
      </div>
    </div>
  );
}

export default Profil;
