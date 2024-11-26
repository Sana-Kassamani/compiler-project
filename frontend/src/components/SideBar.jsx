import React from "react";
import File from "../components/File";
import Plus from "../assets/plus.svg";
import Python from "../assets/Python.png";
import "../styles/SideBar.css";

const SideBar = () => {
  return (
    <div className="side-bar">
      <div className="files">
        <div className="files-title">
          <h2>Files</h2>
          <button>
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
    </div>
  );
};

export default SideBar;
