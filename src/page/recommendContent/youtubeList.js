import { useEffect, useState } from "react";
import "../../css/youtubeList.css";

function YoutubeList() {
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const [videosData, setVideosData] = useState([]);

  // 키워드를 "슬플 때 볼만한 영상"으로 고정
  const keyword = "슬플 때 볼만한 영상";

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${keyword}&key=${apiKey}&maxResults=6`
    )
      .then((response) => response.json())
      .then((data) => {
        const videos = data.items.map((item) => {
          const snippet = item.snippet;
          return {
            title: snippet.title,
            thumbnail: snippet.thumbnails.medium.url,
            link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          };
        });
        setVideosData(videos);
      });
  }, [apiKey]); // keyword는 상수이므로 의존성 배열에 추가할 필요 없음

  if (videosData.length === 0) return null;

  return (
    <div className="videoContainer">
      {videosData.map((video) => (
        <div className="videoItem" key={video.link}>
          <a href={video.link} target="_blank" rel="noopener noreferrer">
            <img src={video.thumbnail} alt={video.title} />
            <h3>{video.title}</h3>
          </a>
        </div>
      ))}
    </div>
  );
}

export default YoutubeList;
