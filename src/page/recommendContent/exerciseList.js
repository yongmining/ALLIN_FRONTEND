import { useEffect, useState } from "react";
import "../../css/youtubeList.css";
import { useDispatch, useSelector } from "react-redux";
import { exerciseList, guestExerciseList } from "../../api/youtubeApi"; // getCurrentMember를 import
import { useLocation } from "react-router-dom";

function ExerciseList() {
  const videosData = useSelector((store) => store.exerciseReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  const members = useSelector((store) => store.memberReducer);
  const { memberNo, guestNo } = location.state || {};
  useEffect(() => {
    if (memberNo) {
      // 회원의 감정분석 결과를 기반으로 youtubeList API를 호출
      dispatch(exerciseList(memberNo));
    } else if (guestNo) {
      // 비회원의 감정분석 결과를 기반으로 guestYoutubeList API를 호출
      dispatch(guestExerciseList(guestNo));
    }
  }, [dispatch, memberNo, guestNo]);

  if (videosData.length === 0) return null;

  console.log(memberNo);
  console.log(guestNo);

  return (
    <div className="videoContainer">
      {videosData.map((video) => (
        <div className="videoItem" key={video.exerciseLink}>
          <a
            href={video.exerciseLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={video.thumbnailUrl} alt={video.exerciseTitle} />
          </a>
          <div className="videoInfo">
            <h3>{video.exerciseTitle}</h3>
            <div className="likeButton">
              {/* 좋아요 버튼 추가 */}
              <button>좋아요</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ExerciseList;
