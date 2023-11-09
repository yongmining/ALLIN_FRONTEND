import { GET_BOOK } from '../modules/bookModule';

export const bookList = (memberNo) => {
  // let URL = `http://localhost:8080/api/v1/book/emotion?memberNo=${memberNo}`;
  let URL = `http://${process.env.REACT_APP_RESTAPI_URL}/api/v1/book/emotion?memberNo=${memberNo}`;

  return async (dispatch) => {
    try {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Accept: '*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      // 데이터를 받아온 후에 GET_BOOK 액션을 디스패치
      dispatch({ type: GET_BOOK, payload: result });
    } catch (error) {
      console.error('데이터를 불러오는 중 에러 발생:', error);
    }
  };
};

export const guestBookList = (guestNo) => {
  // let URL = `http://localhost:8080/api/v1/book/guest/emotion?memberNo=${guestNo}`;
  let URL = `http://${process.env.REACT_APP_RESTAPI_URL}/api/v1/book/guest/emotion?memberNo=${guestNo}`;
  return async (dispatch) => {
    try {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Accept: '*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      // 데이터를 받아온 후에 GET_BOOK 액션을 디스패치
      dispatch({ type: GET_BOOK, payload: result });
    } catch (error) {
      console.error('데이터를 불러오는 중 에러 발생:', error);
    }
  };
};
