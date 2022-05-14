import React from "react";
import { Home } from "./pages/Home";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Protected } from "./pages/Protected";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Pagenotfound } from "./pages/Pagenotfound";
import { Tweeting } from "./pages/Tweeting";
import { Socket } from "./pages/Socket";
import { Dashboard } from "./pages/Dashboard";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Pagenotfound />}></Route>
          <Route path="/" element={<Home />} />

          <Route path="/socket" element={<Socket />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/tweeting"
            element={<Protected Component={Tweeting} />}
          />

          <Route path="/profile" element={<Protected Component={Profile} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
