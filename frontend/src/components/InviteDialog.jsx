import React, { useState } from "react";
import "../styles/dialog.css";

const InviteDialog = ({ onClose, onInvite }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("viewer");
  const [error, setError] = useState("");

  const handleInvite = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (email.trim() === "" || !emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!role) {
      setError("Please select a role.");
      return;
    }

    onInvite(email, role);
    onClose();
  };

  return (
    <dialog className="dialog" open>
      <div className="dialog-content">
        <h3>Invite Users</h3>
        <div className="dialog-details">
          <div className="detail-item">
            <label>Invite users to collab via email:</label>
            <input
              type="email"
              placeholder="Enter email:"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="detail-item">
            <p>Select Role:</p>
            <div className="radio-group">
              <label>
                Viewer
                <input
                  type="radio"
                  name="role"
                  value="viewer"
                  checked={role === "viewer"}
                  onChange={() => setRole("viewer")}
                />
              </label>
              <label>
                Editor
                <input
                  type="radio"
                  name="role"
                  value="editor"
                  checked={role === "editor"}
                  onChange={() => setRole("editor")}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="dialog-buttons">
          <button className="close-dialog" onClick={onClose}>
            Close
          </button>
          <button className="invite-button" onClick={handleInvite}>
            Invite
          </button>
        </div>

        {error && <p className="error">{error}</p>}
      </div>
    </dialog>
  );
};

export default InviteDialog;
