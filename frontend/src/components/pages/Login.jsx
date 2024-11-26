import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import Password from "../Password";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/Home');
  }
  return (
    <div class="login">
      <h1>Login</h1>
      <input
        type="text"
        name="username"
        placeholder="Username"
        required="required"
      />
      <Password />

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
    </div>
  );
};

export default Login;
