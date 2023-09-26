// import React, { useEffect } from 'react';
// import './mapContainer.css'; // 필요한 CSS 파일을 import

// const MapContainer = () => {
//   useEffect(() => {
//     // Kakao 지도 API 스크립트를 동적으로 로드
//     const script = document.createElement('script');
//     script.async = true;
//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=bc2b98d750886d40f60a5b58fcb7a916&libraries=services,drawing`;
//     script.onload = () => {
//       // Kakao 지도 API가 로드된 후에 실행할 코드
//       const container = document.getElementById('map');
//       const options = {
//         center: new window.kakao.maps.LatLng(37.5665, 126.978),
//         level: 10,
//       };
//       const map = new window.kakao.maps.Map(container, options);
//       // 지도 초기화 및 상담 센터 표시 코드 작성
//     };
//     document.head.appendChild(script);

//     return () => {
//       // 컴포넌트가 언마운트될 때 Kakao 지도 API 스크립트를 제거
//       document.head.removeChild(script);
//     };
//   }, []);

//   return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
// };

// export default MapContainer;
