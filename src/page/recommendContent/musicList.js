import { useEffect, useState } from 'react';
import '../../css/youtubeList.css';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { musicList, guestMusicList } from '../../api/youtubeApi'; // getCurrentMember를 import
import { postMusicNice, getMusicNice } from '../../api/niceAPI';

function MusicList() {
  const videosData = useSelector((store) => store.musicReducer);
  const members = useSelector((store) => store.memberReducer);
  const isLiked = useSelector((store) => store.niceReducer.isLiked);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('all');
  const [extraVideos, setExtraVideos] = useState([]);

  const location = useLocation();
  const { memberNo, guestNo } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      if (memberNo) {
        dispatch(musicList(memberNo));
      } else if (guestNo) {
        dispatch(guestMusicList(guestNo));
      }
      try {
        const extraData = await dispatch(getMusicNice(memberNo));
        console.log('Extra Videos in fetchData:', extraData);

        setExtraVideos(extraData);
      } catch (error) {
        console.error('Error loading extra videos in fetchData:', error);
      }
    };

    fetchData();
  }, [dispatch, members, memberNo, guestNo]);

  const handleLikeClick = (videoLink) => {
    if (memberNo) {
      const niceData = {
        musicLink: videoLink,
        member: {
          memberNo: memberNo,
        },
      };
      // 좋아요 버튼을 클릭할 때 API 호출
      dispatch(postMusicNice(niceData));
    }
  };

  const removeDuplicates = (videos) => {
    const uniqueVideos = [];
    const seenLinks = new Set();

    for (const video of videos) {
      if (video && !seenLinks.has(video.musicLink)) {
        seenLinks.add(video.musicLink);
        uniqueVideos.push(video);
      }
    }

    return uniqueVideos;
  };

  const handleFilterChange = async (e) => {
    setFilter(e.target.value);

    if (e.target.value === 'liked' && members && memberNo) {
      try {
        const extraData = await dispatch(getMusicNice(memberNo));
        console.log('Extra Videos on filter change:', extraData);
        setExtraVideos(extraData);
      } catch (error) {
        console.error('Error loading extra videos on filter change:', error);
      }
    }
  };

  const filteredVideos = videosData.concat(extraVideos).filter((video) => {
    if (filter === 'liked' && isLiked) {
      return isLiked.includes(video.musicLink);
    }
    return true;
  });
  const noDuplicateVideos = removeDuplicates(filteredVideos);

  const RECOMMENDED_VIDEO_COUNT = 6;
  const sortedVideos = (() => {
    if (filter === 'liked') {
      return noDuplicateVideos
        .filter((video) => video.niceCount > 0) // niceCount가 0 이상인 동영상만 필터링
        .sort((a, b) => b.niceCount - a.niceCount)
        .slice(0, RECOMMENDED_VIDEO_COUNT);
    }
    return noDuplicateVideos;
  })();

  return (
    <div className="container">
      {memberNo && (
        <div className="filterContainer">
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">모든 비디오</option>
            <option value="liked">좋아요순</option>
          </select>
        </div>
      )}
      <div className="videoContainer">
        {sortedVideos.map(
          (video, index) =>
            video && (
              <div className="videoItem" key={index}>
                <a href={memberNo ? video.musicLink : video.guestMusicLink} target="_blank" rel="noopener noreferrer">
                  <img src={video.thumbnailUrl} alt={memberNo ? video.musicTitle : video.guestMusicTitle} />
                </a>
                <div className="videoInfo">
                  <h3>{memberNo ? video.musicTitle : video.guestMusicTitle}</h3>
                  {memberNo && (
                    <div className="likeButton">
                      <button onClick={() => handleLikeClick(video.musicLink)}>좋아요</button>
                    </div>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
export default MusicList;
