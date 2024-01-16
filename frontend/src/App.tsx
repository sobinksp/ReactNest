import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateInspection from "./components/CreateInspection";
import History from "./components/History";
import Result from "./components/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<History />} />
        <Route path="/create" element={<CreateInspection />} />
        <Route path="/inspection/:id" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
