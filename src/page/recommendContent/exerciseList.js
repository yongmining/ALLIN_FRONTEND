import { useEffect, useState } from "react";
import "../../css/youtubeList.css";
import { useDispatch, useSelector } from "react-redux";
import { exerciseList } from "../../api/youtubeApi"; // getCurrentMember를 import
import { getCurrentMember } from "../../api/memberApi";

function ExerciseList() {
  const videosData = useSelector((store) => store.exerciseReducer);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    exerciseTitle: "",
    exerciseLink: "",
    memberNo: "",
  });
  // YoutubeList 컴포넌트
  const members = useSelector((store) => store.memberReducer);

  useEffect(() => {
    dispatch(getCurrentMember());
  }, [dispatch]);

  useEffect(() => {
    if (members && members.memberNo) {
      dispatch(exerciseList(members.memberNo));
    }
  }, [dispatch, members]);

  if (videosData.length === 0) return null;

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
