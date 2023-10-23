import { GET_MEMBER, PUT_MEMBER, DELETE_MEMBER } from '../modules/memberModule';
import { IS_LOGIN } from '../modules/loginModule';

/* 현재 로그인 된 멤버 정보 가져오기 */
export const getCurrentMember = (memberNo) => {
  const requestURL = `http://localhost:8080/api/v1/member/${memberNo}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
    }).then((res) => res.json());

    if (result.status === 200) {
      dispatch({ type: GET_MEMBER, payload: result.data.members });
      console.log(result);
      if (result.data.members.memberNickname.startsWith('새로운 회원')) {
        return '새로운 회원';
      }
    }
  };
};

/* 현재 로그인 된 멤버 정보 변경 */
export const getUpdateMember = (memberNo, form) => {
  const token = JSON.parse(window.localStorage.getItem('accessToken'));
  const requestURL = `http://localhost:8080/api/v1/member/${token.memberNo}/profile`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form), // 업데이트할 데이터를 JSON 문자열로 변환하여 요청에 포함
    }).then((res) => res.json());

    if (result.status === 201) {
      dispatch({ type: PUT_MEMBER, payload: result.data });
      alert(result.message);
      window.location.href = `/profilInfo/${memberNo}`;
    }
  };
};

/* 현재 로그인 된 멤버가 탈퇴 */
export const deleteMember = (memberNo) => {
  const token = JSON.parse(window.localStorage.getItem('accessToken'));

  const requestURL = `http://localhost:8080/api/v1/member/${token.memberNo}`;

  return async (dispatch, getState) => {
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
export const getGuestMembmer = (token) => {
  const requestURL = `http://localhost:8080/api/v1/member/guest/${token}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
    }).then((res) => res.json());

    if (result.status === 200) {
      dispatch({ type: GET_MEMBER, payload: result.data.guestMember });
      console.log(result);
      if (result.data.guestMember.memberNickname.startsWith('Guest')) {
        return '새로운 회원';
      }
    }
  };
};
