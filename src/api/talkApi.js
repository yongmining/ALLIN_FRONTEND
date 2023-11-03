import { GET_TALKLIST } from '../modules/talkModule';

// 채팅 입력
export const callTalkAddAPI = async (postData) => {
  console.log('Sending data:', postData);
  const URL = `http://localhost:8080/api/v1/talk/add`;

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
export const callHistoryAPI = (userNo) => {
  const URL = `http://localhost:8080/api/v1/history/${userNo}`;

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
        console.log(data);
        dispatch({ type: GET_TALKLIST, payload: data });
      } else {
        console.error('오류 발생:', response.statusText);
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };
};
