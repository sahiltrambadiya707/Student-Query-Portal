import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = localStorage.getItem("SQPT");
        const emailForSignIn = localStorage.getItem("emailForSignIn");
        if (token || emailForSignIn) {
          return <Component {...props} />;
        } else {
          return <Redirect to={`/login`} />;
        }
      }}
    />
  );
};

export default PrivateRoute;

// const auth = getAuth();

// const PrivateRoute = async ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       auth.currentUser ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/login",
//           }}
//         />
//       )
//     }
//   />
// );
