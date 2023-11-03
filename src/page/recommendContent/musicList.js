import { useEffect } from "react";
import "../../css/youtubeList.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { musicList, guestMusicList } from "../../api/youtubeApi"; // getCurrentMember를 import

function MusicList() {
  const videosData = useSelector((store) => store.musicReducer);
  const dispatch = useDispatch();
  const members = useSelector((store) => store.memberReducer);
  const location = useLocation();
  const { memberNo, guestNo } = location.state || {};

  useEffect(() => {
    if (memberNo) {
      // 회원의 감정분석 결과를 기반으로 youtubeList API를 호출
      dispatch(musicList(memberNo));
    } else if (guestNo) {
      // 비회원의 감정분석 결과를 기반으로 guestYoutubeList API를 호출
      dispatch(guestMusicList(guestNo));
    }
  }, [dispatch, memberNo, guestNo]);

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
