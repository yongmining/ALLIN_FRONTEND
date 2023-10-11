import { GET_FEEDBACK, GET_FEEDBACKLIST } from '../modules/feedbackModule';

// 관리자 내 피드백 리스트 조회
export const callFeedbackListAPI = ({ currentPage }) => {
  let URL = `http://localhost:8080/api/v1/feedbacks?page=${currentPage}`;

  return async (dispatch, getState) => {
    const result = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Accept: '*/*',
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      dispatch({ type: GET_FEEDBACKLIST, payload: result.data });
    }
  };
};

// 관리자 피드백 코드로 조회
export const callFeedbackDetailAPI = (feedbackNo) => {
  const URL = `http://localhost:8080/api/v1/feedback/${feedbackNo}`;

  return async (dispatch, getState) => {
    const result = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      dispatch({ type: GET_FEEDBACK, payload: result.data });
    }
  };
};

// 관리자 멤버코드로 작성한 피드백 조회
export const callFeedbackByMemberAPI = (memberNo) => {
  const URL = `http://localhost:8080/api/v1/feedback/membmer/${memberNo}`;

  return async (dispatch, getState) => {
    const result = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      dispatch({ type: GET_FEEDBACK, payload: result.data });
    }
  };
};

// 피드백 작성
export const createNewFeedback = (form, close) => {
  const URL = `http://localhost:8080/api/v1/feedback`;

  return async (dispatch, getState) => {
    const result = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(form),
    }).then((response) => response.json());

    if (result.status === 200) {
      alert(result.message);
      close();
    }
  };
};
