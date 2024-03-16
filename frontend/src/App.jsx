import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="dashboard" element={<h1>Title</h1>} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
