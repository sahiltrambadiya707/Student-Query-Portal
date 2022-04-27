import "../Style/emailRegister.css";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import loginImg from "../Images/register.svg";
// eslint-disable-next-line no-unused-vars
import { app } from "../../firebase";

const EmailRegister = ({ history }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    const auth = getAuth();
    sendSignInLinkToEmail(auth, email, config)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        toast.success(
          `Email is send to ${email}. Click the link to complete your registration.`
        );
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
    setEmail("");
  };

  return (
    <>
      <div className="email-container">
        <form autoComplete="off" onSubmit={handleSubmit} className="email-form">
          <h1 className="rg-h1">Register here!</h1>
          <label className="email-label">
            <span className="star">Email</span>
            <input
              autoComplete="false"
              className="email-input"
              type="email"
              name="email"
              placeholder="Enter your email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button disabled={!email} className="email-register">
            {" "}
            Register{" "}
          </button>
        </form>
        <img className="email-svg" src={loginImg} alt="" />
      </div>
    </>
  );
};

export default EmailRegister;
