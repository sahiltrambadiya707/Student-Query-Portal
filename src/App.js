import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import AboutUs from "./components/Pages/AboutUs";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Pages/Home";
import EmailRegister from "./components/Pages/EmailRegister";
import RegisterPage from "./components/Pages/RegisterPage";
import LoginPage from "./components/Pages/LoginPage";
import { LoggedInUser } from "./actions/actions";
import ForgotPassword from "./components/Pages/forgotPassword";
import AllQuestion from "./components/QnA/AllQuestion/index";
import ViewQuestion from "./components/QnA/ViewQuestion/index";
import AddQuestion from "./components/QnA/AddQuestion/AddQuestion";
import YourQuestion from "./components/QnA/YourQuestion/YourQuestion";

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch(LoggedInUser(auth.currentUser, idTokenResult.token));
      }
    });
    return () => unsubscribe();
  }, [dispatch, auth]);

  const PrivateRoute = ({ component: QnA, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <QnA {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );

  return (
    <>
      <ToastContainer />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/complete" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={EmailRegister} />
          <Route exact path="/forgot/password" component={ForgotPassword} />
          <Route exact path="/aboutus" component={AboutUs} />

          <PrivateRoute exact path="/all-question" component={AllQuestion} />
          <PrivateRoute exact path="/view-question" component={ViewQuestion} />
          <PrivateRoute exact path="/add-question" component={AddQuestion} />
          <PrivateRoute exact path="/your-question" component={YourQuestion} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
