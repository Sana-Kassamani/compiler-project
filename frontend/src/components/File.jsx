import React, { useState } from "react";
import Invite from "../assets/invite.svg";
import InviteDialog from "./InviteDialog";

const File = ({ type, name, shared }) => {
  const [openInviteDialog, setopenInviteDialog] = useState(false);  

  // open invite dialog
    const openIvitingDialog = () =>{
      setopenInviteDialog(true);
  }

  // close invite dialog
  const closeInviteDialog = () =>{
      setopenInviteDialog(false);
  }

  const sendInvite = (email) => {

      // (Aref)
      // send invite

      closeInviteDialog();
  }
  return (
    <div className="file">
      <div className="info">
        <img src={type} alt="" />
        <p>{name}</p>
      </div>
      {shared ? (<p>Shared</p>) : (<img src={Invite} alt="Invite Button" onClick={openIvitingDialog}/>)}

      {openInviteDialog && (
          <InviteDialog
              onClose={closeInviteDialog}
              onInvite={sendInvite}
          />
      )}
    </div>
  );
};

export default File;
