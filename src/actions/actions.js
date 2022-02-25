const INITIAL_VALUE = {
  displayName: "",
  email: "",
  UID: "",
  emailVerified: null,
  token: null,
};

export const LoggedInUser = (data = INITIAL_VALUE, token) => {
  return async (dispatch) => {
    dispatch({
      type: "LOGGED_IN_USER",
      payload: {
        name: data?.displayName,
        email: data?.email,
        emailVerified: data?.emailVerified,
        token: data?.accessToken,
      },
    });
  };
};

export const LoggedOutUser = () => {
  return async (dispatch) => {
    localStorage.removeItem("SQPT");
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
  };
};
