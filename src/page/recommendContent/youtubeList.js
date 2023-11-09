import React, { useEffect, useState } from 'react';
import '../../css/youtubeList.css';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { youtubeList, guestYoutubeList } from '../../api/youtubeApi';
import { postYoutubeNice, getYoutubeNice } from '../../api/niceAPI';

function YoutubeList() {
  const videosData = useSelector((store) => store.youtubeReducer);
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
        dispatch(youtubeList(memberNo));
        try {
          const extraData = await dispatch(getYoutubeNice(memberNo));
          setExtraVideos(extraData);
        } catch (error) {
          console.error('Error loading extra videos in fetchData:', error);
        }
      } else if (guestNo) {
        dispatch(guestYoutubeList(guestNo));
      }
    };

    fetchData();
  }, [dispatch, memberNo, guestNo]);

  const handleLikeClick = async (videoLink, currentNiceCount) => {
    console.log('Like button clicked', videoLink);

    if (memberNo) {
      const niceData = {
        youtubeLink: videoLink,
        member: {
          memberNo: memberNo,
        },
      };
      // 여기서 좋아요 API 호출 결과를 기다린 후 niceCount를 업데이트합니다.
      const response = await dispatch(postYoutubeNice(niceData));
      if (response.payload && response.payload.success) {
        // 해당 비디오의 niceCount를 업데이트합니다.
        setExtraVideos(
          extraVideos.map((video) => {
            if (video.youtubeLink === videoLink) {
              return { ...video, niceCount: currentNiceCount + 1 };
            }
            return video;
          })
        );
      }
    }
  };

  const removeDuplicates = (videos, memberCheck) => {
    const uniqueVideos = [];
    const seenLinks = new Set();

    videos.forEach((video) => {
      if (!video) return;
      const link = memberCheck ? video.youtubeLink : video.guestYoutubeLink;
      if (link && !seenLinks.has(link)) {
        seenLinks.add(link);
        uniqueVideos.push(video);
      }
    });

    return uniqueVideos;
  };

  const handleFilterChange = async (e) => {
    setFilter(e.target.value);

    if (e.target.value === 'liked' && memberNo) {
      try {
        const extraData = await dispatch(getYoutubeNice(memberNo));
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

  const noDuplicateVideos = removeDuplicates(filteredVideos, Boolean(memberNo));

  const RECOMMENDED_VIDEO_COUNT = 6;
  const sortedVideos = (() => {
    if (filter === 'liked') {
      return noDuplicateVideos
        .filter((video) => video.niceCount > 0)
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
        {sortedVideos.map((video, index) => (
          <div className="videoItem" key={video.youtubeLink || video.guestYoutubeLink}>
            <a href={memberNo ? video.youtubeLink : video.guestYoutubeLink} target="_blank" rel="noopener noreferrer">
              <img src={video.thumbnailUrl} alt={video.youtubeTitle || video.guestYoutubeTitle} />
            </a>
            <div className="videoInfo">
              <h3>{video.youtubeTitle || video.guestYoutubeTitle}</h3>
              {memberNo && (
                <div className="likeButton">
                  <button onClick={() => handleLikeClick(video.youtubeLink, video.niceCount)}>
                    좋아요 {video.niceCount}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YoutubeList;
