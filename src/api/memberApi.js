import { GET_MEMBER, PUT_MEMBER, DELETE_MEMBER } from '../modules/memberModule';
import { GET_GUEST, PUT_GUEST, DELETE_GUEST } from '../modules/guestModule';
import { IS_LOGIN } from '../modules/loginModule';

/* 현재 로그인 된 멤버 정보 가져오기 */
export const getCurrentMember = () => {
  const token = JSON.parse(window.localStorage.getItem('accessToken'));
  const requestURL = `http://localhost:8080/api/v1/member/${token.memberNo}`;
  // const requestURL = `http://${process.env.REACT_APP_RESTAPI_URL}/api/v1/member/${token.memberNo}`;

  return async (dispatch) => {
    const result = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
    }).then((res) => res.json());

    if (result.status === 200) {
      dispatch({ type: GET_MEMBER, payload: result.data.members });
      if (result.data.members.memberNickname.startsWith('새로운 회원')) {
        return '새로운 회원';
      }
    }
  };
};

/* 현재 로그인 된 멤버 정보 변경 */
export const getUpdateMember = (form) => {
  const token = JSON.parse(window.localStorage.getItem('accessToken'));
  const requestURL = `http://localhost:8080/api/v1/member/${token.memberNo}/profile`;
  // const requestURL = `http://${process.env.REACT_APP_RESTAPI_URL}/api/v1/member/${token.memberNo}/profile`;

  return async (dispatch) => {
    const result = await fetch(requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form), // 업데이트할 데이터를 JSON 문자열로 변환하여 요청에 포함
    }).then((res) => res.json());

    if (result.status === 200) {
      dispatch({ type: PUT_MEMBER, payload: result.data });
    }
  };
};

/* 현재 로그인 된 멤버가 탈퇴 */
export const deleteMember = () => {
  const token = JSON.parse(window.localStorage.getItem('accessToken'));
  const requestURL = `http://localhost:8080/api/v1/member/${token.memberNo}`;
  // const requestURL = `http://${process.env.REACT_APP_RESTAPI_URL}/api/v1/member/${token.memberNo}`;

  return async (dispatch) => {
    const result = await fetch(requestURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Auth: token,
      },
    });

    if (result.status === 200) {
      dispatch({ type: DELETE_MEMBER, payload: result.data });
      dispatch({ type: IS_LOGIN });
      window.localStorage.removeItem('accessToken');
      window.location.reload();
    }
  };
};

/* 현재 로그인 된 게스트 정보 가져오기 */
export const getGuestMember = () => {
  const code = JSON.parse(window.localStorage.getItem('guestCode'));

  const requestURL = `http://localhost:8080/api/v1/guest/${code.guestNo}`;
  // const requestURL = `http://${process.env.REACT_APP_RESTAPI_URL}/api/v1/guest/${code.guestNo}`;

  return async (dispatch) => {
    const result = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
    }).then((res) => res.json());
    if (result.status === 200) {
      dispatch({ type: GET_GUEST, payload: result.data.guestmember });
      return '게스트';
    }
  };
};

/* 현재 로그인 된 게스트 정보 변경 */
export const getUpdateGuest = (form) => {
  const code = JSON.parse(window.localStorage.getItem('guestCode'));
  const requestURL = `http://localhost:8080/api/v1/guest/${code.guestNo}/profile`;
  // const requestURL = `http://${process.env.REACT_APP_RESTAPI_URL}/api/v1/guest/${code.guestNo}/profile`;

  return async (dispatch) => {
    const result = await fetch(requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify(form),
    }).then((res) => res.json());

    if (result.status === 200) {
      dispatch({ type: PUT_GUEST, payload: result.data });
      alert(result.message);
    }
  };
};

/* 현재 로그인 된 멤버가 탈퇴 */
export const deleteGuest = () => {
  const code = JSON.parse(window.localStorage.getItem('guestCode'));
  const requestURL = `http://localhost:8080/api/v1/guest/${code.guestNo}/delete`;
  // const requestURL = `http://${process.env.REACT_APP_RESTAPI_URL}/api/v1/guest/${code.guestNo}/delete`;

  return async (dispatch) => {
    const result = await fetch(requestURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
    });

    if (result.status === 200) {
      window.localStorage.removeItem('guestCode');
      dispatch({ type: DELETE_GUEST, payload: result.data });
      dispatch({ type: IS_LOGIN });
      window.location.reload();
    }
  };
};
