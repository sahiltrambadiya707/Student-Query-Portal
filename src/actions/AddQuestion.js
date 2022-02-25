import axios from "../Axios";
import { toast } from "react-toastify";

export const AddQuestions = (bodyJSON) => {
  return async (dispatch) => {
    const res = await axios.post(`/api/question`, bodyJSON);
    if (res.status === 201) {
      const addQuestion = res.data;
      dispatch({
        type: "ADD_QUESTION",
        payload: {
          addQuestions: addQuestion,
        },
      });
      toast.success("Question Add Successfully", { autoClose: 1000 });
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
