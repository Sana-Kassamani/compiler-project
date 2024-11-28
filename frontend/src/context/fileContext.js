import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { request } from "../utils/request";
import { requestMethods } from "../utils/enums/requestMethods";

export const fileContext = createContext();

const FilesProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  //   const [filtered, setFiltered] = useState([]);

  //   const handdleFilters = (filters) => {
  //     // Logic
  //     setFiltered();
  //   };

  const getFiles = async () => {
    try {
      const response = await request({
        route: "/file",
      });
      console.log(response);
      if (response.status === 200) {
        setFiles(response.data.user_files);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const createFile = async (form) => {
    try {
      const response = await request({
        route: "/file",
        method: requestMethods.POST,
        body: form,
        header: "multipart/form-data",
      });
      console.log(response);
      if (response.status === 200) {
        setFiles((prev) => {
          return [...prev, response.data.file];
        });
      } else {
        console.log(response?.data?.message);
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  //   const getFileContent = (id) => {
  //     {

  //     }

  const saveFile = async (form) => {
    try {
      const response = await request({
        route: "/file/save",
        method: requestMethods.POST,
        body: form,
        header: "multipart/form-data",
      });
      console.log(response);
      if (response.status === 200) {
        const newFile = response.data.user_file;
        setFiles((prev) => {
          console.log(response.data);
          console.log("Prev list is", prev);
          const updatedFiles = prev.map((file) =>
            file.id === newFile.id
              ? { ...file, path: newFile.path, content: newFile.content }
              : file
          );

          return updatedFiles;
        });
      } else {
        console.log(response?.data?.message);
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  //   const deleteFile = (id) => {
  //     axios.delete("http://127.0.0.1:8000/api/courses").then(({ data }) => {
  //       setCourses(data.courses);
  //     });
  //   };

  return (
    <fileContext.Provider
      value={{
        selectedFile: selectedFile,
        list: files,
        getFiles,
        setSelectedFile,
        createFile,
        saveFile,
        // editCourse,
        // deleteCourse,
      }}
    >
      {children}
    </fileContext.Provider>
  );
};

export default FilesProvider;
