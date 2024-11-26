import React from "react";

const Login = () => {
  return (
    <div class="login">
      <h1>Login</h1>
      <div><input type="text" name="username" placeholder="Username" required="required" /></div>
      <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required="required"
          />
      </div>
      <div>
          <button className="">
            Let me in.
          </button>
      </div>
    </div>
  );
};

export default Login;
