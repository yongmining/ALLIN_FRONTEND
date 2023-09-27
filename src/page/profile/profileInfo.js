import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "../../css/profileInfo.css";

const ProfileInfo = () => {
  const [data, setData] = useState([{ date: "", emotion: "" }]);

  const addRow = () => {
    if (data.length < 7) {
      // 7개 이하일 때만 행 추가
      const newData = {
        date: "2023.08.23",
        emotion: "슬픔",
      };

      setData([...data, newData]);
    }
  };

  return (
    <div className="mainprofile">
      <div className="mainprofile-info">
        <div className="mainprofile-left">
          <img
            className="mainprofile-img"
            src="/img/exImg.png"
            alt="내 이미지"
          />
        </div>
        <div className="mainprofile-info-right">
          <h5>닉네임 : 김용민</h5>
          <h5>나이 : 24살</h5>
          <h5>성별 : 남자</h5>
          <div className="putbtn">
            <button className="putbtn-change">수정</button>
          </div>
        </div>
      </div>
      <div className="chart-main">
        <table className="chart">
          <thead>
            <tr>
              <th>날짜</th>
              <th>감정</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.emotion}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={addRow}>행 추가</button>
      </div>
    </div>
  );
};

export default ProfileInfo;
