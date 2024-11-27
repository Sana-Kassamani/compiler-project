import React, { useState } from "react";
import Password from "../Password";
import { useNavigate } from "react-router-dom";
import { request } from "./../../utils/request";
import { validateForm } from "../../utils/validate";
import { requestMethods } from "../../utils/enums/requestMethods";

const Register = () => {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleRegister = () => {
    if (!validateForm(form)) {
      setError("All fields are required!");
      return;
    }
    try {
      const response = request("register", requestMethods.POST, form);
      localStorage.setItem("token", response.token);
      navigate("/Home");
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  const capturePassword = (e) => {
    setForm((prev) => {
      return {
        ...prev,
        password: e.target.value,
      };
    });
    return (
      <div class="login">
        <h1>Register</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required="required"
          onChange={(e) =>
            setForm((prev) => {
              return { ...prev, username: e.target.value };
            })
          }
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required="required"
          onChange={(e) =>
            setForm((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
        />
        <Password capturePassword={capturePassword} />
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
      </div>
    );
  };
};
export default Register;
