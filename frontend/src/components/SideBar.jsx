import React, { useState } from "react";
import File from "../components/File";
import Plus from "../assets/plus.svg";
import Python from "../assets/Python.png";
import "../styles/SideBar.css";
import CreateFileDialog from "./CreateFileDialog";

const SideBar = () => {
  const [openCreateFileDialog, setopenCreateFileDialog] = useState(false);

  // open create file dialog
  const openFileDialog = () =>{ 
    setopenCreateFileDialog(true);
  }

  // close the create file dialog
  const closeFileDialog = () =>{ 
    setopenCreateFileDialog(false);
  }

  // create the file
  const createFile = (fileName, language) => {
    // (Sana)
    // create the file
    // before adding the file to the db put the extension with the file in the db using the LanguageExtensions constant

    closeFileDialog();
  }

  return (
    <div className="side-bar">
      <div className="files">
        <div className="files-title">
          <h2>Files</h2>
          <button onClick={openFileDialog}>
            <img src={Plus} alt="Add File" />
          </button>
        </div>
        <div className="file-list">
          <File type={Python} name={"App.py"} shared={true} />
          <File type={Python} name={"App.py"} />
          <File type={Python} name={"App.py"} />
          <File type={Python} name={"App.py"} />
          <File type={Python} name={"App.py"} shared={true} />
          <File type={Python} name={"App.py"} />
          <File type={Python} name={"App.py"} shared={true} />
          <File type={Python} name={"App.py"} />
          <File type={Python} name={"App.py"} shared={true} />
          <File type={Python} name={"App.py"} />
          <File type={Python} name={"App.py"} />
          <File type={Python} name={"App.py"} shared={true} />
          <File type={Python} name={"App.py"} />
          <File type={Python} name={"App.py"} />
          <File type={Python} name={"App.py"} shared={true} />
        </div>
      </div>
      <div className="contributors">
        <h2>Contributors</h2>
        <div className="avatars">
          <h2>A</h2>
          <h2>S</h2>
          <h2>F</h2>
          <h2>A</h2>
        </div>
      </div>

      {openCreateFileDialog && (
          <CreateFileDialog
              onClose={closeFileDialog}
              onCreate={createFile}
          />
      )}
    </div>
  );
};

export default SideBar;
