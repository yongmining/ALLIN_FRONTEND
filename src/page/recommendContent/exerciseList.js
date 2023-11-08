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
      } else if (guestNo) {
        dispatch(guestExerciseList(guestNo));
      }
      try {
        const extraData = await dispatch(getExerciseNice(memberNo));
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
        exerciseLink: videoLink,
        member: {
          memberNo: memberNo,
        },
      };
      // 좋아요 버튼을 클릭할 때 API 호출
      dispatch(postExerciseNice(niceData));
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

    if (e.target.value === 'liked' && members && memberNo) {
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
        {sortedVideos.map(
          (video, index) =>
            video && (
              <div className="videoItem" key={index}>
                <a
                  href={memberNo ? video.exerciseLink : video.guestExerciseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={video.thumbnailUrl} alt={memberNo ? video.exerciseTitle : video.guestExerciseTitle} />
                </a>
                <div className="videoInfo">
                  <h3>{memberNo ? video.exerciseTitle : video.guestExerciseTitle}</h3>
                  {memberNo && (
                    <div className="likeButton">
                      <button onClick={() => handleLikeClick(video.exerciseLink)}>좋아요</button>
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
export default ExerciseList;
