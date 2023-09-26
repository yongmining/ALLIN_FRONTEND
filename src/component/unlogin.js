import React, { useState } from 'react';
import Modal from './modal/unloginModal';

function Unlogin() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="unlogin">
      <button onClick={openModal}>비회원 로그인</button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default Unlogin;
