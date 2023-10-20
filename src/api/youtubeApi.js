import { GET_YOUTUBE } from "../modules/youtubeModule";

export const youtubeList = (currentPage) => {
  let URL = `http://localhost:8080/api/v1/youtube?page=${currentPage}`;
  return async (dispatch, getState) => {
    const result = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "*/*",
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      dispatch({ type: GET_YOUTUBE, payload: result.data });
    }
  };
};
