import { GET_YOUTUBENICE, GET_EXERCISENICE, GET_MUSICNICE } from '../modules/niceModule';

export const postYoutubeNice = (niceData) => {
  // let URL = `http://localhost:8080/api/v1/createOrCancelNice`;
  let URL = `http://${process.env.REACT_APP_RESTAPI_URL}/api/v1/createOrCancelNice`;

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
  // let URL = `http://localhost:8080/api/v1/recommendations/emotion-age/${memberNo}`;
  let URL = `http://${process.env.REACT_APP_RESTAPI_URL}/api/v1/recommendations/emotion-age/${memberNo}`;

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
        return data;
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
};
export const postMusicNice = (niceData) => {
  // let URL = `http://localhost:8080/api/v1/createOrCancelMusicNice`;
  let URL = `http:// ${process.env.REACT_APP_RESTAPI_URL}/api/v1/createOrCancelMusicNice`;

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

export const getMusicNice = (memberNo) => {
  // let URL = `http://localhost:8080/api/v1/musicrecommendations/emotion-age/${memberNo}`;
  let URL = `http://${process.env.REACT_APP_RESTAPI_URL}/api/v1/musicrecommendations/emotion-age/${memberNo}`;

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
        dispatch({ type: GET_MUSICNICE, payload: data });
        return data;
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
};
export const postExerciseNice = (niceData) => {
  // let URL = `http://localhost:8080/api/v1/createOrCancelExerciseNice`;
  let URL = `http://${process.env.REACT_APP_RESTAPI_URL}/api/v1/createOrCancelExerciseNice`;

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

export const getExerciseNice = (memberNo) => {
  // let URL = `http://localhost:8080/api/v1/exerciserecommendations/emotion-age/${memberNo}`;
  let URL = `http://${process.env.REACT_APP_RESTAPI_URL}/api/v1/exerciserecommendations/emotion-age/${memberNo}`;

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
        dispatch({ type: GET_EXERCISENICE, payload: data });
        return data;
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
};
