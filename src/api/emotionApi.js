import { GET_MEMBER_EMOTION } from '../modules/emotionModule';

export const memberEmotion = (memberNo) => {
  let URL = `http://localhost:8080/api/v1/emotion/member/${memberNo}`;
  // let URL = `http://${process.env.REACT_APP_RESTAPI_URL}/api/v1/emotion/member/${memberNo}`;

  return async (dispatch) => {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Accept: '*/*',
      },
    });
    const result = await response.json();

    if (response.status === 200) {
      dispatch({ type: GET_MEMBER_EMOTION, payload: result });
    }
  };
};

export const memberEmotionCount = (memberNo) => {
  let URL = `http://localhost:8080/api/v1/emotion/member/${memberNo}`;

  return async (dispatch) => {
    try {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Accept: '*/*',
        },
      });
      const result = await response.json();

      if (response.status === 200) {
        dispatch({ type: GET_MEMBER_EMOTION, payload: result });
        return result; // 성공 결과를 반환
      } else {
        // response가 성공적이지 않은 경우 오류 처리
        throw new Error(result.message || 'Error fetching emotions');
      }
    } catch (error) {
      // 에러를 적절히 처리하거나, 호출부에 에러를 전파할 수 있습니다.
      return Promise.reject(error);
    }
  };
};
