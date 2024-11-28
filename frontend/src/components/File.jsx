import React, { useState, useContext } from "react";
import emailjs from "@emailjs/browser";
import Invite from "../assets/invite.svg";
import InviteDialog from "./InviteDialog";
import { fileContext } from "../context/fileContext";
import { request } from "../utils/request";

const File = ({ type, name, shared, userType, file, index }) => {
  const { setSelectedFile } = useContext(fileContext);
  const [openInviteDialog, setOpenInviteDialog] = useState(false);

  // open invite dialog
  const openInvitingDialog = () => {
    setOpenInviteDialog(true);
  };

  // close invite dialog
  const closeInviteDialog = () => {
    setOpenInviteDialog(false);
  };

  const sendInvite = async (email, role) => {
    const result = await request({
      route: "/invite",
      body: {
        inviting: file.owner_id,
        invited: email,
        file: file.id,
        type: role,
      },
      method: "POST",
    });
    console.log(result.data);
    const id = result.data.new_invitation.id;
    emailjs.send(
      "service_sl9j08x",
      "template_xh85vsl",
      {
        email,
        id: id,
      },
      "j9bxn6hYnwUkTqR9o"
    );
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
        <img src={Invite} alt="Invite Button" onClick={openInvitingDialog} />
      )}
      {openInviteDialog && (
        <InviteDialog onClose={closeInviteDialog} onInvite={sendInvite} />
      )}
    </div>
  );
};

export default File;
