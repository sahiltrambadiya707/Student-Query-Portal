const initState = {
  yourQuestions: [],
  delete: "",
};

export const yourQuestionReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_QUESTION_BY_EMAIL":
      return {
        ...state,
        yourQuestions: action.payload.yourQuestions,
      };
    case "DELETE":
      return {
        ...state,
        delete: action.payload.res,
      };
    default:
      return state;
  }
};
