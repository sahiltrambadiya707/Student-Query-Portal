import { useState, useEffect } from "react";
import loginImg from "../Images/avatar.svg";
import "../Style/registerPage.css";
import { Link } from "react-router-dom";
import {
  signInWithEmailLink,
  getAuth,
  isSignInWithEmailLink,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { app } from "../../firebase";

const RegisterPage = ({ history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("emailForSignIn"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email && !pass && !confirmPass) {
      toast.error("Email and password is required", { autoClose: 2000 });
      return;
    }

    if (!email) {
      toast.error("Email is required", { autoClose: 2000 });
      return;
    }

    if (!pass) {
      toast.error("password is required", { autoClose: 2000 });
      return;
    }

    if (!confirmPass) {
      toast.error("password is required", { autoClose: 2000 });
      return;
    }

    if (pass !== confirmPass) {
      toast.error("Password doesn't match", { autoClose: 2000 });
      return;
    }

    if (pass.length < 6) {
      toast.error("password must be at least 6 characters", {
        autoClose: 2000,
      });
      return;
    }

    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      signInWithEmailLink(auth, email, window.location.href)
        .then(async (result) => {
          window.localStorage.removeItem("emailForSignIn");
          if (result.user.emailVerified) {
            let user = auth.currentUser;
            await updateProfile(user, {
              displayName: `${firstName} ${lastName}`,
            })
              .then(() => {})
              .catch((error) => {
                toast.error(error.message, { autoClose: 2000 });
              });
            await updatePassword(user, pass)
              .then((res) => {})
              .catch((error) => {
                toast.error(error.message, { autoClose: 2000 });
              });
            localStorage.setItem("SQPT", user.accessToken);
          }
        })
        .catch((error) => {
          toast.error(error.message, { autoClose: 2000 });
        });
    }
    history.push("/");
  };

  return (
    <>
      <div className="rg-container">
        <div className="rg-register-container">
          <h1 className="rg-h1">Create your Account!</h1>
          <form action="/" method="" onSubmit={handleSubmit}>
            <div className="rg-name-input">
              <label className="rg-label">
                <span className="star">First Name</span>
                <input
                  className="rg-input-fn"
                  type="text"
                  name="firstName"
                  placeholder="Enter your first Name"
                  required={true}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </label>
              <label className="rg-label">
                <span className="star">Last Name</span>
                <input
                  className="rg-input-ln"
                  type="text"
                  name="lastName"
                  placeholder="Enter your last Name"
                  required={true}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </label>
            </div>
            <label className="rg-label">
              Email
              <input
                className="rg-input"
                type="email"
                name="email"
                value={email}
                readOnly
              />
            </label>
            <label className="rg-label">
              <span className="star">Password</span>
              <input
                className="rg-input"
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                value={pass}
              />
            </label>
            <label className="rg-label">
              <span className="star">Confirm password</span>
              <input
                className="rg-input"
                type="password"
                name="reEnterPassword"
                placeholder="Confirm password"
                onChange={(e) => {
                  setConfirmPass(e.target.value);
                }}
                value={confirmPass}
              />
            </label>
            <button
              disabled={!firstName && !lastName && !pass && !confirmPass}
              className="rg-sign-up"
            >
              {" "}
              sign up{" "}
            </button>
            <Link to="/login">
              <button className="rg-login">Login</button>
            </Link>
          </form>
        </div>
        <img className="rg-login-svg" src={loginImg} alt="" />
      </div>
    </>
  );
};

export default RegisterPage;
