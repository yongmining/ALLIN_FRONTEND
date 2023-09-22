// function YouTubeList({ videoId }) {
//   const [videoData, setVideoData] = useState(null);

//   useEffect(() => {
//     // API 호출 로직을 여기에 추가합니다.
//     fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=YOUR_API_KEY`)
//       .then((response) => response.json())
//       .then((data) => {
//         const snippet = data.items[0].snippet;
//         setVideoData({
//           title: snippet.title,
//           thumbnail: snippet.thumbnails.medium.url,
//           link: `https://www.youtube.com/watch?v=${videoId}`,
//         });
//       });
//   }, [videoId]);

//   if (!videoData) return null;

//   return (
//     <div>
//       <a href={videoData.link} target="_blank" rel="noopener noreferrer">
//         <img src={videoData.thumbnail} alt={videoData.title} />
//         <h3>{videoData.title}</h3>
//       </a>
//     </div>
//   );
// }
