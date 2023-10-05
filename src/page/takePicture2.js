import React, { useEffect, useRef } from "react";

const TakePictureanalyze = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    getVideo();
  }, []);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  const paintToCanvas = () => {
    let video = videoRef.current;
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    const width = 320;
    const height = 240;
    photo.width = width;
    photo.height = height;

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);
    }, 200);
  };

  const takePhoto = async () => {
    let photo = photoRef.current;

    // 촬영한 이미지를 데이터 URL로 가져옴
    const dataURL = photo.toDataURL("image/jpeg");

    const requestData = {
      img_path: dataURL, // 데이터 URL로 설정
      actions: ["age", "gender", "emotion", "race"]
    };

    // Send the image to the server
    fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" // JSON 데이터를 보낸다는 헤더 설정
      },
      body: JSON.stringify(requestData) // JSON 데이터로 변환하여 전송
    })
      .then(response => response.json())
      .then(data => {
        const result = data.results[0];
        console.log({
          age: result.age,
          dominant_emotion: result.dominant_emotion,
          dominant_gender: result.dominant_gender,
          dominant_race: result.dominant_race
        });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <button onClick={() => takePhoto()}>Take a photo</button>
      <video onCanPlay={() => paintToCanvas()} ref={videoRef} />
      <canvas ref={photoRef} />
    </div>
  );
};

export default TakePictureanalyze;