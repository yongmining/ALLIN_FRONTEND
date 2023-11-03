import { useEffect } from "react";
import "../../css/youtubeList.css";
import { useDispatch, useSelector } from "react-redux";
import { musicList } from "../../api/youtubeApi"; // getCurrentMember를 import
import { getCurrentMember } from "../../api/memberApi";

function MusicList() {
  const videosData = useSelector((store) => store.musicReducer);
  const dispatch = useDispatch();

  const members = useSelector((store) => store.memberReducer);

  useEffect(() => {
    dispatch(getCurrentMember());
  }, [dispatch]);

  useEffect(() => {
    if (members && members.memberNo) {
      dispatch(musicList(members.memberNo));
    }
  }, [dispatch, members]);

  if (videosData.length === 0) return null;

  return (
    <div className="videoContainer">
      {videosData.map((video) => (
        <div className="videoItem" key={video.musicLink}>
          <a href={video.musicLink} target="_blank" rel="noopener noreferrer">
            <img src={video.thumbnailUrl} alt={video.musicTitle} />
          </a>
          <div className="videoInfo">
            <h3>{video.musicTitle}</h3>
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
export default MusicList;
