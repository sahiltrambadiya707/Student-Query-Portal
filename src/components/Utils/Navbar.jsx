import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { LoggedOutUser } from "../../actions/actions";
import { Link, useHistory } from "react-router-dom";
import logo from "../Images/logo.svg";
import "../Style/navbar.css";

const Navbar = () => {
  const history = useHistory();
  let y = document.querySelectorAll(".box");
  const dispatch = useDispatch();
  y.forEach((element) => {
    element.onclick = function (e) {
      var head = e.currentTarget;
      head.classList.add("trans");
      setTimeout(function () {
        head.classList.toggle("active");
      }, 280);
    };
  });

  const { user } = useSelector((state) => ({ ...state }));

  const logout = () => {
    const auth = getAuth();
    auth.signOut();
    dispatch(LoggedOutUser());
    history.push("/login");
  };

  return (
    <>
      <nav className="navbar-main">
        <Link to="/">
          <img className="navbar-logo" src={logo} alt="" />
        </Link>

        <div className="menu-toggle">
          <span>
            <section className="classic">
              <div className="center-content">
                <div className="box box-five">
                  <span className="ba bar-1"></span>
                  <span className="ba bar-2"></span>
                  <span className="ba bar-3"></span>
                </div>
              </div>
            </section>
          </span>
        </div>
        <ul className="navbar-main-list">
          <li className="navbar-home-btn">
            <Link className="navbar-link" to="/">
              Home
            </Link>
          </li>
          <li className="navbar-qna-btn">
            {" "}
            <Link className="navbar-link" to="/all-question">
              QnA
            </Link>
          </li>
          <li className="navbar-about-us-btn">
            <Link className="navbar-link" to="/aboutus">
              About Us
            </Link>
          </li>
          <li className="navbar-contact-us-btn">
            <Link className="navbar-link" to="#footer_section">
              Contact Us
            </Link>
          </li>
        </ul>
        <ul className="navbar-user-list">
          <li>
            <Link className="navbar-link" to="/register">
              {user && user.token ? null : "Register"}
            </Link>
          </li>
          <li>
            <Link className="navbar-link" onClick={logout} to="/login">
              {user && user.token ? "logout" : "login"}
            </Link>
          </li>
        </ul>
      </nav>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/">
            <img className="navbar-logo" src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            style={{ border: "none" }}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div
              id="toggle"
              onClick={(e) =>
                document.querySelector("#toggle").classList.toggle("on")
              }
            >
              <div className="one"></div>
              <div className="two"></div>
              <div className="three"></div>
            </div>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {/* <span onClick={scrollTop()}> */}
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
              {/* </span> */}
              <Link className="nav-link" to="/all-question">
                QnA
              </Link>
              <Link className="nav-link" to="/aboutus">
                About Us
              </Link>
              <Link className="nav-link" to="#footer_section">
                Contact Us
              </Link>
              <hr />
              <Link className="navbar-link" to="/register">
                {user && user.token ? null : "Register"}
              </Link>
              <Link className="navbar-link" onClick={logout} to="/login">
                {user && user.token ? "logout" : "login"}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
