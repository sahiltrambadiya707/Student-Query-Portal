import "../Style/loginPage.css";
import { Link } from "react-router-dom";
import loginImg from "../Images/login.svg";
import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { LoggedInUser } from "../../actions/actions";

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email && !password) {
      toast.error(`please enter email and password`);
      setLoading(false);
      return;
    }

    if (!email) {
      toast.error(`please enter email`);
      setLoading(false);
      return;
    }

    if (!password) {
      toast.error(`please enter password`);
      setLoading(false);
      return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        dispatch(LoggedInUser(user));
        localStorage.setItem("SQPT", user.accessToken);
        history.push("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  const googleLogin = (e) => {
    e.preventDefault();
    setLoadingGoogle(true);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = await result.user;
        dispatch(LoggedInUser(user));
        localStorage.setItem("SQPT", user.accessToken);
        history.push("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setLoadingGoogle(false);
      });
  };

  return (
    <>
      <div className="login-container">
        <div className="login-lg-container">
          <h1 className="login-h1">Welcome Back!</h1>
          <form action="/" method="">
            <label className="login-label">
              Email
              <input
                className="login-input"
                type="email"
                name="email"
                placeholder="Enter yout email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </label>
            <label className="login-label">
              Password
              <input
                className="login-input"
                type="password"
                name="password"
                placeholder="Enter yout password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>
            <label htmlFor="" className="login-label-checkbox">
              <Link className="login-forgot-pass" to="/forgot/password">
                forgot password?
              </Link>
            </label>
            <button className="login-login" onClick={handleSubmit}>
              {loading ? <i className="fa fa-spinner fa-spin "></i> : "Login"}
            </button>
            <button className="login-login-with-google" onClick={googleLogin}>
              {loadingGoogle ? (
                <i className="fa fa-spinner fa-spin "></i>
              ) : (
                "Login with google"
              )}
            </button>
            <Link to="/register">
              <button className="login-sign-up">Sign-up</button>
            </Link>
          </form>
        </div>
        <img className="login-svg" src={loginImg} alt="" />
      </div>
    </>
  );
};

export default LoginPage;
