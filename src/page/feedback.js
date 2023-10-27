import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewFeedback } from '../api/feedbackApi';
import '../css/feedback.css';
import { getCurrentMember } from '../api/memberApi';
import { CLOSE_MODAL } from '../modules/modalModule';
import { useNavigate } from 'react-router-dom';

function FeedBack({ closeFeedback }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const members = useSelector((store) => store.memberReducer);

  const [form, setForm] = useState({
    feedbackStar: 0,
    feedbackContent: '',
    member: members || null,
  });

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  useEffect(() => {
    dispatch(getCurrentMember());
  }, []);

  useEffect(() => {
    if (members) {
      setForm((prevForm) => ({ ...prevForm, member: members }));
    }
  }, [members]);

  const handleRatingChange = (e) => {
    setForm({ ...form, feedbackStar: parseInt(e.target.value) });
  };

  const handleStarClick = (value) => {
    setForm({ ...form, feedbackStar: value });
  };

  const handleContentChange = (e) => {
    setForm({ ...form, feedbackContent: e.target.value });
  };

  const handlecloseModal = () => {
    closeFeedback();
  };

  const handleSubmit = () => {
    dispatch(createNewFeedback(form, () => {}));
    closeModal();
    navigate('/');
  };

  return (
    <div className="fbModal">
      <br />
      'You Film Face ?'에 대한 자신의 의견을 말해주세요!
      <br />
      <br />
      <textarea className="fbContent" name="fbContent" value={form.feedbackContent} onChange={handleContentChange} />
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
                checked={form.feedbackStar === index + 1}
                onChange={handleRatingChange}
              />
              <label
                className={form.feedbackStar >= index + 1 ? 'yellow' : ''}
                htmlFor={`rate${index + 1}`}
                onClick={() => handleStarClick(index + 1)}
              >
                {form.feedbackStar >= index + 1 ? '⭐' : '☆'}
              </label>
            </React.Fragment>
          ))}
        </fieldset>
      </div>
      <br />
      <div className="fbBtn">
        <button onClick={handleSubmit}>제출</button>
        <button onClick={handlecloseModal}>닫기</button>
      </div>
      <br />
    </div>
  );
}

export default FeedBack;
