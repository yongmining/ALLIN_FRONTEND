import React, { useEffect } from "react";
import "../../css/youtubeList.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { youtubeList, guestYoutubeList } from "../../api/youtubeApi";

function YoutubeList() {
  const videosData = useSelector((store) => store.youtubeReducer);
  const members = useSelector((store) => store.memberReducer);
  const dispatch = useDispatch();
  const location = useLocation();

  const { memberNo, guestNo } = location.state || {};

  useEffect(() => {
    if (memberNo) {
      // 회원의 감정분석 결과를 기반으로 youtubeList API를 호출
      dispatch(youtubeList(memberNo));
    } else if (guestNo) {
      // 비회원의 감정분석 결과를 기반으로 guestYoutubeList API를 호출
      dispatch(guestYoutubeList(guestNo));
    }
  }, [dispatch, memberNo, guestNo]);

  if (videosData.length === 0) return null;

  return (
    <div className="videoContainer">
      {videosData.map((video, index) => (
        <div className="videoItem" key={index}>
          <a href={video.youtubeLink} target="_blank" rel="noopener noreferrer">
            <img src={video.thumbnailUrl} alt={video.youtubeTitle} />
          </a>
          <div className="videoInfo">
            <h3>{video.youtubeTitle}</h3>
            <div className="likeButton">
              <button>좋아요</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default YoutubeList;
