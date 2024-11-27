import React, { useState } from "react";
import "../styles/dialog.css"

const InviteDialog = ({onClose, onInvite}) => {

    return(
        <dialog className="dialog" open>
          <div className="dialog-content">
            <h3>Invite users</h3>
            <div className="dialog-details">
              <div className="detail-item">
                <label>Invite users to collab via email:</label>
                <input type="email" placeholder="Enter email: " required/>
              </div>
            </div>
            <div className="dialog-buttons">  
              <button className="close-dialog" onClick={onClose}>Close</button>
              <button className="invite-button" onClick={onInvite}>Invite</button>
            </div>
          </div>
        </dialog>
    );
};

export default InviteDialog;