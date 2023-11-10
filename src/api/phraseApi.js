import { GET_PHRASE, GET_EMOTIONPHRASE } from '../modules/phraseModule';

export const phraseList = () => {
  let URL = `http://localhost:8080/api/v1/phrase`;
  // let URL = `http://${process.env.REACT_APP_RESTAPI_URL}/api/v1/phrase`;

  return async (dispatch, getState) => {
    const result = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Accept: '*/*',
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      dispatch({ type: GET_PHRASE, payload: result.data });
    }
  };
};

export const emotionPhraseList = () => {
  let URL = `http://localhost:8080/api/v1/emotionPhrase`;
  // let URL = `http://${process.env.REACT_APP_RESTAPI_URL}/api/v1/emotionPhrase`;

  return async (dispatch, getState) => {
    const result = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Accept: '*/*',
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      dispatch({ type: GET_EMOTIONPHRASE, payload: result.data });
    }
  };
};
