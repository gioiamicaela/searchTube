import React from "react";
import { loginUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
                </div>

                <div className="form-group input-group">
                  <label
                    htmlFor="reg-fn"
                    style={{
                      fontFamily: `Corporate S Regular, sans-serif`,
                      color: "#e6e6e6",
                    }}
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
                    style={{
                      fontFamily: `Corporate S Regular, sans-serif`,
                      color: "#e6e6e6",
                    }}
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

                {errorMessage && (
                  <p className="loginError mt-2">{errorMessage}</p>
                )}
                <div className="button">
                  <button
                    className="btn"
                    type="submit"
                    style={{
                      backgroundColor: `rgba(255, 255, 255, 0.55)`,
                      fontFamily: `Corporate S Regular, sans-serif`,
                    }}
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
