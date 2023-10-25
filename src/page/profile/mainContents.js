import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../css/mainContents.css";
import { useNavigate } from "react-router-dom";
import { getCurrentMember, getGuestMembmer } from "../../api/memberApi";
import { Link } from "react-router-dom"; // React Router의 Link를 사용
import { emotionPhraseList } from "../../api/phraseApi";

function MainContents() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const members = useSelector((store) => store.memberReducer);

  const emotionPhrase = useSelector((store) => store.phraseReducer);
  useEffect(() => {
    dispatch(emotionPhraseList());
  }, []);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getCurrentMember());
    } else {
      dispatch(getGuestMembmer());
    }
  }, []);

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
  const goToClinic = () => {
    navigate("/clinicList");
  };

  return (
    <div className="main">
      <div className="main-info">
        <div className="main-left">
          <img className="main-img" src={members.memberImage} alt="내 이미지" />
        </div>
        <div className="main-info-right">
          <h5>닉네임 : {members.memberNickname}</h5>
          <h5>나이 : {members.memberAge} </h5>
          <h5>성별 : {members.memberGender}</h5>
          <h5>감정 : 슬픔</h5>
        </div>
      </div>
      <div className="today-comment">
        <h3>{emotionPhrase.emotionPhraseContent}</h3>
      </div>

      <div className="choice-box">
        <div className="choice-btn">
          <img
            src={"./../img/youtubeLogo.png"}
            onClick={goToYoutube}
            alt="유튜브 로고"
          />
          <img src={"./../img/bookLogo.png"} onClick={goToBook} alt="책 로고" />
        </div>
        <div className="choice-btn">
          <img
            src={"./../img/musicLogo.png"}
            onClick={goToMusic}
            alt="음악 로고"
          />
          <img
            src={"./../img/runLogo.png"}
            onClick={goToExercise}
            alt="운동 로고"
          />
          <img
            src={"./../img/clinicLogo.png"}
            onClick={goToClinic}
            alt="상담 로고"
          />
        </div>
      </div>
    </div>
  );
}

export default MainContents;
