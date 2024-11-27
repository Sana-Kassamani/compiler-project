import React, { useContext } from "react";
import Invite from "../assets/invite.svg";
import { fileContext } from "../context/fileContext";

const File = ({ type, name, shared, userType, file, index }) => {
  const { list, createFile, setSelectedFile } = useContext(fileContext);

  return (
    <div
      className="file"
      onClick={() => {
        console.log("Selected file", file);
        setSelectedFile(index);
        console.log("Selected file", file);
      }}
    >
      <div className="info">
        <img src={type} alt="" />
        {/* <img src={f.language} alt="" /> */}
        <p>{file.filename}</p>
      </div>
      {file.shared ? (
        <p>{file.type}</p>
      ) : (
        <img src={Invite} alt="Invite Button" />
      )}
    </div>
  );
};

export default File;
