import "./App.css";
import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";
import Home from "./components/Home/Base";
import Layout1 from "./components/Layouts/AddMemberForm";
import UploadCSV from "./components/Layouts/UploadCSV";
import Stats from "./components/Graphs/ClientGraphs/ClientStats";
import ClientTable from "./components/Layouts/ClientTable";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />}>
          {/* Nested routes will render inside box3 */}
          <Route path="layout1" element={<Layout1 />} />
          <Route path="UploadCSV" element={<UploadCSV />} />
          <Route path="clients-stats" element={<Stats />} />
          <Route path="view-clients" element={<ClientTable />} />
        </Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
