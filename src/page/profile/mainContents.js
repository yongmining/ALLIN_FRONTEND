import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/mainContents.css';
import { useNavigate } from 'react-router-dom';
import { getCurrentMember } from '../../api/memberApi';
import { phraseListAPI } from "../../api/phraseApi"; // API 파일의 경로를 적절하게 수정하세요.


function MainContents() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const phrase = useSelector((state) => state.phrase); // Redux state의 구조에 따라 경로를 적절히 수정해야 합니다.

  const members = useSelector((store) => store.memberReducer);

  useEffect(() => {
    dispatch(getCurrentMember());
  }, []);

  const goToYoutube = () => {
    navigate('/choicecontents/YouTubeList');
  };

  const goToBook = () => {
    navigate('/choicecontents/bookList');
  };
  const goToMusic = () => {
    navigate('/choicecontents/musicList');
  };
  const goToExercise = () => {
    navigate('/choicecontents/exerciseList');
  };
  const goToClinic = () => {
    navigate('/clinicList');
  };

  useEffect(() => {
    dispatch(phraseListAPI({ currentPage: 1 })); // currentPage 값이 필요하다면 수정하세요.
  }, [dispatch]);

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
        <h3>{phrase ? phrase : "데이터 로딩 중..."}</h3>
      </div>

      <div className="choice-box">
        <div className="choice-btn">
          <img src={'./../img/youtubeLogo.png'} onClick={goToYoutube} alt="유튜브 로고" />
          <img src={'./../img/bookLogo.png'} onClick={goToBook} alt="책 로고" />
        </div>
        <div className="choice-btn">
          <img src={'./../img/musicLogo.png'} onClick={goToMusic} alt="음악 로고" />
          <img src={'./../img/runLogo.png'} onClick={goToExercise} alt="운동 로고" />
          <img src={'./../img/clinicLogo.png'} onClick={goToClinic} alt="상담 로고" />
        </div>
      </div>
    </div>
  );
}

export default MainContents;
