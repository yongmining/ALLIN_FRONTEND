import { useEffect } from "react";
import "../../css/youtubeList.css";
import { useDispatch, useSelector } from "react-redux";
import { youtubeList } from "../../api/youtubeApi";
import { getCurrentMember } from "../../api/memberApi";

function YoutubeList() {
  const videosData = useSelector((store) => store.youtubeReducer);
  const dispatch = useDispatch();

  const members = useSelector((store) => store.memberReducer);

  useEffect(() => {
    dispatch(getCurrentMember()).then(() => {
      if (members && members.memberNo) {
        dispatch(youtubeList(members.memberNo));
      } else {
        console.error("memberNo가 없습니다");
      }
    });
  }, []);

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
              {/* 좋아요 버튼 추가 */}
              <button>좋아요</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default YoutubeList;
