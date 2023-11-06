import React, { useEffect, useRef } from "react";
import axios from "axios";

const TakePictureAnalyze = () => {
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
        console.error("Error:", err);
      });
  };

  const paintToCanvas = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const ctx = canvas.getContext("2d");
      const width = video.videoWidth;
      const height = video.videoHeight;

      canvas.width = width;
      canvas.height = height;

      // Capture a screenshot from the webcam and draw it on the canvas.
      ctx.drawImage(video, 0, 0, width, height);
    }
  };

  async function takePhoto() {
    paintToCanvas(); // 새로운 기능: 현재 영상 프레임을 캡처

    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL("image/jpeg");

      // Convert data URL to Blob
      const byteCharacters = atob(dataURL.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const imageBlob = new Blob([new Uint8Array(byteNumbers)], { type: "image/jpeg" });

      try {
        const formData = new FormData();
        formData.append("file", imageBlob);

        // CORS 요청 헤더 설정
        const config = {
          headers: {
            "Content-Type": "multipart/form-data", // 다른 형식의 데이터일 경우 변경
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true, // 이 부분에서 수정이 필요합니다.
        };

        const response = await axios.post("http://127.0.0.1:8080/api/v1/picture/upload", formData, config);

        if (response.status === 200) {
          console.log("Photo uploaded successfully!");
        } else {
          console.error("Error uploading photo:", response.status);
        }
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }
  }

  return (
    <div>
      <button onClick={takePhoto}>Take a photo</button>
      <video onCanPlay={paintToCanvas} ref={videoRef} autoPlay playsInline muted />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default TakePictureAnalyze;
