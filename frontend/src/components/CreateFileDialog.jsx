import React from "react";
import LanguageSelector from "./LanguageSelector";

const CreateFileDialog = () => {
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
                <input type="text" name="file"/>
              </div>
              <div className="detail-item">
                <label>Select Language:</label>
                <LanguageSelector language={language} onSelect={onSelect}/>
              </div>
            </div>
            <div className="dialog-buttons">  
              <button className="close-dialog">Close</button>
              <button className="create-button">Save</button>
            </div>
          </div>
        </dialog>
    );

}