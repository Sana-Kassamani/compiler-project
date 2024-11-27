import React, { useState } from "react";
import executeCode from "../utils/executeCode";
import "../styles/output.css"
import { languageOptions } from "../constants/LanguageOptions";
import { requestApi } from "../utils/request";
import Bug from "../assets/bug-off.svg";

const Output = ({ editorRef, language, value }) => {
  const [output, setOutput] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const soureCode = editorRef.current.getValue();
    if (!soureCode) {
      return;
    }
    try {
      setIsLoading(true);
      setIsError(false);
      const { run: result } = await executeCode(language, soureCode);
      setOutput(result.output.split("\n"));
      setIsError(result.stderr ? true : false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDebug = async () => {
    const result = await requestApi({
      route: "/debug",
      body: {
        code: value,
      },
      method: "POST",
    });
    console.log(result.message);
  };

  return (
    <div className="output-container">
      <div className={`output-box ${isError ? "error-output" : ""}`}>
        <p>
          <b>Output</b>
        </p>
        {output
          ? output.map((line, i) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>
      <div className="output-buttons">
        <button className="debug-button" onClick={handleDebug}>
          <img src={Bug} alt="Bug Icon" />
          Debug
        </button>
        <button className="run-code-btn" disabled={isloading} onClick={runCode}>
          {isloading ? "Running..." : "Run Code"}
        </button>
      </div>
    </div>
  );
};

export default Output;
