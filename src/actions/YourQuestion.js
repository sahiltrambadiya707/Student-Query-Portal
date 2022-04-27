import axios from "../Axios";
import { toast } from "react-toastify";

export const getYourQuestion = (email) => {
  return async (dispatch) => {
    const res = await axios.get(`/viewquestion/${email}`);
    if (res.status === 200) {
      const question = res.data;
      dispatch({
        type: "GET_QUESTION_BY_EMAIL",
        payload: {
          yourQuestions: question,
        },
      });
    }
  };
};

export const deleteYourQuestion = (id, key) => {
  return async (dispatch) => {
    if (key === "question") {
      const res = await axios.delete(`/viewquestion/question/${id}`);
      if (res.status === 200) {
        dispatch({
          type: "DELETE",
          payload: {
            res,
          },
        });
        toast.success("Your Question Delete Successfully", { autoClose: 1000 });
      }
    } else if (key === "comment") {
      const res = await axios.delete(`/viewquestion/comment/${id}`);
      if (res.status === 200) {
        dispatch({
          type: "DELETE",
          payload: {
            res,
          },
        });
        toast.success("Your Question Delete Successfully", { autoClose: 1000 });
      }
    } else if (key === "answer") {
      const res = await axios.delete(`/viewquestion/answer/${id}`);
      if (res.status === 200) {
        dispatch({
          type: "DELETE",
          payload: {
            res,
          },
        });
        toast.success("Your Question Delete Successfully", { autoClose: 1000 });
      }
    }
  };
};
