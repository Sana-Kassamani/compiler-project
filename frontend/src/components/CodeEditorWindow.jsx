import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";

const CodeEditorWindow = () => {
    const [value, setValue] = useState("");
    const editorRef = useRef();
    const [language, setLanguage] = useState("javascript");

    // handle value
    const handleEditorChange = (value) => {
        setValue(value);
    }

    // handle focus on the editor
    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }

    const onSelect = (language) => {
        setLanguage(language);
      };

    return (
        <div>
            <LanguageSelector language={language} onSelect={onSelect}/>
            <Editor 
                height="70vh"
                width={`100%`}
                defaultLanguage="javascript"
                language={language}
                value={value}
                theme="vs-dark"
                defaultValue="// some comment"
                onMount={onMount}
                onChange={handleEditorChange}
            />
        </div>
    )
};

export default CodeEditorWindow;