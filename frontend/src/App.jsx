import { BrowserRouter, Routes, Route } from "react-router-dom";
import CodeEditorWindow from "./components/CodeEditorWindow";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import "./styles/App.css";
import FilesProvider from "./context/fileContext";
import Accepted from "./components/pages/Accepted";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <FilesProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Home" element={<CodeEditorWindow />} />
            <Route path="/Accepted" element={<Accepted />} />
          </Routes>
        </FilesProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
