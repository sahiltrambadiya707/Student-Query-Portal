const initState = {
  questions: [],
};

export const AllQuestionReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_QUESTION":
      return {
        ...state,
        questions: action.payload.questions,
      };
    default:
      return state;
  }
};
