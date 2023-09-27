import React from 'react';
import '../../css/allModal.css';

function FbModal() {
  return (
    <div className="allModal">
      <div className="fbmainContent">
        <div>'You Film Face?'을 사용하시면서 어떠셨나요?</div>
        <div>만족도와 개선할 점을 알려주세요!</div>
      </div>
      <div className="fbsubContent">피드백은 저희에게 큰 힘이 됩니다</div>
      <div className="allmdBtn">
        <button>닫기</button>
        <button>작성</button>
      </div>
    </div>
  );
}

export default FbModal;
