import React from 'react';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL } from '../../modules/modalModule';
import { useNavigate } from 'react-router-dom';
import { callGuestLoginAPI } from '../../api/loginApi';

function UnloginModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  function generateUniqueCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codeLength = 8;
    let code = '';

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    localStorage.setItem('guestCode', code);
    return code;
  }

  const onClickhandle = async () => {
    closeModal();
    const code = generateUniqueCode();
    console.log(code);
    try {
      await dispatch(callGuestLoginAPI(code));
      navigate('/profil');
    } catch (error) {
      console.log('오류남');
    }
  };

  return (
    <div className="allModal">
      <div className="unloginTitle">경고</div>
      <div className="unloginsubContent">
        <div>비회원 로그인할 경우 정보가 누적되지 않아서</div>
        <div>개인 맞춤형 컨텐츠를 이용 못할 수 있습니다.</div>
      </div>
      <div className="allmdBtn">
        <button onClick={onClickhandle}>확인</button>
      </div>
    </div>
  );
}

export default UnloginModal;
