import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import '../styles/editor.css';
import { defineTheme } from "../libs/defineTheme";
import ThemeSelector from "./ThemesSelector";
import Output from "./Output";
import TerminalWindow from "./TerminalWindow";
import CreateFileDialog from "./CreateFileDialog";
import InviteDialog from "./InviteDialog";

const CodeEditorWindow = () => {
    const [value, setValue] = useState("");
    const editorRef = useRef();
    const [language, setLanguage] = useState("javascript");
    const [theme, setTheme] = useState({ value: "active4d", label: "Active4D" });
    const [openCreateFileDialog, setopenCreateFileDialog] = useState(false);

    const onSelect = (language) => {
        setLanguage(language);
      };

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

    // handle theme change
    const handleThemeChange = (th) => {
        const theme = th;
        console.log("theme...", theme);
        console.log(theme);
        if (["light", "vs-dark"].includes(theme.value)) {
            setTheme(theme);
            localStorage.setItem("editorTheme", JSON.stringify(theme));
        } 
        else {
            defineTheme(theme.value).then((_) => {
                setTheme(theme);
                localStorage.setItem("editorTheme", JSON.stringify(theme));
            })
        }
    }

    // open create file dialog
    const openFileDialog = () =>{ 
        setopenCreateFileDialog(true);
    }

    // close the create file dialog
    const closeFileDialog = () =>{ 
        setopenCreateFileDialog(false);
    }

    // create the file
    const createFile = () => {
        // (Sana)
        // handle if no input in the file name
        // create the file
        // before adding the file to the db put the extension with the file in the db using the LanguageExtensions constant

        closeFileDialog();
    }

    

    useEffect(() => {
        const savedTheme = localStorage.getItem("editorTheme");
        if (savedTheme) {
            const parsedTheme = JSON.parse(savedTheme);
            setTheme(parsedTheme);
            defineTheme(parsedTheme.value);
        } 
        else {
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
                    <div className="language-selector">
                        <LanguageSelector language={language} onSelect={onSelect} />
                    </div>
                    <div className="theme-selector">
                        <ThemeSelector theme={theme} handleThemeChange={handleThemeChange} />
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
                <Output editorRef={editorRef} language={language}/>
            </div>

            {/* the button to be changed, it is only to try to open the dialog*/}
            <button onClick={openFileDialog}>Hello</button>

            {openCreateFileDialog && (
                <CreateFileDialog
                    onClose={closeFileDialog}
                    onCreate={createFile}
                />
            )}

            

        </div>
    );
};

export default CodeEditorWindow;
