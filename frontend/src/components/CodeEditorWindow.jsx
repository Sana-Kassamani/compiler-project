import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditorWindow = () => {
    const [value, setValue] = useState("");
    const editorRef = useRef();

    // handle value
    const handleEditorChange = (value) => {
        setValue(value);
    }

    // handle focus on the editor
    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }

    return (
        <div>
            <Editor 
                height="85vh"
                width={`100%`}
                defaultLanguage="javascript"
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