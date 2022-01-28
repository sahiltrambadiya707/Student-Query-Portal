const initState = {
  AddQuestions: [],
};

export const AddQuestionReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_QUESTION":
      return {
        ...state,
        AddQuestions: action.payload.addQuestions,
      };
    default:
      return state;
  }
};
