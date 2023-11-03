import { GET_YOUTUBE } from "../modules/youtubeModule";
import { GET_MUSIC } from "../modules/musicModule";
import { GET_EXERCISE } from "../modules/exerciseModule";

export const youtubeList = (memberNo) => {
  let URL = `http://localhost:8080/api/v1/youtube/emotion?memberNo=${memberNo}`;
  return async (dispatch) => {
    const result = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "*/*",
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      dispatch({ type: GET_YOUTUBE, payload: result.data });
      localStorage.setItem("youtubeData", JSON.stringify(result.data));
    }
  };
};

export const musicList = (memberNo) => {
  let URL = `http://localhost:8080/api/v1/music/emotion?memberNo=${memberNo}`;
  return async (dispatch) => {
    const result = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "*/*",
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      dispatch({ type: GET_MUSIC, payload: result.data });
      localStorage.setItem("musicData", JSON.stringify(result.data));
    }
  };
};

export const exerciseList = (memberNo) => {
  let URL = `http://localhost:8080/api/v1/exercise/emotion?memberNo=${memberNo}`;
  return async (dispatch) => {
    const result = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "*/*",
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      dispatch({ type: GET_EXERCISE, payload: result.data });
      localStorage.setItem("exerciseData", JSON.stringify(result.data));
    }
  };
};

export const guestYoutubeList = (guestNo) => {
  let URL = `http://localhost:8080/api/v1/youtube/emotion?guestNo=${guestNo}`;
  return async (dispatch) => {
    const result = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "*/*",
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      dispatch({ type: GET_YOUTUBE, payload: result.data });
      localStorage.setItem("youtubeData", JSON.stringify(result.data));
    }
  };
};

export const guestMusicList = (guestNo) => {
  let URL = `http://localhost:8080/api/v1/Music/emotion?guestNo=${guestNo}`;
  return async (dispatch) => {
    const result = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "*/*",
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      dispatch({ type: GET_YOUTUBE, payload: result.data });
      localStorage.setItem("youtubeData", JSON.stringify(result.data));
    }
  };
};
export const guestExerciseList = (guestNo) => {
  let URL = `http://localhost:8080/api/v1/Exercise/emotion?guestNo=${guestNo}`;
  return async (dispatch) => {
    const result = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "*/*",
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      dispatch({ type: GET_YOUTUBE, payload: result.data });
      localStorage.setItem("youtubeData", JSON.stringify(result.data));
    }
  };
};
