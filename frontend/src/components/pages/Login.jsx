import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import Password from "../Password";
import { request } from "./../../utils/request";
import { validateForm } from "../../utils/validate";
import { requestMethods } from "../../utils/enums/requestMethods";

const Login = () => {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/Home');
  }
  return (
    <div class="login">
      <h1>Login</h1>
      <input
        type="text"
        name="email"
        placeholder="Email address"
        required="required"
        onChange={(e) =>
          setForm((prev) => {
            return { ...prev, email: e.target.value };
          })
        }
      />
      <Password capturePassword={capturePassword} />

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
