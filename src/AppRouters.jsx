import React from 'react'
import { Route, Routes } from "react-router-dom";
import HomePage from './Pages/Landing/HomePage';

function AppRouters() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default AppRouters