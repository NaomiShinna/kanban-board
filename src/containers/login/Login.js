import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../config/AuthProvider";
import { Link } from "react-router-dom";

import axios from "../../api/axios";
const LOGIN_URL = "/auth/login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const submitLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*' },
          withCredentials: false,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, password, roles, accessToken });

      setEmail("");
      setPassword("");
      setSuccess(true);
    } catch (err) {
      if (!err.response) {
        setErrorMessage("No Server Response");
      } else if (err.response?.status === 400) {
        setErrorMessage("Missing Email or Password");
      } else if (err.response?.status === 401) {
        setErrorMessage("Unauthorized");
      } else {
        setErrorMessage("Login FAILED");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in</h1>
          <br />
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errorMessage ? "errorMessage" : "hideMessage"}
            aria-live="assertive"
          >
            {errorMessage}
          </p>
          <h1>Login</h1>
          <form onSubmit={submitLogin}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />

            <button>Login</button>
            <p>
              Need an Account?{" "}
              <span className="line">
                <Link to="/signup">Sign Up</Link>
              </span>
            </p>
          </form>
        </section>
      )}
    </>
  );
}

export default Login;
