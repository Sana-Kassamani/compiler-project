import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import "../styles/editor.css";
import { defineTheme } from "../libs/defineTheme";
import ThemeSelector from "./ThemesSelector";
import Output from "./Output";
import Pusher from "pusher-js";
import echo from "../config/echo";
import axios from "axios";

const CodeEditorWindow = () => {
  const [value, setValue] = useState("");
  const editorRef = useRef();
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState({ value: "active4d", label: "Active4D" });

  // handle value in the editor
  const handleEditorChange = (value) => {
    setValue(value);
    broadcastChange(value);
    console.log(value, typeof value);
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

  useEffect(() => {
    // Enable pusher logging - don't include this in production
    // Pusher.logToConsole = true;

    const pusher = new Pusher("38a7faf7510acaec457c", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("document");
    // channel.bind("code", function (data) {
    //   setValue(data);
    // });
    channel.bind("DocumentUpdated", (data) => {
      console.log("Received update from Pusher:", data.content, typeof content);
      //   setValue(data);
      console.log("Socket is", echo.socketId());
      console.log(data);
      //   if (data.content !== value) {
      //     setValue(data.content);
      //   }
      if (data.socket_id !== echo.socketId()) {
        console.log("socket id is:", data.socket_id);
        console.log("Received update from Pusher:", data.content);
        setValue(data.content);
      } else {
        console.log("Ignoring event from the current user.");
      }
    });
  }, []);
  const broadcastChange = async (updatedContent) => {
    console.log("Broadcasting change:", updatedContent);
    console.log("------------", axios.defaults);
    axios.defaults.headers.common["X-Socket-Id"] = echo.socketId();
    await axios.post("http://127.0.0.1:8000/api/document/update", {
      content: updatedContent,
      socket_id: echo.socketId(),
    });
  };

  //   useEffect(() => {
  //     // Real-time collaboration with Laravel Echo
  //     const channel = echo.channel("document");
  //     channel.listen("DocumentUpdated", (event) => {
  //       console.log("Here is a new event", event);
  //       setValue(event.content);
  //     });
  //   }, []);
  //   useEffect(() => {
  //     echo.channel("document").listen("DocumentUpdated", (event) => {
  //       console.log("Received update from Echo:", event);
  //       if (event.content !== value) {
  //         setValue(event.content);
  //       }
  //     });
  //   }, []);
  //   useEffect(() => {
  //     // Update Monaco Editor content when receiving updates
  //     if (editorRef.current) {
  //       setValue(value);
  //     }
  //   }, [value]);

  //   const broadcastChange = async (updatedContent) => {
  //     await axios.post("http://127.0.0.1:8000/api/document/update", {
  //       content: updatedContent,
  //     });
  //   };

  return (
    <div className="window">
      <div className="files"></div>
      <div className="CodeEditorWindow">
        <div className="selectors">
          <div className="language-selector">
            <LanguageSelector language={language} onSelect={onSelect} />
          </div>
          <div className="theme-selector">
            <ThemeSelector
              theme={theme}
              handleThemeChange={handleThemeChange}
            />
          </div>
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
