import React, { useRef, useEffect } from 'react';

const TakePictureanalyze = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const stripRef = useRef(null);

  useEffect(() => {
    getVideo();
  }, []);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error('error:', err);
      });
  };

  const paintToCanvas = () => {
    let video = videoRef.current;
    let canvas = canvasRef.current;

    if (video && canvas) {
      let ctx = canvas.getContext('2d');

      const width = video.videoWidth;
      const height = video.videoHeight;

      canvas.width = width;
      canvas.height = height;

      // 비디오 웹캠을 스크린샷으로 찍어서 이미지를 canvas 요소에 그립니다.
      ctx.drawImage(video, 0, 0, width, height);
    }
  };

  async function takePhoto() {
    let canvas = canvasRef.current;
    if (canvas) {
      let ctx = canvas.getContext('2d');

      // 이미지를 서버로 보냄
      const dataURL = canvas.toDataURL('image/jpeg');

      // 이미지 저장
      const imagePath = await saveImage(dataURL, './src/images');

      // Send the image to the server
      try {
        const response = await fetch('http://localhost:5000/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // JSON 데이터를 보낸다는 헤더 설정
          },
          body: JSON.stringify({
            img_path: dataURL, // 이미지 경로로 설정
            actions: ['age', 'gender', 'emotion', 'race'],
          }), // JSON 데이터로 변환하여 전송
        });

        const data = await response.json();

        const result = data.results[0];
        console.log({
          age: result.age,
          dominant_emotion: result.dominant_emotion,
          dominant_gender: result.dominant_gender,
          dominant_race: result.dominant_race,
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  const saveImage = async (dataURL, directoryPath) => {
    // 이미지 파일로 저장합니다.
    const imageBlob = await fetch(dataURL).then((res) => res.blob());

    // 이미지 파일을 지정된 폴더에 저장합니다.
    const imagePath = 'C:/Users/hi/Downloads/frontend1 - 복사본 (3)/ALLIN_FRONTEND/src/images';
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    const url = window.URL.createObjectURL(imageBlob);
    a.href = url;
    a.download = 'image.jpg';
    a.click();
    window.URL.revokeObjectURL(url);

    return imagePath;
  };

  return (
    <div>
      <button onClick={() => takePhoto()}>Take a photo</button>
      <video onCanPlay={() => paintToCanvas()} ref={videoRef} autoPlay playsInline muted />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div>
        <div ref={stripRef} />
      </div>
    </div>
  );
};

export default TakePictureanalyze;