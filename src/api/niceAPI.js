import { GET_YOUTUBENICE } from '../modules/niceModule';
import { useDispatch } from 'react-redux';

export const postYoutubeNice = (niceData) => {
  // 파라미터로 객체를 받도록 수정
  let URL = `http://localhost:8080/api/v1/createOrCancelNice`;

  return async function (dispatch, getState) {
    const result = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify(niceData),
    }).then((res) => res.json());

    if (result.status === 200) {
      alert(result.message);
    }
  };
};

export const getYoutubeNice = (memberNo) => {
  let URL = `http://localhost:8080/api/v1/recommendations/emotion-age/${memberNo}`;

  return async (dispatch, getState) => {
    try {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Accept: '*/*',
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log('Data from getYoutubeNice:', data);
        dispatch({ type: GET_YOUTUBENICE, payload: data });
        return data; // 추가된 부분: 데이터 반환
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
};
