import React, { useEffect } from "react";
import "../../css/youtubeList.css";
import { useDispatch, useSelector } from "react-redux";
import { youtubeList } from "../../api/youtubeApi";
import { getCurrentMember } from "../../api/memberApi";

function YoutubeList() {
  const videosData = useSelector((store) => store.youtubeReducer);
  const members = useSelector((store) => store.memberReducer);
  const dispatch = useDispatch();

  // 첫 번째 useEffect: 컴포넌트가 마운트될 때 회원 정보를 가져옵니다.
  useEffect(() => {
    dispatch(getCurrentMember());
  }, [dispatch]);

  // 두 번째 useEffect: members가 변경될 때마다 YouTube 데이터를 가져옵니다.
  useEffect(() => {
    if (members && members.memberNo) {
      dispatch(youtubeList(members.memberNo));
    }
  }, [dispatch, members]);

  if (videosData.length === 0) return null;

  return (
    <div className="videoContainer">
      {videosData.map((video) => (
        <div className="videoItem" key={video.youtubeLink}>
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
