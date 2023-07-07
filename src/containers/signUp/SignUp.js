import React, { useRef, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../App.css";
import axios from "../../api/axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SIGNUP_URL = "/signup";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const PWD_REGEX = /^(?=.[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [validPasswordC, setValidPasswordC] = useState(false);
  const [passwordCFocus, setPasswordCFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    // const result = USER_REGEX.test(name);
    const result = name != "" ? true : false;
    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    // const result = PWD_REGEX.test(password);
    const result = password != "" ? true : false;
    setValidPassword(result);

    const match = password === passwordConfirmation;
    setValidPasswordC(match);
  }, [password, passwordConfirmation]);

  useEffect(() => {
    setErrorMessage("");
  }, [name, email, password, passwordConfirmation]);

  const submitSignUp = async (e) => {
    e.preventDefault();

    if (password === "" || passwordConfirmation === "") {
      return;
    }

    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({ name, email, password, passwordConfirmation }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
        }
      );

      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");

      setSuccess(true);
    } catch (err) {
      if (!err.response) {
        setErrorMessage("No Server Response");
      } else if (err.response?.status === 409) {
        setErrorMessage("Name has been taken");
      } else {
        setErrorMessage("Sign Up FAILED");
      }
      errRef.current.focus();
    }
  };

  if (success) {
    return <Navigate replace to="/" />;
  } else {
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
              <h1>Sign Up</h1>
              <Form onSubmit={submitSignUp}>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="nameIdNote"
                  onFocus={() => setNameFocus(true)}
                  onBlur={() => setNameFocus(false)}
                  required
                />

                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailIdNote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  required
                />

                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  aria-invalid={validPassword ? "false" : "true"}
                  aria-describedby="passwordIdNote"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  required
                />

                <Form.Label htmlFor="passwordC">
                  Password Confirmation
                </Form.Label>
                <Form.Control
                  type="password"
                  id="passwordC"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  value={passwordConfirmation}
                  aria-invalid={validPasswordC ? "false" : "true"}
                  aria-describedby="passwordCIdNote"
                  onFocus={() => setPasswordCFocus(true)}
                  onBlur={() => setPasswordCFocus(false)}
                  required
                />

                <Button type="submit"
                  disabled={
                    !validName ||
                    !validEmail ||
                    !validPasswordC ||
                    password === "" ||
                    passwordConfirmation === ""
                      ? true
                      : false
                  }
                  className="mt-3"
                  variant={
                    !validName ||
                    !validEmail ||
                    !validPasswordC ||
                    password === "" ||
                    passwordConfirmation === ""
                      ? "secondary"
                      : "primary"
                  }
                >
                  Sign Up
                </Button>
              </Form>
              <p>
                Already registered?
                <span className="line">
                  <Link to="/">Login</Link>
                </span>
              </p>
            </Col>
            <Col xs={1} sm={1} md={3} lg={3} xl={3} xxl={3}></Col>
          </Row>
        </Container>
      </>
    );
  }
};

export default SignUp;
