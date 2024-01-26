import React from "react";
import { Route, BrowserRouter, Routes,} from "react-router-dom";
import App from "./App";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
