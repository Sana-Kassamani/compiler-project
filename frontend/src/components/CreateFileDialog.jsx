import React, { useState } from "react";
import LanguageSelector from "./LanguageSelector";
import "../styles/dialog.css"

const CreateFileDialog = ({onClose, onCreate}) => {
    const [language, setLanguage] = useState("javascript");

    const onSelect = (language) => {
      setLanguage(language);
    };

    return(
        <dialog className="dialog" open>
          <div className="dialog-content">
            <h3>Create File</h3>
            <div className="dialog-details">
              <div className="detail-item">
                <label>File name:</label>
                <input type="text" name="file" placeholder="file name" required/>
              </div>
              <div className="detail-item">
                <label>Select Language:</label>
                <div className="language-input">
                  <LanguageSelector language={language} onSelect={onSelect}/>
                </div>
              </div>
            </div>
            <div className="dialog-buttons">  
              <button className="close-dialog" onClick={onClose}>Close</button>
              <button className="create-button" onClick={onCreate}>Create</button>
            </div>
          </div>
        </dialog>
    );

};

export default CreateFileDialog;