import React from "react";
import "../../styles/Login.css";
import Password from "../Password";


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
        <Password/>
      
      <button className="">Let me in !</button>
    </div>
  );
};

export default Login;
