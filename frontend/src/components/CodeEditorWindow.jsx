import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import "../styles/editor.css";
import { defineTheme } from "../libs/defineTheme";
import ThemeSelector from "./ThemesSelector";
import Output from "./Output";
import TerminalWindow from "./TerminalWindow";
import CreateFileDialog from "./CreateFileDialog";
import InviteDialog from "./InviteDialog";
import SideBar from "../components/SideBar";
import { fileContext } from "../context/fileContext";
import { request } from "../utils/request";

const CodeEditorWindow = () => {
  const { selectedFile, list, saveFile, getFiles } = useContext(fileContext);
  const [readOnly, setReadOnly] = useState(true);
  const [defaultCode, setDefaultCode] = useState("Select a file to edit code");
  const [value, setValue] = useState("");
  const editorRef = useRef();
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState({ value: "active4d", label: "Active4D" });
  const navigate = useNavigate();

  // handle value in the editor
  const handleEditorChange = (value) => {
    setValue(value);
  };

  // set focus on tthe compiler
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  // select language
  const onSelect = (language) => {
    setLanguage(language);
  };

  // handle theme change
  const handleThemeChange = (th) => {
    const theme = th;
    console.log("theme...", theme);
    console.log(theme);
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
    console.log(result);
    console.log(result.data.message);
  };

  const handleLogout = async () => {
    try {
      const response = await request({
        route: "logout",
        method: 'POST'
      });
      console.log(response);
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.log(response.data.message);
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
    console.log("id", list[selectedFile].id);
    console.log("file", file);
    form.append("id", list[selectedFile].id);
    form.append("file", file);
    saveFile(form);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("editorTheme");
    if (savedTheme) {
      const parsedTheme = JSON.parse(savedTheme);
      setTheme(parsedTheme);
      defineTheme(parsedTheme.value);
    } else {
      defineTheme("acive4d").then((_) =>
        setTheme({ value: "Acive4D", label: "Acive4D" })
      );
    }
  }, []);
  useEffect(() => {
    const currentFile = list[selectedFile];
    console.log(currentFile, typeof currentFile);
    if (currentFile) {
      currentFile.content
        ? setValue(currentFile.content)
        : setValue("// some comment");
      if (
        !currentFile.shared ||
        (currentFile.shared && currentFile.type === "editor")
      ) {
        setReadOnly(false);
      }
    }
  }, [selectedFile]);
  useEffect(() => {
    getFiles();
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
          {selectedFile !== null && <button onClick={handleSave}>Save</button>}
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
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>
  );
};

export default CodeEditorWindow;
