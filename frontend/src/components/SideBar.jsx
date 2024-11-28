import React, { useState, useContext } from "react";
import FileComp from "../components/File";
import Plus from "../assets/plus.svg";
import Python from "../assets/Python.png";
import fileImg from "../assets/file.png";
import "../styles/SideBar.css";
import { fileContext } from "../context/fileContext";
import CreateFileDialog from "./CreateFileDialog";
import { LanguageExtensions } from "../constants/LanguageExtensions";

const SideBar = () => {
  const { list, createFile, contributors } = useContext(fileContext);

  console.log("Type of list is", typeof list);
  console.log(list);
  const createEmptyFile = (fileName, language) => {
    const blob = new Blob([""], { type: "text/plain" });
    const file = new File([blob], fileName, { type: "text/plain" });
    return file;
  };
  const [openCreateFileDialog, setopenCreateFileDialog] = useState(false);

  // open create file dialog
  const openFileDialog = () => {
    setopenCreateFileDialog(true);
  };

  // close the create file dialog
  const closeFileDialog = () => {
    setopenCreateFileDialog(false);
  };

  // create the file
  const createNewFile = (fileName, language) => {
    const ext = LanguageExtensions[language];
    const filenameInDb = `${fileName}${ext}`;
    const form = new FormData();
    form.append("filename", filenameInDb);
    form.append("language", language);
    form.append("file", createEmptyFile(filenameInDb, language));
    createFile(form);
    closeFileDialog();
  };

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
          {list.map((f, index) => (
            <FileComp key={index} index={index} file={f} type={fileImg} />
          ))}
        </div>
      </div>
      <div className="contributors">
        <h2>Contributors</h2>
        <div className="avatars">
          {/* {console.log(contributors)} */}
          {/* {contributors.owner.length > 0 &&
            contributors.owner?.map((c, index) => (
              <h4 key={index}>{c.username} Owner</h4>
            ))} */}
          {contributors?.map((c, index) => (
            <h4 key={index}>
              {c.username} {c.collaborator_type}
            </h4>
          ))}
        </div>
      </div>

      {openCreateFileDialog && (
        <CreateFileDialog onClose={closeFileDialog} onCreate={createNewFile} />
      )}
    </div>
  );
};

export default SideBar;
