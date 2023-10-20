import React, { useState } from 'react';
import '../css/home.css';
import UnloginModal from '../component/modal/unloginModal';
import Modal from 'react-modal';

const KAKAO_REST_API_KEY = '23a9d20514279e743aea8c6d1225c1b2';
const KAKAO_REDIRECT_URI = `http://localhost:3000/kakao/callback`;
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
