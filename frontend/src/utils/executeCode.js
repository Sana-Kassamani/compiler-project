import axios from "axios";
import { languageOptions } from "../constants/LanguageOptions";

const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston",
})

const executeCode = async(language, sourceCode) => {
    const response = await API.post("/execute", {
        language: language,
        version: languageOptions[language],
        files: [
            {
                content: sourceCode,
            },
        ],
    });

    return response.data;
};

export default executeCode;