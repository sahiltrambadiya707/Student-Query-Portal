import "../Style/emailRegister.css";
import { useState } from "react";
import loginImg from "../Images/forgot-password.svg";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success(
          `check your mail for password reset link. you'll be redirected to login page in 5 seconds.`
        );
        setTimeout(() => history.push("/login"), 5000);
      })
      .catch((error) => {
        toast.error(error.message);
        // ..
      });
  };

  return (
    <>
      <div className="email-container">
        <form className="email-form" onSubmit={handleSubmit}>
          <h1 className="rg-h1">Forgot Password?</h1>
          <label className="email-label">
            Email
            <input
              className="email-input"
              type="email"
              name="email"
              placeholder="Enter your email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoFocus={true}
            />
          </label>
          <button className="email-register" disabled={!email}>
            Submit
          </button>
        </form>
        <img className="email-svg" src={loginImg} alt="" />
      </div>
    </>
  );
};

export default ForgotPassword;
