import React from "react";
import "./index.css";
import AppRouters from "./AppRouters";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppRouters />
    </BrowserRouter>
  );
}

export default App;
