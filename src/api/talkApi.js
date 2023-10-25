// 채팅 입력
export const callTalkAddAPI = (postData) => {
  const URL = `http://localhost:8080/api/v1/talk/add`;

  return async (dispatch, getState) => {
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
        // 서버에서 받아온 데이터를 처리
        console.log(data);
      } else {
        console.error('오류 발생:', response.statusText);
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };
};

// 모든 톡 조회
export const callTalkAllAPI = () => {
  const URL = `http://localhost:8080/api/v1/talk/all`;

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
        // 서버에서 받아온 데이터를 처리
        console.log(data);
      } else {
        console.error('오류 발생:', response.statusText);
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };
};
