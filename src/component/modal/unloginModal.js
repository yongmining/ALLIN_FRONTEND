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
    closeModal();
    navigate('/profil');
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
