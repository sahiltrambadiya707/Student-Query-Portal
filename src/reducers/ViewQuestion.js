const initState = {
  questionDetail: [],
  // answer: [],
  // comment: [],
};

export const viewQuestionReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_QUESTION_DETAILS_BY_ID":
      return {
        ...state,
        questionDetail: action.payload.questionDetails,
      };
    case "ADD_ANSWER":
      return {
        ...state,
        // answer: action.payload.answers,
      };
    case "ADD_COMMENT":
      return {
        ...state,
        // comment: action.payload.comments,
      };
    default:
      return state;
  }
};
