import React, { useEffect, useRef } from "react";

const TakePictureanalyze = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const stripRef = useRef(null);
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
    let canvas = canvasRef.current;

    if (video && canvas) {
      let ctx = canvas.getContext("2d");

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
      let ctx = canvas.getContext("2d");

      // 이미지를 서버로 보냄
      const dataURL = canvas.toDataURL("image/jpeg");

      // Send the image to the server
      try {
        const response = await fetch("http://localhost:5000/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json" // JSON 데이터를 보낸다는 헤더 설정
          },
          body: JSON.stringify({
            img_path: dataURL, // 데이터 URL로 설정
            actions: ["age", "gender", "emotion", "race"]
          }) // JSON 데이터로 변환하여 전송
        });

        const data = await response.json();

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
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  return (
    <div>
      <button onClick={() => takePhoto()}>Take a photo</button>
      <video onCanPlay={() => paintToCanvas()} ref={videoRef} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div>
        <div ref={stripRef} />
      </div>
      <canvas ref={photoRef} />
    </div>
  );
};

export default TakePictureanalyze;