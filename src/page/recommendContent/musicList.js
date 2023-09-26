import { useEffect, useState } from 'react';
import '../../css/youtubeList.css';

function MusicList() {
  const videoIds = ['9xRxUk37uoY', '5V0LrWVmKRA', 'bTUKUB8CI_4', 'VuDY1PBAuWU', 'EOCZYxmi7ho', '9avkrmhScQk'];
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  const [videosData, setVideosData] = useState([]);

  useEffect(() => {
    Promise.all(
      videoIds.map((videoId) =>
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`)
          .then((response) => response.json())
          .then((data) => {
            const snippet = data.items[0].snippet;
            return {
              title: snippet.title,
              thumbnail: snippet.thumbnails.medium.url,
              link: `https://www.youtube.com/watch?v=${videoId}`,
            };
          })
      )
    ).then((videos) => setVideosData(videos));
  }, [apiKey]);

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

export default MusicList;
