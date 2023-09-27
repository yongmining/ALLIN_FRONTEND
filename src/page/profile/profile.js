import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="profile">
      <p>사진</p>
      <div className="profile-text">
        <p>
          닉네임 :
          <input
            type="text"
            name="nickname"
            placeholder="닉네임을 입력해주세요"
          />
        </p>
        <p>
          나이 :{" "}
          <input
            type="text"
            name="nickname"
            placeholder="나이를 입력해주세요"
          />
        </p>
        성별 :
        <input class="form-check-input" type="checkbox" />
        <label class="form-check-label">남자</label>
        <input class="form-check-input" type="checkbox" />
        <label class="form-check-label">여자</label>
      </div>
    </div>
  );
};

export default Profile;
