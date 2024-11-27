import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/base/base.css";
import "../../styles/Login.css";
import Password from "../Password";
import { request } from "./../../utils/request";
import { validateForm } from "../../utils/validate";
import { requestMethods } from "../../utils/enums/requestMethods";

const Login = () => {
  const [error, setError] = useState("");
  const [form, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleLogin = async () => {
    console.log("clicked");
    if (!validateForm(form)) {
      setError("All fields are required!");
      return;
    }
    try {
      const response = await request({
        route: "login",
        method: requestMethods.POST,
        body: form,
      });
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/Home");
      } else {
        setError(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        name="email"
        placeholder="Email address"
        required="required"
        onChange={(e) => {
          setLoginForm((prev) => {
            return { ...prev, email: e.target.value };
          });
        }}
      />
      <Password setForm={setLoginForm} />

      <button onClick={handleLogin}>Let me in !</button>
      <p>
        Don't have an account?{" "}
        <b
          onClick={() => {
            navigate("/Register");
          }}
        >
          Register
        </b>
      </p>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
