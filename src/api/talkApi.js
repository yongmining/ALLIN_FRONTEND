import { GET_TALKLIST } from '../modules/talkModule';

// 채팅 입력
export const callTalkAddAPI = async (postData) => {
  const URL = `http://localhost:8080/api/v1/talk/add`;
  // const URL = `http://${process.env.REACT_APP_RESTAPI_URL}/api/v1/talk/add`;

  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      console.error('오류 발생:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('오류 발생:', error);
    return null;
  }
};

// 모든 톡 조회
export const callHistoryAPI = () => {
  const code = JSON.parse(window.localStorage.getItem('guestCode'));
  const token = JSON.parse(window.localStorage.getItem('accessToken'));
  let userNo;

  if (code) {
    userNo = code.guestNo;
  } else if (token) {
    userNo = token.memberNo;
  } else {
    console.error('유효한 게스트 코드 또는 회원 토큰이 없습니다.');
    return;
  }
  const URL = `http://localhost:8080/api/v1/talk/history/${userNo}`;
  // const URL = `http://${process.env.REACT_APP_RESTAPI_URL}/api/v1/talk/history/${userNo}`;

  return async (dispatch, getState) => {
    try {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = await response.json();

        dispatch({ type: GET_TALKLIST, payload: data });
      } else {
        console.error('오류 발생:', response.statusText);
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };
};
