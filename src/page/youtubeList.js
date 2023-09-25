import { useEffect, useState } from 'react';

function YoutubeList({ videoId }) {
  const [videoData, setVideoData] = useState(null);
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  useEffect(() => {
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        const snippet = data.items[0].snippet;
        setVideoData({
          title: snippet.title,
          thumbnail: snippet.thumbnails.medium.url,
          link: `https://www.youtube.com/watch?v=${videoId}`,
        });
      });
  }, [videoId, apiKey]);

  if (!videoData) return null;

  return (
    <div>
      <a href={videoData.link} target="_blank" rel="noopener noreferrer">
        <img src={videoData.thumbnail} alt={videoData.title} />
        <h3>{videoData.title}</h3>
      </a>
    </div>
  );
}

export default YoutubeList;
