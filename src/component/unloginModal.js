import React from "react";

function Modal({ isOpen, closeModal }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">경고</h5>
      </div>
      <div class="modal-body">
        <p>비회원 로그인할 경우 정보가 누적되지 않아서 개인 맞춤형 콘텐츠를 이용 못할 수 있습니다</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>확인</button>
      </div>
    </div>
  </div>
</div>
  );
}

export default Modal;