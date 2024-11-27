import React, { useEffect } from "react";
import { requestApi } from "../../utils/request";
import Check from "../../assets/check.svg";
import "../../styles/Accepted.css";
import { useNavigate } from "react-router-dom";

const Accepted = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/");
  };

  const acceptInvitation = async () => {
    const result = await requestApi({
      route: "/accept",
      method: "PUT",
    });
    console.log(result);
  };

  useEffect(() => {
    acceptInvitation();
  }, []);

  return (
    <div className="accepted">
      <img src={Check} alt="Accepted" />
      <h1>Invitation Accepted</h1>
      <button onClick={handleClick}>Login</button>
    </div>
  );
};

export default Accepted;
