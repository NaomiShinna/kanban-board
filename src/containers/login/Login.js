import React, { useRef, useState, useEffect, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "../../api/axios";
const LOGIN_URL = "/auth/login";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
        }
      );
      // console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.auth_token;
      setAuth({ email, password, accessToken });

      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
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

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <>
      <Container>
        <Row>
          <Col xs={1} sm={1} md={3} lg={3} xl={3} xxl={3}></Col>
          <Col xs={10} sm={10} md={6} lg={6} xl={6} xxl={6}>
            <p
              ref={errRef}
              className={errorMessage ? "errorMessage" : "hideMessage"}
              aria-live="assertive"
            >
              {errorMessage}
            </p>
            <h1>Login</h1>
            <form noValidate onSubmit={submitLogin}>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <Button type="submit" className="mt-3" variant="primary">Login</Button>
            </form>
            <p>
              Need an Account?
              <span className="line">
                <Link to="/signup">Sign Up</Link>
              </span>
            </p>
          </Col>
          <Col xs={1} sm={1} md={3} lg={3} xl={3} xxl={3}></Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
