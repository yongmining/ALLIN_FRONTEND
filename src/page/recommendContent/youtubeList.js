import React, { useEffect, useState } from 'react';
import '../../css/youtubeList.css';
import { useDispatch, useSelector } from 'react-redux';
import { youtubeList } from '../../api/youtubeApi';
import { getCurrentMember } from '../../api/memberApi';
import { postYoutubeNice, getYoutubeNice } from '../../api/niceAPI'; // getYoutubeNice 함수 추가

function YoutubeList() {
  const videosData = useSelector((store) => store.youtubeReducer);
  const members = useSelector((store) => store.memberReducer);
  const isLiked = useSelector((store) => store.niceReducer.isLiked);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('all');
  const [extraVideos, setExtraVideos] = useState([]); // 추가로 가져온 비디오 데이터를 저장할 상태 추가

  useEffect(() => {
    dispatch(getCurrentMember());
  }, [dispatch]);

  useEffect(() => {
    if (members && members.memberNo) {
      dispatch(youtubeList(members.memberNo));

      // 추가로 가져온 비디오 데이터를 불러옴
      const loadExtraVideos = async () => {
        try {
          const extraData = await dispatch(getYoutubeNice(members.memberNo));
          console.log('Extra Videos in loadExtraVideos:', extraData);
          setExtraVideos(extraData); // 데이터를 상태에 설정
        } catch (error) {
          console.error('Error loading extra videos:', error);
        }
      };

      loadExtraVideos();
    }
  }, [dispatch, members]);
  const handleLikeClick = (videoLink) => {
    if (members.memberNo) {
      const niceData = {
        youtubeLink: videoLink,
        member: {
          memberNo: members.memberNo,
        },
      };

      // 좋아요 버튼을 클릭할 때 API 호출
      dispatch(postYoutubeNice(niceData));
    }
  };
  const handleFilterChange = async (e) => {
    setFilter(e.target.value);

    if (e.target.value === 'liked' && members && members.memberNo) {
      try {
        const extraData = await dispatch(getYoutubeNice(members.memberNo));
        console.log('Extra Videos on filter change:', extraData);
        setExtraVideos(extraData);
      } catch (error) {
        console.error('Error loading extra videos on filter change:', error);
      }
    }
  };

  const filteredVideos = videosData.concat(extraVideos).filter((video) => {
    if (filter === 'liked' && isLiked) {
      return isLiked.includes(video.youtubeLink);
    }
    return true;
  });

  //  niceCount를 기준으로 정렬하는 코드
  const sortedVideos = filter === 'liked' ? filteredVideos.sort((a, b) => b.niceCount - a.niceCount) : filteredVideos;
  if (videosData.length === 0) return null;

  return (
    <div className="container">
      <div className="filterContainer">
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">모든 비디오</option>
          <option value="liked">좋아요순</option>
        </select>
      </div>

      <div className="videoContainer">
        {sortedVideos.map((video, index) => (
          <div className="videoItem" key={index}>
            <a href={video.youtubeLink} target="_blank" rel="noopener noreferrer">
              <img src={video.thumbnailUrl} alt={video.youtubeTitle} />
            </a>
            <div className="videoInfo">
              <h3>{video.youtubeTitle}</h3>
              <div className="likeButton">
                <button onClick={() => handleLikeClick(video.youtubeLink)}>좋아요</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YoutubeList;
