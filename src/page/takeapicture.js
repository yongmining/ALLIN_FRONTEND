import React, { useRef, useEffect } from 'react';

const TakePictureanalyze = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    getVideo();
  }, []);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        const video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  const paintToCanvas = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const ctx = canvas.getContext('2d');
      const width = video.videoWidth;
      const height = video.videoHeight;

      canvas.width = width;
      canvas.height = height;

      // Capture a screenshot from the webcam and draw it on the canvas.
      ctx.drawImage(video, 0, 0, width, height);
    }
  };

  async function takePhoto() {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL('image/jpeg');
      const directoryPath = 'http://localhost:8080/api/v1/pictures/'; // Update the server URL

      try {
        const imagePath = await saveImage(dataURL, directoryPath);

        const body = JSON.stringify({
          img_path: imagePath,
          actions: ['age', 'gender', 'emotion', 'race'],
        });

        // Send the image to the server
        try {
          const response = await fetch('http://localhost:5000/analyze', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // JSON 데이터를 보낸다는 헤더 설정
            },
            body,
          });

          if (response.ok) {
            const data = await response.json();
            const result = data.results[0];
            console.log({
              age: result.age,
              dominant_emotion: result.dominant_emotion,
              dominant_gender: result.dominant_gender,
              dominant_race: result.dominant_race,
            });

            const newBody = JSON.stringify({
              image_name: 'photo.jpg',
              dominant_emotion: result.dominant_emotion,
              dominant_gender: result.dominant_gender,
              dominant_race: result.dominant_race,
              age: result.age,
            });

            const newResponse = await fetch('http://localhost:8080/api/v1/emotion/analyze', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: newBody,
            });

            if (newResponse.ok) {
              const newData = await newResponse.json();
              console.log(newData);
            } else {
              console.error('Error in second fetch:', newResponse.status);
            }
          } else {
            console.error('Error in first fetch:', response.status);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  async function saveImage(dataURL, directoryPath) {
    const imageBlob = await fetch(dataURL).then((res) => res.blob());
    const imagePath = `${directoryPath}/image.jpg`;
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    const url = window.URL.createObjectURL(imageBlob);
    a.href = url;
    a.download = 'image.jpg';
    a.click();
    window.URL.revokeObjectURL(url);
    return imagePath;
  }

  return (
    <div>
      <button onClick={takePhoto}>Take a photo</button>
      <video onCanPlay={paintToCanvas} ref={videoRef} autoPlay playsInline muted />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div>
        <div ref={stripRef} />
      </div>
    </div>
  );
};

export default TakePictureanalyze;