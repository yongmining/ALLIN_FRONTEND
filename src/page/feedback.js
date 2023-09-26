import React from 'react';
import '../css/feedback.css';

function FeedBack() {
  return (
    <div className="container">
      'You Film Face ?'에 대한 자신의 의견을 말해주세요!
      <br />
      <br />
      <textarea className="fbContent"></textarea>
      <br />
      <div className="fbBtn">
        <button>닫기</button>
        <button>제출</button>
      </div>
    </div>
  );
}

export default FeedBack;
