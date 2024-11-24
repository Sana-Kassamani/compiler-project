import React, { useState } from "react";
import executeCode from "../utils/executeCode";
import { languageOptions } from "../constants/languageOptions";

const Output = ({editorRef, language}) => {
    const [output, setOutput] = useState(null);
    const[isloading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const runCode = async() => {
        const soureCode = editorRef.current.getValue();
        if (!soureCode) {
            return;
        }
        try{
            setIsLoading(true);
            setIsError(false);
            const {run : result} = await executeCode(language, soureCode);
            setOutput(result.output.split("\n"));
            setIsError(result.stderr ? true : false);
        }
        catch(error){
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="output-container">
            <p>Output</p>
            <div className={`output-box ${isError ? 'error-output' : ''}`}>
                {output
                    ? output.map((line, i) => <p key={i}>{line}</p>)
                    : 'Click "Run Code" to see the output here'
                }
            </div>
            <button
                className="run-code-btn"
                disabled={isloading}
                onClick={runCode}
            >
                {isloading ? "Running..." : "Run Code"}
            </button>
        </div>
    )
};

export default Output;