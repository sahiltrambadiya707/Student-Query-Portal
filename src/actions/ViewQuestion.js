import axios from "../Axios";
import { toast } from "react-toastify";

export const getQuestionDetails = (id) => {
  return async (dispatch) => {
    const res = await axios.get(`/api/question/${id}`);
    if (res.status === 200) {
      const questionDetail = res.data;
      dispatch({
        type: "GET_QUESTION_DETAILS_BY_ID",
        payload: {
          questionDetails: questionDetail,
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

export const addAnswer = (body) => {
  return async (dispatch) => {
    const res = await axios.post("/api/answer", body);
    if (res.status === 201) {
      const answer = res.data;
      dispatch({
        type: "ADD_ANSWER",
        payload: {
          answers: answer,
        },
      });
      dispatch(getQuestionDetails(res.data.question_id));
      toast.success("Answer Add Successfully", { autoClose: 1000 });
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

export const addComment = (body) => {
  return async (dispatch) => {
    const res = await axios.post(`/api/comment`, body);
    if (res.status === 201) {
      const comment = res.data;
      dispatch({
        type: "ADD_COMMENT",
        payload: {
          comments: comment,
        },
      });
      toast.success("Comment Add Successfully", { autoClose: 1000 });
      dispatch(getQuestionDetails(res.data.question_id));
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
