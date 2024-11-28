import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import "../styles/editor.css";
import { defineTheme } from "../libs/defineTheme";
import ThemeSelector from "./ThemesSelector";
import Output from "./Output";
import SideBar from "../components/SideBar";
import { fileContext } from "../context/fileContext";
import { request } from "../utils/request";
import socket from "../config/socket";

const CodeEditorWindow = () => {
  const { selectedFile, list, saveFile, getFiles, getContributors } =
    useContext(fileContext);

  const [readOnly, setReadOnly] = useState(true);
  const [defaultCode, setDefaultCode] = useState("Select a file to edit code");
  const [value, setValue] = useState("");
  const [analyzeResult, setAnalyzeResult] = useState([]);
  const editorRef = useRef();
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState({ value: "active4d", label: "Active4D" });
  const navigate = useNavigate();
  
  useEffect(() => { 
    const currentFile = list[selectedFile]; 
    if (currentFile) { 
      socket.emit('file.select', currentFile.id); 
    } 
  }, [selectedFile]); 
  
  useEffect(() => { 
    if (selectedFile !== null) { 
      socket.on('file.content', (data) => { 
        if (data.fileId === list[selectedFile]?.id) { 
          setValue(data.content); 
        } 
      }); 

      socket.on('code.update', (data) => { 
        if (data.fileId === list[selectedFile]?.id) { 
          setValue(data.code); 
        } 
      }); 

      socket.on('connect_error', (err) => { 
        console.log('Socket.IO error:', err); 
      }); 
    } 
    return () => { 
      socket.off('file.content'); 
      socket.off('code.update'); 
    }; 
  }, [selectedFile]); 
    
  const handleEditorChange = (value) => { 
    setValue(value); 
    socket.emit('code.update', { code: value, fileId: list[selectedFile].id }); 
  };
  
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleThemeChange = (th) => {
    const theme = th;
    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
      localStorage.setItem("editorTheme", JSON.stringify(theme));
    } else {
      defineTheme(theme.value).then((_) => {
        setTheme(theme);
        localStorage.setItem("editorTheme", JSON.stringify(theme));
      });
    }
  };

  const handleAnalyze = async () => {
    const result = await request({
      route: "/analyze",
      body: {
        code: value,
      },
      method: "POST",
    });
    setAnalyzeResult([result.data.message]);
  };

  const handleLogout = async () => {
    try {
      const response = await request({
        route: "logout",
      });
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleSave = async () => {
    const blob = new Blob([value], { type: "text/plain" });
    const file = new File([blob], list[selectedFile].filename, {
      type: "text/plain",
    });
    const form = new FormData();
    form.append("id", list[selectedFile].id);
    form.append("file", file);
    saveFile(form);
  };

  useEffect(() => {
    const currentFile = list[selectedFile];
    if (currentFile) {
      currentFile.content
        ? setValue(currentFile.content)
        : setValue("// some comment");
      setLanguage(currentFile.language);
      if (
        !currentFile.shared ||
        (currentFile.shared && currentFile.type === "editor")
      ) {
        setReadOnly(false);
      }
      getContributors(currentFile.id);
    }
  }, [selectedFile]);
  
  useEffect(() => {
    getFiles();
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("editorTheme");
    if (savedTheme) {
      const parsedTheme = JSON.parse(savedTheme);
      setTheme(parsedTheme);
      defineTheme(parsedTheme.value);
    } else {
      defineTheme("active4d").then((_) =>
        setTheme({ value: "active4d", label: "Active4D" })
      );
    }
  }, []);

  return (
    <div className="window">
      <SideBar />
      <div className="CodeEditorWindow">
        <div className="selectors">
          <div className="theme-selector">
            <ThemeSelector
              theme={theme}
              handleThemeChange={handleThemeChange}
            />
          </div>
          {selectedFile !== null && (
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          )}
          <button className="ai-button selector" onClick={handleAnalyze}>
            Analyze Code
          </button>
        </div>
        <div className="editor-container">
          <div className="monaco-editor-container">
            <Editor
              height="80vh"
              defaultLanguage="javascript"
              language={language}
              value={value}
              theme={theme.value}
              defaultValue={defaultCode}
              onMount={onMount}
              onChange={handleEditorChange}
              options={{ readOnly: readOnly }}
            />
          </div>
        </div>
      </div>

      <div className="output-container">
        <div className="logout">
          <button onClick={handleLogout}>Log Out</button>
        </div>
        <Output
          editorRef={editorRef}
          language={language}
          value={value}
          analyzeResult={analyzeResult}
        />
      </div>
    </div>
  );
};

export default CodeEditorWindow;
