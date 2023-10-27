import { GET_MEMBER_EMOTION } from "../modules/emotionModule";

export const memberEmotion = (memberNo) => {
  let URL = `http://localhost:8080/api/v1/emotion/member/${memberNo}`;

  return async (dispatch) => {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "*/*",
      },
    });
    const result = await response.json();

    if (response.status === 200) {
      dispatch({ type: GET_MEMBER_EMOTION, payload: result });
    }
  };
};
