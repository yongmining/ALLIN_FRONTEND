import React, { useState } from 'react';
import '../../css/feedback.css';

function FbModal() {
  const [form, setForm] = useState({
    fbStarPoint: 0,
  });
  const handleRatingChange = (e) => {
    setForm({ ...form, fbStarPoint: parseInt(e.target.value) });
  };
  const handleStarClick = (value) => {
    setForm({ ...form, fbStarPoint: value });
  };

  return (
    <div className="fbModal">
      <div className="mainContent">
        <div>'You Film Face?'을 사용하시면서 어떠셨나요?</div>
        <div>만족도와 개선할 점을 알려주세요!</div>
      </div>
      <div className="subContent">
        <br />
        피드백은 저희에게 큰 힘이 됩니다
      </div>
      <div>
        <fieldset>
          {Array.from({ length: 5 }).map((_, index) => (
            <React.Fragment key={index}>
              <input
                type="radio"
                name="rating"
                value={index + 1}
                id={`rate${index + 1}`}
                checked={form.fbStarPoint === index + 1}
                onChange={handleRatingChange}
              />
              <label
                className={form.fbStarPoint >= index + 1 ? 'yellow' : ''}
                htmlFor={`rate${index + 1}`}
                onClick={() => handleStarClick(index + 1)}
              >
                {form.fbStarPoint >= index + 1 ? '⭐' : '☆'}
              </label>
            </React.Fragment>
          ))}
        </fieldset>
      </div>
      <div className="fbmdBtn">
        <button className="mdbtn">닫기</button>
        <button className="mdbtn">작성</button>
      </div>
    </div>
  );
}

export default FbModal;
