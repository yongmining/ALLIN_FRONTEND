import { GET_PHRASE } from "../modules/phraseModule";

export const phraseListAPI = ({ currentPage }) => {
  let URL = `http://localhost:8080/api/v1/phrase`;

  return async (dispatch, getState) => {
    const result = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "*/*",
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      dispatch({ type: GET_PHRASE, payload: result.data });
    }
    console.log(result);
  };
};
