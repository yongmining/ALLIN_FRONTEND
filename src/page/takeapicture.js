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
      const directoryPath = 'http://127.0.0.1:8080/api/v1/pictures'; // Update the server URL
  
      try {
        const imagePath = await saveImage(dataURL, directoryPath);
  
        const body = JSON.stringify({
          img_path: imagePath,
          actions: ['age', 'gender', 'emotion', 'race'],
        });
  
        // Send the image to the analysis server
        try {
          const response = await fetch('http://127.0.0.1:5000/analyze', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body,
            mode: 'cors',
          });
  
          if (response.ok) {
            const result = await response.json();
            console.log({
              emotionAge: result.age,
              emotionResult: result.dominant_emotion,
              emotionGender: result.dominant_gender,
            });
  
            // Send the result directly to your Java backend
            const newResponse = await fetch('http://127.0.0.1:8080/api/v1/emotion', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(result), // Send the result directly
              mode: 'cors',
            });
  
            if (newResponse.ok) {
              const newData = await newResponse.json();
              console.log(newData);
            } else {
              console.error('Error in fetch to http://127.0.0.1:8080/api/v1/emotion:', newResponse.status);
            }
          } else {
            console.error('Error in fetch to http://localhost:5000/analyze:', response.status);
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