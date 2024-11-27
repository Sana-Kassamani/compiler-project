import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { request } from "../utils/request";

export const fileContext = createContext();

const FilesProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
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

  //   const createFile = (form) => {
  //     axios
  //       .post("http://127.0.0.1:8000/api/courses", form, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       .then(({ data }) => {
  //         const newCourse = data.new_course;

  //         setCourses([...courses, newCourse]);
  //       });
  //   };

  //   const saveFile = (id) => {
  //     axios.put("http://127.0.0.1:8000/api/courses").then(({ data }) => {
  //       setCourses(data.courses);
  //     });
  //   };

  //   const deleteFile = (id) => {
  //     axios.delete("http://127.0.0.1:8000/api/courses").then(({ data }) => {
  //       setCourses(data.courses);
  //     });
  //   };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <fileContext.Provider
      value={{
        list: files,
        // filtered: filtered,
        // getCourses,
        // createCourse,
        // editCourse,
        // deleteCourse,
      }}
    >
      {children}
    </fileContext.Provider>
  );
};

export default CoursesProvider;
