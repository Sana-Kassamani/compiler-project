import React, { useState } from "react";
import LanguageSelector from "./LanguageSelector";
import "../styles/dialog.css";

const CreateFileDialog = ({ onClose, onCreate }) => {
  const [language, setLanguage] = useState("javascript");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const onSelect = (language) => {
    setLanguage(language);
  };

  const handleCreate = () => {
    if (!fileName.trim()) {
      setError("File name is required!");
      return;
    }
    onCreate(fileName, language);
  };

  return (
    <dialog className="dialog" open>
      <div className="dialog-content">
        <h3>Create File</h3>
        <div className="dialog-details">
          <div className="detail-item">
            <label>File name:</label>
            <input
              type="text"
              name="file"
              placeholder="file name"
              required
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
          <div className="detail-item">
            <label>Select Language:</label>
            <div className="language-input">
              <LanguageSelector language={language} onSelect={onSelect} />
            </div>
          </div>
        </div>
        <div className="dialog-buttons">
          <button className="close-dialog" onClick={onClose}>
            Close
          </button>
          <button className="create-button" onClick={handleCreate}>
            Create
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </dialog>
  );
};

export default CreateFileDialog;
