import { useEffect, useState } from 'react';
import '../../css/youtubeList.css';
import { useDispatch, useSelector } from 'react-redux';
import { exerciseList, guestExerciseList } from '../../api/youtubeApi';
import { useLocation } from 'react-router-dom';
import { postExerciseNice, getExerciseNice } from '../../api/niceAPI';

function ExerciseList() {
  const videosData = useSelector((store) => store.exerciseReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  const members = useSelector((store) => store.memberReducer);
  const { memberNo, guestNo } = location.state || {};
  const [filter, setFilter] = useState('all');
  const [extraVideos, setExtraVideos] = useState([]); // 추가로 가져온 비디오 데이터를 저장할 상태 추가
  const isLiked = useSelector((store) => store.niceReducer.isLiked);

  useEffect(() => {
    const fetchData = async () => {
      if (memberNo) {
        dispatch(exerciseList(memberNo));
        try {
          const extraData = await dispatch(getExerciseNice(memberNo));
          setExtraVideos(extraData);
        } catch (error) {
          console.error('Error loading extra videos in fetchData:', error);
        }
      } else if (guestNo) {
        dispatch(guestExerciseList(guestNo));
      }
    };

    fetchData();
  }, [dispatch, memberNo, guestNo]);

  const handleLikeClick = async (videoLink, currentNiceCount) => {
    console.log('Like button clicked', videoLink);

    if (memberNo) {
      const niceData = {
        exerciseLink: videoLink,
        member: {
          memberNo: memberNo,
        },
      };
      // 여기서 좋아요 API 호출 결과를 기다린 후 niceCount를 업데이트합니다.
      const response = await dispatch(postExerciseNice(niceData));
      if (response.payload && response.payload.success) {
        // 해당 비디오의 niceCount를 업데이트합니다.
        setExtraVideos(
          extraVideos.map((video) => {
            if (video.exerciseLink === videoLink) {
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
      const link = memberCheck ? video.exerciseLink : video.guestExerciseLink;
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
        const extraData = await dispatch(getExerciseNice(memberNo));
        console.log('Extra Videos on filter change:', extraData);
        setExtraVideos(extraData);
      } catch (error) {
        console.error('Error loading extra videos on filter change:', error);
      }
    }
  };

  const filteredVideos = videosData.concat(extraVideos).filter((video) => {
    if (filter === 'liked' && isLiked) {
      return isLiked.includes(video.exerciseLink);
    }
    return true;
  });
  const noDuplicateVideos = removeDuplicates(filteredVideos, Boolean(memberNo));

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

  //  niceCount를 기준으로 정렬하는 코드

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
          <div className="videoItem" key={video.exerciseLink || video.guestExerciseLink}>
            <a href={memberNo ? video.exerciseLink : video.guestExerciseLink} target="_blank" rel="noopener noreferrer">
              <img src={video.thumbnailUrl} alt={video.ExerciseTitle || video.guestExerciseTitle} />
            </a>
            <div className="videoInfo">
              <h3>{video.exerciseTitle || video.guestExerciseTitle}</h3>
              {memberNo && (
                <div className="likeButton">
                  <button onClick={() => handleLikeClick(video.exerciseLink, video.niceCount)}>
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
export default ExerciseList;
