import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../css/profil.css';
import { getCurrentMember, getUpdateMember, getGuestMember, getUpdateGuest } from '../../api/memberApi';
import { callKakaoLogoutAPI } from '../../api/loginApi';

function Profil() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const members = useSelector((store) => store.memberReducer);
  const guest = useSelector((store) => store.guestReducer);

  const isMember = localStorage.getItem('accessToken') !== null;
  const isGuest = localStorage.getItem('guestCode') !== null;

  useEffect(() => {
    if (isMember) {
      dispatch(getCurrentMember());
    } else if (isGuest) {
      dispatch(getGuestMember());
    }
  }, [dispatch, isMember, isGuest]);

  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState(null);
  const [isMaleChecked, setIsMaleChecked] = useState(false);
  const [isFemaleChecked, setIsFemaleChecked] = useState(false);

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
    if (isMember) {
      // 멤버 업데이트 데이터 준비
      if (!nickname.trim()) {
        alert('닉네임을 입력해주세요.');
        return;
      }

      const dataToUpdate = {
        memberNickname: nickname,
        memberAge: age,
        memberGender: isMaleChecked ? '남자' : '여자',
      };

      dispatch(getUpdateMember(members.memberNo, dataToUpdate));
    } else if (isGuest) {
      // 게스트 업데이트 데이터 준비
      const dataToUpdate = {
        guestNickname: 'Guest', // 고정된 값 'Guest'
        guestAge: age,
        guestGender: isMaleChecked ? '남자' : '여자',
      };

      dispatch(getUpdateGuest(guest.socialCode, dataToUpdate));
    }

    navigate('/takepictureanalyze');
  };

  return (
    <div className="profil">
      <br />
      <br />

      <img className="profilImage" src={isMember ? members.memberImage : guest && guest.guestImage} alt="ProfilImage" />
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
            value={age === null ? '' : age}
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
