import "./App.css";
import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";
import Home from "./components/Home/Base";
import Layout1 from "./components/Layouts/Layout1";
import UploadCSV from "./components/Layouts/UploadCSV";
import Stats from "./components/Graphs/ClientGraphs/ClientStats";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          {/* Nested routes will render inside box3 */}
          <Route path="layout1" element={<Layout1 />} />
          <Route path="UploadCSV" element={<UploadCSV />} />
          <Route path="/clients-stats" element={<Stats />} />
        </Route>
        <Route path="layout1" element={<Layout1 />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
