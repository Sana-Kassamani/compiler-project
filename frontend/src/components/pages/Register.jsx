import React from "react";
import Password from "../Password";

const Register = () => {
  return (
    <div class="login">
      <h1>Register</h1>
      <input
        type="text"
        name="username"
        placeholder="Username"
        required="required"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required="required"
      />
      <Password />
      <button className="">Let me in !</button>
    </div>
  );
};

export default Register;
