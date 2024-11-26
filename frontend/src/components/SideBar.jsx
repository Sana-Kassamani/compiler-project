import React from "react";
import "../styles/SideBar.css";

const SideBar = () => {
  return (
    <div className="side-bar">
      <div className="files">
        <h2>Files</h2>
        <div>
          <img src="" alt="" />
          <p>File Name</p>
        </div>
      </div>
      <div className="contributors">
        <h2>Contributors</h2>
        <div className="avatars">
          <h2>A</h2>
          <h2>S</h2>
          <h2>F</h2>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
