import React, { useState } from "react";
import Password from "../Password";
import "../../styles/base/base.css";
import { useNavigate } from "react-router-dom";
import { request } from "./../../utils/request";
import { validateForm } from "../../utils/validate";
import { requestMethods } from "../../utils/enums/requestMethods";

const Register = () => {
  const [error, setError] = useState("");
  const [form, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleRegister = async () => {
    if (!validateForm(form)) {
      setError("All fields are required!");
      return;
    }
    try {
      const response = await request({
        route: "register",
        method: requestMethods.POST,
        body: form,
      });
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        navigate("/Home");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="login">
      <h1>Register</h1>
      <input
        type="text"
        name="username"
        placeholder="Username"
        required="required"
        onChange={(e) => {
          setRegisterForm((prev) => {
            return { ...prev, username: e.target.value };
          });
        }}
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        required="required"
        onChange={(e) => {
          setRegisterForm((prev) => {
            return { ...prev, email: e.target.value };
          });
        }}
      />
      <Password setForm={setRegisterForm} />
      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account?{" "}
        <b
          onClick={() => {
            navigate("/");
          }}
        >
          Login
        </b>
      </p>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};
export default Register;
