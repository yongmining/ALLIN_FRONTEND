import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentMember, getUpdateMember, deleteMember } from '../../api/memberApi';
import '../../css/profilInfo.css';
import { phraseList } from '../../api/phraseApi';
import { callKakaoLogoutAPI } from '../../api/loginApi';
import { useNavigate } from 'react-router-dom';
import { memberEmotion } from '../../api/emotionApi';

const ProfilInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [isMaleChecked, setIsMaleChecked] = useState(false);
  const [isFemaleChecked, setIsFemaleChecked] = useState(false);

  const members = useSelector((store) => store.memberReducer);

  useEffect(() => {
    dispatch(getCurrentMember());
  }, [dispatch]);

  const phrase = useSelector((store) => store.phraseReducer);
  useEffect(() => {
    dispatch(phraseList());
  }, []);

  const allEmotion = useSelector((store) => store.memberEmotionReducer);

  useEffect(() => {
    dispatch(memberEmotion(members.memberNo));
  }, [members.memberNo, dispatch]);

  const handleMaleCheckboxChange = () => {
    // 남자 체크박스 변경 시
    setIsMaleChecked(!isMaleChecked);
    // 여자 체크 해제
    if (!isMaleChecked) {
      setIsFemaleChecked(false);
    }
  };

  const handleFemaleCheckboxChange = () => {
    // 여자 체크박스 변경 시
    setIsFemaleChecked(!isFemaleChecked);
    // 남자 체크 해제
    if (!isFemaleChecked) {
      setIsMaleChecked(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteMember(members.memberNo));
    dispatch(callKakaoLogoutAPI());
    navigate('/', { replace: true });
  };

  const handleSave = () => {
    const updatedData = {
      memberNickname: nickname || members.memberNickname,
      memberAge: age || members.memberAge,
      memberGender: isMaleChecked ? '남자' : isFemaleChecked ? '여자' : members.memberGender,
    };

    dispatch(getUpdateMember(updatedData));
    setIsEditing(false);
    window.location.reload();
  };

  return (
    <div className="main">
      <div className="main-info">
        <div className="main-left">
          <img className="main-img" src={members.memberImage} alt="내 이미지" />
        </div>
        <div className="main-info-right">
          <div className={isEditing ? 'editing-mode' : 'display-mode'}>
            {isEditing ? (
              <>
                <br />
                <div>
                  <div className="profilContent">
                    닉네임 : &nbsp;
                    <input
                      type="text"
                      name="nickname"
                      placeholder="닉네임을 입력해주세요"
                      defaultValue={members.memberNickname}
                      onChange={(e) => setNickname(e.target.value)}
                    />
                  </div>
                  <div className="profilContent">
                    나 &nbsp;&nbsp; 이 : &nbsp;
                    <input
                      type="text"
                      name="age"
                      placeholder="나이를 입력해주세요 (1~99)"
                      defaultValue={members.memberAge}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div className="profilContent">
                    성 &nbsp;&nbsp; 별 :&nbsp;&nbsp;
                    <div>
                      남자
                      <input
                        type="checkbox"
                        name="genderMale"
                        checked={isMaleChecked}
                        onChange={handleMaleCheckboxChange}
                      />
                    </div>
                    <div>
                      여자
                      <input
                        type="checkbox"
                        name="genderFemale"
                        checked={isFemaleChecked}
                        onChange={handleFemaleCheckboxChange}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h5>닉네임 : {members.memberNickname}</h5>
                <h5>나이 : {members.memberAge}</h5>
                <h5>성별 : {members.memberGender}</h5>
              </>
            )}
          </div>

          <div className="putbtn">
            {isEditing ? (
              <button className="putbtn-change" onClick={handleSave}>
                저장
              </button>
            ) : (
              <button className="putbtn-change" onClick={() => setIsEditing(true)}>
                수정
              </button>
            )}
            <button className="putbtn-change" onClick={handleDelete}>
              탈퇴
            </button>
          </div>
        </div>
      </div>
      <div className="today-comment">
        <h3>{phrase.phraseContent}</h3>
      </div>
      <div className="chart-main">
        <table className="chart">
          <thead>
            <tr>
              <th>감정결과</th>
              <th>추측나이</th>
              <th>추측성별</th>
            </tr>
          </thead>
          <tbody>
            {allEmotion.map((emotion, index) => (
              <tr key={index}>
                <td>{emotion.emotionResult}</td>
                <td>{emotion.emotionAge}</td>
                <td>{emotion.emotionGender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn-under"></div>
    </div>
  );
};

export default ProfilInfo;
