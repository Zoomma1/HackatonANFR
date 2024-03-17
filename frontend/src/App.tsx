import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";
import { Init } from "./Pages/Init/Init";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="init" element={<Init />} />
        <Route path="*" element={<Navigate to="/init" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
