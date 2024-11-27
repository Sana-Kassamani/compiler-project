import React, { useState } from "react";
import "../styles/dialog.css"

const InviteDialog = ({onClose, onInvite}) => {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleInvite = () => {
        const emailRegex = /^(?=.*[a-z])(?=.*\W).{12,}$/;
        
        if (email.trim() === "" || !emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        onInvite(email);
    }

    return(
        <dialog className="dialog" open>
          <div className="dialog-content">
            <h3>Invite users</h3>
            <div className="dialog-details">
              <div className="detail-item">
                <label>Invite users to collab via email:</label>
                <input type="email" placeholder="Enter email: " required value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="dialog-buttons">  
              <button className="close-dialog" onClick={onClose}>Close</button>
              <button className="invite-button" onClick={handleInvite}>Invite</button>
            </div>

            {error && <p className="error">{error}</p>}
          </div>
        </dialog>
    );
};

export default InviteDialog;