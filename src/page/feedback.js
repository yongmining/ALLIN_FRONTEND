import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewFeedback } from '../api/feedbackApi';
import '../css/feedback.css';
import { getCurrentMember } from '../api/memberApi';

function FeedBack() {
  const dispatch = useDispatch();
  const members = useSelector((store) => store.memberReducer);

  const [form, setForm] = useState({
    fbStarPoint: 0,
    fbContent: '',
    memberNo: members?.memberNo || null,
  });

  useEffect(() => {
    dispatch(getCurrentMember());
  }, []);

  const handleRatingChange = (e) => {
    setForm({ ...form, fbStarPoint: parseInt(e.target.value) });
  };

  const handleStarClick = (value) => {
    setForm({ ...form, fbStarPoint: value });
  };

  const handleContentChange = (e) => {
    setForm({ ...form, fbContent: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(
      createNewFeedback(form, () => {
        console.log('Feedback submitted successfully!');
      })
    );
  };

  return (
    <div className="container">
      'You Film Face ?'에 대한 자신의 의견을 말해주세요!
      <br />
      <br />
      <textarea className="fbContent" name="fbContent" value={form.fbContent} onChange={handleContentChange} />
      <br />
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
      <br />
      <div className="fbBtn">
        <button>닫기</button>
        <button onClick={handleSubmit}>제출</button>
      </div>
    </div>
  );
}

export default FeedBack;
