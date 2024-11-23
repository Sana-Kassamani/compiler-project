import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import '../styles/editor.css';

const CodeEditorWindow = () => {
    const [value, setValue] = useState("");
    const editorRef = useRef();
    const [language, setLanguage] = useState("javascript");

    const handleEditorChange = (value) => {
        setValue(value);
    };

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    const onSelect = (language) => {
        setLanguage(language);
    };

    return (
        <div className="CodeEditorWindow">
            <div className="language-selector">
                <LanguageSelector language={language} onSelect={onSelect} />
            </div>
            <div className="editor-container">
                <div className="monaco-editor-container">
                    <Editor 
                        height="70vh"
                        width="100%"
                        defaultLanguage="javascript"
                        language={language}
                        value={value}
                        theme="vs-dark"
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
