import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import emailjs from "@emailjs/browser";
import "../styles/editor.css";
import { defineTheme } from "../libs/defineTheme";
import ThemeSelector from "./ThemesSelector";
import Output from "./Output";

const CodeEditorWindow = () => {
  const [value, setValue] = useState("");
  const editorRef = useRef();
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState({ value: "active4d", label: "Active4D" });

  // handle value in the editor
  const handleEditorChange = (value) => {
    setValue(value);
    console.log(value);
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

  const handleEmail = (from, to, email) => {
    emailjs.send("service_sl9j08x", "template_xh85vsl", {
      from_name: from,
      to_name: to,
      to_email: email,
    });
  };

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
      <div className="files"></div>
      <div className="CodeEditorWindow">
        <div className="selectors">
          {/* <div className="language-selector">
                        <LanguageSelector language={language} onSelect={onSelect} />
                    </div> */}
          <div className="theme-selector">
            <ThemeSelector
              theme={theme}
              handleThemeChange={handleThemeChange}
            />
          </div>
          <button className='ai-button selector' onClick={console.log('Hello')}>Analyze Code</button>
        </div>
        <div className="editor-container">
          <div className="monaco-editor-container">
            <Editor
              height="80vh"
              defaultLanguage="javascript"
              language={language}
              value={value}
              theme={theme.value}
              defaultValue="// some comment"
              onMount={onMount}
              onChange={handleEditorChange}
            />
          </div>
        </div>
      </div>
      <div className="output-container">
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>
  );
};

export default CodeEditorWindow;
