import React, { useState } from 'react';
import '../../css/allModal.css';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL } from '../../modules/modalModule';
import { useNavigate } from 'react-router-dom';
import FeedBack from '../../page/feedback';
import Modal from 'react-modal';

function FbModal({ closeshowFbModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showFeedback, setShowFeedback] = useState(false);

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const openFeedback = () => {
    setShowFeedback(true);
  };
  const closeFeedback = () => {
    setShowFeedback(false);
  };

  const onFbCloseClickhandle = () => {
    closeshowFbModal();
  };

  return (
    <div className="allModal">
      <div className="fbmainContent">
        <div>'You Film Face?'을 사용하시면서 어떠셨나요?</div>
        <div>만족도와 개선할 점을 알려주세요!</div>
      </div>
      <div className="fbsubContent">피드백은 저희에게 큰 힘이 됩니다</div>
      <div className="allmdBtn">
        <button onClick={openFeedback}>작성</button>
        <button onClick={onFbCloseClickhandle}>닫기</button>
      </div>
      <Modal className="modal-backdrop" isOpen={showFeedback}>
        <FeedBack closeFeedback={closeFeedback} />
      </Modal>
    </div>
  );
}

export default FbModal;
