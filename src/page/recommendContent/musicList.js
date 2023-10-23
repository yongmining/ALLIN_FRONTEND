import { useEffect, useState } from "react";
import "../../css/youtubeList.css";
import { useDispatch, useSelector } from "react-redux";

import { musicList } from "../../api/youtubeApi"; // getCurrentMember를 import
import { getCurrentMember } from "../../api/memberApi";


function MusicList() {
  const videosData = useSelector((store) => store.musicReducer);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    musicTitle: "",
    musicLink: "",
    memberNo: "",
  });
  // YoutubeList 컴포넌트
  const members = useSelector((store) => store.memberReducer);

  useEffect(() => {
    // 첫 번째로 멤버 정보를 가져옵니다.
    dispatch(getCurrentMember()).then(() => {
      // 멤버 정보 가져오기가 완료되면 memberNo를 체크합니다.
      if (members && members.memberNo) {
        dispatch(musicList(members.memberNo));
      } else {
        console.error("memberNo가 없습니다");
      }
    });
  }, []);

  if (videosData.length === 0) return null;

  return (
    <div className="videoContainer">
      {videosData.map((video) => (
        <div className="videoItem" key={video.musicLink}>
          <a href={video.musicLink} target="_blank" rel="noopener noreferrer">
            <img src={video.thumbnailUrl} alt={video.musicTitle} />
            {/* 이미지 표시 */}
            <h3>{video.musicTitle}</h3>
          </a>
        </div>
      ))}
    </div>
  );
}


export default MusicList;
