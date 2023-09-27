import React from 'react';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL } from '../../modules/modalModule';
import { useNavigate } from 'react-router-dom';

function UnloginModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const onClickhandle = () => {
    //백엔드에서 회원아이디를 생성 또는 찾아서 받는 법
    closeModal();
    navigate('/profil');
    // navigate('/takepicture');
    //IF 조건문을 써서 기존 회원일경우 촬영으로 아닐경우 프로필 정보 등록 쪽으로
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
