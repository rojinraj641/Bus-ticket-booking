import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import UserSignup from "./pages/UserSignup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<UserSignup/>} />
      </Routes>
    </Router>
  )
}

export default App
