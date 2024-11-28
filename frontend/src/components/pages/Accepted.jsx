import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { request } from "../../utils/request";
import Check from "../../assets/check.svg";
import "../../styles/Accepted.css";

const Accepted = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    navigate("/");
  };

  const acceptInvitation = async () => {
    if (!id) {
      console.error("No ID found in the URL.");
      return;
    }

    try {
      const result = await request({
        route: `/accept/${id}`, 
      });
      console.log(result);
    } catch (error) {
      console.error("Error accepting invitation:", error);
    }
  };

  useEffect(() => {
    acceptInvitation();
  }, [id]);

  return (
    <div className="accepted">
      <img src={Check} alt="Accepted" />
      <h1>Invitation Accepted</h1>
      <button onClick={handleClick}>Login</button>
    </div>
  );
};

export default Accepted;
