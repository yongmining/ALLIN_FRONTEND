import React, { useRef, useEffect } from "react";
import "../../css/mainContents.css";
import { useNavigate } from "react-router-dom";

function MainContents() {
  const navigate = useNavigate();

  const goToYoutube = () => {
    navigate("/choicecontents/YouTubeList");
  };

  const goToBook = () => {
    navigate("/choicecontents/bookList");
  };
  const goToMusic = () => {
    navigate("/choicecontents/musicList");
  };
  const goToExercise = () => {
    navigate("/choicecontents/exerciseList");
  };

  return (
    <div className="main">
      <div className="main-info">
        <div className="main-left">
          <img className="main-img" src="/img/exImg.png" alt="내 이미지" />
        </div>
        <div className="main-info-right">
          <h5>닉네임 : 5글자 제한</h5>
          <h5>나이 : 24살 </h5>
          <h5>성별 : 남자</h5>
          <h5>감정 : 슬픔</h5>
        </div>
      </div>
      <div className="today-comment">
        <h3>오늘도 당신의 남은 인생 중, 첫 번쨰 날이다.</h3>
      </div>
      <div className="choice-box">
        <div className="choice-btn">
          <button className="choice-btns" onClick={goToYoutube}>
            유튜브
          </button>
          <button className="choice-btns" onClick={goToBook}>
            책
          </button>
        </div>
        <div className="choice-btn">
          <button className="choice-btns" onClick={goToMusic}>
            노래
          </button>
          <button className="choice-btns" onClick={goToExercise}>
            운동
          </button>
          <button className="choice-btns">상담</button>
        </div>
      </div>
    </div>
  );
}

export default MainContents;
