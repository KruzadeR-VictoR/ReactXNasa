import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "../Components/Hero";
import Home from "./Home";
import Video from "./Video";

function Pages() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/Apod" element={<Hero />} />
          <Route path="/videos" element={<Video />} />
        </Routes>
      </Router>
    </>
  );
}

export default Pages;
