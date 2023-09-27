import React, { useRef, useEffect } from "react";
import "../css/page.css";

function TakePicture() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing camera:", err));
    }
  }, []);a

  return (
    <div className="video-container">
      <video ref={videoRef} autoPlay playsInline />
      <p className="camera-text">사진을 촬영해 주세요</p>
    </div>
  );
}

export default TakePicture;
