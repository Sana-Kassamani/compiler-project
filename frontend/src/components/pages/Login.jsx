import React, { useState } from "react";
import "../../styles/Login.css";
import Eye from '../../assets/eye.svg'
import ClosedEye from '../../assets/eye-closed.svg'

const Login = () => {
    const [type, setType] = useState('password');
  return (
    <div class="login">
      <h1>Login</h1>
      <input
        type="text"
        name="username"
        placeholder="Username"
        required="required"
      />

      <div className="password">
          <input
            type={type}
            name="password"
            placeholder="Password"
            required="required"
          />
          <div className="eye"><img src={type === 'password' ? ClosedEye : Eye} alt="" /></div>
      </div>
      <button className="">Let me in !</button>
    </div>
  );
};

export default Login;
