import { IS_LOGIN } from '../modules/loginModule';

export const callKakaoLoginAPI = (code) => {
  const requestURL = `http://localhost:8080/api/v1/login/kakaocode`;

  return async (dispatch, getState) => {
    let data = { code: code };

    const result = await fetch(requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (result.status === 200) {
      window.localStorage.setItem('accessToken', JSON.stringify(result.data.token));
      dispatch({ type: IS_LOGIN });
    }
  };
};

export const callKakaoLogoutAPI = () => {
  const requestURL = `http://localhost:8080/api/v1/login/kakaologout`;

  return async (dispatch, getState) => {
    const accessToken = JSON.parse(window.localStorage.getItem('accessToken'));
    const result = await fetch(requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken.access_token,
      },
    }).then((res) => res.json());
    if (result.status === 200) {
      window.localStorage.removeItem('accessToken');
      dispatch({ type: IS_LOGIN });
      window.location.reload();
    }
  };
};

export const callGuestLoginAPI = (code) => {
  const requestURL = `http://localhost:8080/api/v1/login/guest`;

  return async (dispatch, getState) => {
    let data = { code: code };

    const result = await fetch(requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (result.status === 200) {
      window.localStorage.setItem('accessToken', JSON.stringify(result.data.token));
      dispatch({ type: IS_LOGIN });
      console.log(result);
    }
  };
};
