import React from "react";
import Password from "../Password";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const handleRegister = () => {
        navigate('/Home');
      }
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
      <button onClick={handleRegister}>Register</button>
      <p>Already have an account? <b onClick={() => {navigate('/')}}>Login</b></p>
    </div>
  );
};

export default Register;
