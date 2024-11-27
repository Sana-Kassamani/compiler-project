import React, { useState } from "react";
import Eye from "../assets/eye.svg";
import ClosedEye from "../assets/eye-closed.svg";

const Password = ({ setForm }) => {
  const [type, setType] = useState("password");
  const handleClick = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  };
  return (
    <div className="password">
      <input
        type={type}
        name="password"
        placeholder="Password"
        required="required"
        onChange={(e) => {
          setForm((prev) => {
            return {
              ...prev,
              password: e.target.value,
            };
          });
        }}
      />
      <div className="eye" onClick={handleClick}>
        <img src={type === "password" ? ClosedEye : Eye} alt="" />
      </div>
    </div>
  );
};

export default Password;
