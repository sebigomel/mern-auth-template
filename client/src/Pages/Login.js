import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import server from "../Config/axios";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState({});
  let navigate = useNavigate();

  const handleAlertClose = () => {
    let copyOfObject = { ...loginData };
    delete copyOfObject["error"];

    setLoginData((prevData) => ({
      ...copyOfObject,
    }));
  };

  useEffect(async () => {
    try {
      const response = await server.get("/user");
      if (response.data.redirectUrl) navigate(response.data.redirectUrl);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleChange = (e) => {
    let updatedValue = {};
    updatedValue[e.target.name] = e.target.value;
    setLoginData((prevData) => ({
      ...prevData,
      ...updatedValue,
    }));
  };
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await server.put("/user", loginData);
      console.log(response.status, response.data);
      navigate("products");
    } catch (err) {
      let updatedValue = {};
      updatedValue = { error: err.response.data.message };
      setLoginData((prevData) => ({
        ...prevData,
        ...updatedValue,
      }));
      setTimeout(() => handleAlertClose(), 4000);
    }
  };
  return (
    <div className="auth-container">
      <h3>Login</h3>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="loginControl">
          <FloatingLabel label="Email Adress" className="login-input">
            <Form.Control
              name="email"
              type="email"
              placeholder="name@example.com"
              size="lg"
              onChange={handleChange}
            />
          </FloatingLabel>
          <FloatingLabel label="Password" className="login-input">
            <Form.Control
              name="password"
              type="password"
              placeholder="name@example.com"
              size="lg"
              onChange={handleChange}
            />
          </FloatingLabel>
        </Form.Group>
        <Button as="input" type="submit" value="Submit" />
        <Link to="/signup">Dont have an account? Sign up here</Link>
        {loginData.error && (
          <Alert variant="danger" onClose={handleAlertClose} dismissible>
            {loginData.error}
          </Alert>
        )}
      </Form>
    </div>
  );
}
