//import React, { useRef, useEffect } from "react";
import "../css/mainContents.css";

function mainContents() {
  return (
    <div className="main">
      <div className="main-info">
        <img className="main-img" src="/img/exImg.png" alt="내 이미지" />
        <div>
          <h5>닉네임 : 5글자 제한</h5>
          <h5>나이 : 24살 </h5>
          <h5>성별 : 남자</h5>
          <h5>감정 : 슬픔</h5>
        </div>
      </div>
    </div>
  );
}

export default mainContents;
