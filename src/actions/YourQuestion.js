import axios from "../Axios";
import { toast } from "react-toastify";

export const getYourQuestion = (email) => {
  return async (dispatch) => {
    const res = await axios.get(`/api/viewquestion/${email}`);
    if (res.status === 200) {
      const question  = res.data;
      dispatch({
        type: "GET_QUESTION_BY_EMAIL",
        payload: {
          yourQuestions: question,
        },
      });
    }
  };
};

export const deleteYourQuestion = (id) => {
  return async (dispatch) => {
    const res = await axios.delete(`/api/viewquestion/${id}`);
    if (res.status === 200) {
      dispatch({
        type: "DELETE",
        payload: {
          res,
        },
      });
      toast.success("Your Question Delete Successfully", { autoClose: 1000 });
    }
  };
};
