import axios from "../Axios";

export const getQuestion = () => {
  return async (dispatch) => {
    const res = await axios.get(`/question`);
    if (res.status === 200) {
      const question = res.data.reverse();
      dispatch({
        type: "GET_QUESTION",
        payload: {
          questions: question,
        },
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: "Error",
        payload: {
          error,
        },
      });
    }
  };
};
