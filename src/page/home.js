import React, { useState } from 'react';
import '../css/home.css';
import UnloginModal from '../component/modal/unloginModal';
import Modal from 'react-modal';
// import { OPEN_MODAL, CLOSE_MODAL } from '../modules/modalModule';

const KAKAO_REST_API_KEY = '96fc49ad6635ee98b7975b4e00cd5322';
const KAKAO_REDIRECT_URI = `http://localhost:3000/auth`;
const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

const Home = () => {
  const [showUnloginModal, setShowUnloginModal] = useState(false);

  const loginHandler = (platform) => {
    switch (platform) {
      case 'N':
        openUnloginModal();
        break;
      case 'K':
        window.location.href = KAKAO_AUTH_URI;
        break;
      default:
        break;
    }
  };

  const openUnloginModal = () => {
    setShowUnloginModal(true);
  };
  const closeUnloginModal = () => {
    setShowUnloginModal(false);
  };

  return (
    <div className="home">
      <div className="title">
        <div>You Film</div>
        <div>Face ?</div>
        <p>감정을 보여주세요</p>
      </div>

      <div onClick={() => loginHandler('K')}>
        <img src="../../../img/kakaologin.png" alt="카카오 로그인" />
      </div>
      <div onClick={() => loginHandler('N')}>
        <img src="../../../img/unlogin.png" alt="비회원 로그인" />
      </div>
      <Modal className="modal-backdrop" isOpen={showUnloginModal} onRequestClose={closeUnloginModal}>
        <UnloginModal />
      </Modal>
    </div>
  );
};

export default Home;
