import React, { useRef, useEffect } from "react";
import "../../css/mainContents.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { phraseListAPI } from "../../api/phraseApi"; // API 파일의 경로를 적절하게 수정하세요.

function MainContents() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const phrase = useSelector((state) => state.phrase); // Redux state의 구조에 따라 경로를 적절히 수정해야 합니다.

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

  useEffect(() => {
    dispatch(phraseListAPI({ currentPage: 1 })); // currentPage 값이 필요하다면 수정하세요.
  }, [dispatch]);

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
        <h3>{phrase ? phrase : "데이터 로딩 중..."}</h3>
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
