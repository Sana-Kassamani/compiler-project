import React, { useState, useContext } from "react";
import Invite from "../assets/invite.svg";
import InviteDialog from "./InviteDialog";
import { fileContext } from "../context/fileContext";

const File = ({ type, name, shared, userType, file, index }) => {
  const { list, createFile, setSelectedFile } = useContext(fileContext);
  const [openInviteDialog, setopenInviteDialog] = useState(false);

  // open invite dialog
  const openIvitingDialog = () => {
    setopenInviteDialog(true);
  };

  // close invite dialog
  const closeInviteDialog = () => {
    setopenInviteDialog(false);
  };

  const sendInvite = (email) => {
    // (Aref)
    // send invite

    closeInviteDialog();
  };

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
        <img src={Invite} alt="Invite Button" onClick={openIvitingDialog} />
      )}
      {openInviteDialog && (
        <InviteDialog onClose={closeInviteDialog} onInvite={sendInvite} />
      )}
    </div>
  );
};

export default File;
