import React from "react";
import { loginUser } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "../assets/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const [searchParams, setSearchParams] = useSearchParams();
  //   const token = useSelector((state) => {
  //     return state.token;
  //   });
  const emailCEO = process.env.REACT_APP_EMAIL;
  const passwordCEO = process.env.REACT_APP_PASSWORD;

  const handleLogin = async (e, email, password) => {
    e.preventDefault();

    if (email === emailCEO && password === passwordCEO) {
      dispatch(
        loginUser({
          email,
        })
      );
      setSuccessMessage("Hi Ceo,you are loggged in.");
      setErrorMessage("");
      setPassword("");
      setEmail("");
      navigate("/search");
    } else {
      setErrorMessage("Only the CEO can access the website");
      setSuccessMessage("");
      setPassword("");
      setEmail("");
    }
  };

  const notify = () => {
    // toast.info(
    //   "This was added only for design purposes, no functionalities included.",
    //   {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   }
    // );
  };

  return (
    <div className="account-login section">
      <div className="container text-start">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12">
            <form
              onSubmit={(e) => {
                handleLogin(e, email, password);
              }}
              className="card login-form p-3"
            >
              <div className="card-body">
                <div className="title">
                  <h3 style={{ fontFamily: `Corporate S Regular, sans-serif` }}>
                    Login Now
                  </h3>
                  <p style={{ fontFamily: `Corporate S Regular, sans-serif` }}>
                    You can login using your social media account or email
                    address.
                  </p>
                </div>
                <div className="social-login">
                  <div className="loginSocialContainer">
                    <a
                      className="btn facebook-btn loginFacebook"
                      style={{
                        fontFamily: `Corporate S Regular, sans-serif`,
                      }}
                      onClick={notify}
                    >
                      <i className="fa-brands fa-facebook-f"></i> Facebook Login
                    </a>
                    <a
                      className="btn twitter-btn loginTwitter"
                      style={{
                        fontFamily: `Corporate S Regular, sans-serif`,
                      }}
                      onClick={notify}
                    >
                      <i className="fa-brands fa-twitter"></i> Twitter Login
                    </a>

                    <a
                      className="btn google-btn loginGoogle"
                      style={{
                        fontFamily: `Corporate S Regular, sans-serif`,
                      }}
                      onClick={notify}
                    >
                      <i className="fa-brands fa-google"></i> Google Login
                    </a>
                  </div>
                </div>
                <div className="alt-option">
                  <span
                    style={{ fontFamily: `Corporate S Regular, sans-serif` }}
                  >
                    Or
                  </span>
                </div>
                <div className="form-group input-group">
                  <label
                    htmlFor="reg-fn"
                    style={{ fontFamily: `Corporate S Regular, sans-serif` }}
                  >
                    Email
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    id="reg-email"
                    required=""
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group input-group">
                  <label
                    htmlFor="reg-fn"
                    style={{ fontFamily: `Corporate S Regular, sans-serif` }}
                  >
                    Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    id="reg-pass"
                    required=""
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex flex-wrap justify-content-between bottom-content">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input width-auto"
                      id="exampleCheck1"
                    />
                    <label
                      className="form-check-label"
                      style={{
                        fontFamily: `Corporate S Regular, sans-serif`,
                      }}
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    className="lost-pass"
                    href="#"
                    style={{ fontFamily: `Corporate S Regular, sans-serif` }}
                    onClick={notify}
                  >
                    Forgot password?
                  </a>
                </div>
                {errorMessage && (
                  <p className="loginError mt-2">{errorMessage}</p>
                )}
                <div className="button">
                  <button
                    className="btn"
                    type="submit"
                    style={{
                      backgroundColor: `rgb(213, 179, 117)`,
                      fontFamily: `Corporate S Regular, sans-serif`,
                    }}
                  >
                    Login
                  </button>
                </div>
                <div>
                  <p
                    className="outer-link"
                    style={{ fontFamily: `Corporate S Regular, sans-serif` }}
                  >
                    Don't have an account?
                    <Link
                      className="loginRef ml-1"
                      to="/register"
                      style={{
                        fontFamily: `Corporate S Regular, sans-serif`,
                      }}
                    >
                      Register here{" "}
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
