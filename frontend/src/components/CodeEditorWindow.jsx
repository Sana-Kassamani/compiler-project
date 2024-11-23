import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import '../styles/editor.css';
import { defineTheme } from "../libs/defineTheme";
import ThemeSelector from "./ThemesSelector";

const CodeEditorWindow = () => {
    const [value, setValue] = useState("");
    const editorRef = useRef();
    const [language, setLanguage] = useState("javascript");
    const [theme, setTheme] = useState("cobalt");

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
        } 
        else {
            defineTheme(theme.value).then((_) => setTheme(theme));
        }
    }

    useEffect(() => {
        defineTheme("oceanic-next").then((_) =>
          setTheme({ value: "oceanic-next", label: "Oceanic Next" })
        );
    }, []);

    return (
        <div className="CodeEditorWindow">
            <div className="selectors">
                <div className="language-selector">
                    <LanguageSelector language={language} onSelect={onSelect} />
                </div>
                <div className="theme-selector">
                    <ThemeSelector theme={theme} handleThemeChange={handleThemeChange}/>
                </div>
            </div>
            <div className="editor-container">
                <div className="monaco-editor-container">
                    <Editor 
                        height="70vh"
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
    );
};

export default CodeEditorWindow;
