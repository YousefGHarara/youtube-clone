import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Video from "./pages/video/video";
import Navbar from "./components/navbar/navbar";

const App = () => {

  const [sidebar, setSidebar] = useState(true);

  return (
    <>
      <Navbar setSidebar={setSidebar}/> 
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar}/>} />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
        <Route path="/*" element={<h1>Oopse !! 🥹🥹</h1>} />
      </Routes>
    </>
  );
};

export default App;

// npm error code EINVALIDPACKAGENAME
// npm error Invalid package name "react- " of package "react- @^18.3.1": name cannot contain leading or trailing spaces; name can only contain URL-friendly characters.
// npm error A complete log of this run can be found in: C:\Users\msi2021\AppData\Local\npm-cache\_logs\2024-10-24T15_42_27_408Z-debug-0.log
