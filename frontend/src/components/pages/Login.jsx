import React from "react";
import "../../styles/Login.css";

const Login = () => {
  return (
    <div class="login">
      <h1>Login</h1>
      <input
        type="text"
        name="username"
        placeholder="Username"
        required="required"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required="required"
      />
      <button className="">Let me in !</button>
    </div>
  );
};

export default Login;
