import React from "react";
import Invite from "../assets/invite.svg";

const File = ({ type, name, shared }) => {
  return (
    <div className="file">
      <div className="info">
        <img src={type} alt="" />
        <p>{name}</p>
      </div>
      {shared ? <p>Shared</p> : <img src={Invite} alt="Invite Button" />}
    </div>
  );
};

export default File;
