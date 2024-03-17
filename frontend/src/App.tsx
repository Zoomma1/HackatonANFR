import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";
import { Init } from "./Pages/Init/Init";
import { Validation } from "./Pages/Validation/Validation";
import { CheckValidity } from "./Pages/CheckValidity/CheckValidity";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="init" element={<Init />} />
        <Route path="validation" element={<Validation />} />
        <Route path="CheckValidity" element={<CheckValidity />} />
        <Route path="*" element={<Navigate to="/init" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
