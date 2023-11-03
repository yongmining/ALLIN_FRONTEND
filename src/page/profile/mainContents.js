import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../css/mainContents.css";
import { useNavigate } from "react-router-dom";
import { getCurrentMember, getGuestMember } from "../../api/memberApi";
import { emotionPhraseList } from "../../api/phraseApi";
import Modal from "react-modal";
import FbModal from "../../component/modal/fbModal";

function MainContents() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showFbModal, setshowFbModal] = useState(false);

  const openshowFbModal = () => {
    setshowFbModal(true);
  };
  const closeshowFbModal = () => {
    setshowFbModal(false);
  };

  const members = useSelector((store) => store.memberReducer);
  const guest = useSelector((store) => store.guestReducer);

  const emotionPhrase = useSelector((store) => store.phraseReducer);
  useEffect(() => {
    dispatch(emotionPhraseList());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getCurrentMember());
    } else if (localStorage.getItem("guestCode")) {
      dispatch(getGuestMember());
    }
  }, [dispatch]);

  const isGuest = localStorage.getItem("guestCode") !== null;
  const nickname = isGuest ? guest.guestNickname : members.memberNickname;
  const age = isGuest ? guest.guestAge : members.memberAge;
  const gender = isGuest ? guest.guestGender : members.memberGender;

  const goToYoutube = () => {
    const userIdentifier = isGuest
      ? { guestNo: guest.guestNo }
      : { memberNo: members.memberNo };
    navigate("youtubeList", { state: userIdentifier });
  };

  const goToBook = () => {
    const userIdentifier = isGuest
      ? { guestNo: guest.guestNo }
      : { memberNo: members.memberNo };
    navigate("bookList", { state: userIdentifier });
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
  const goToChat = () => {
    navigate("/chat");
  };

  return (
    <div className="main">
      <div className="main-info">
        <div className="main-left">
          <img
            className="main-img"
            src={
              members.memberImage
                ? members.memberImage
                : guest && guest.guestImage
            }
            alt="내 이미지"
          />
        </div>
        <div className="main-info-right">
          <h5 className="right-feedback">
            <div>닉네임 : {nickname}</div>
            {!isGuest && <button onClick={openshowFbModal}>피드백</button>}
          </h5>
          <h5>나이 : {age} </h5>
          <h5>성별 : {gender}</h5>
          <h5>감정 : 슬픔</h5>
        </div>
        <Modal className="modal-backdrop" isOpen={showFbModal}>
          <FbModal closeshowFbModal={closeshowFbModal} />
        </Modal>
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
          <img src={"./../img/chatLogo.png"} onClick={goToChat} alt="챗 로고" />
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
