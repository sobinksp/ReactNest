import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./components/Home";
import CreateInspection from "./components/CreateInspection";
import History from "./components/History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<History />} />
        {/* <Route exact path="/" element={}></Route> */}
        <Route path="/create" element={<CreateInspection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
