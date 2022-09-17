import React, { createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "../Components/Hero";
import Images from "../Components/Images";
import SingleImage from "../Components/SingleImage";
import searchData from "../hooks/SearchData";
import Home from "./Home";
import Video from "./Video";

//> create a Context

export const dataContext = createContext();

function Pages() {
  const {
    Datas,
    setDatas,
    isLodaing,
    setisLodaing,
    Theme,
    setTheme,
    SearchInput,
    setSearchInput,
    fetchData,
  } = searchData();

  const values = {
    Datas,
    setDatas,
    isLodaing,
    setisLodaing,
    Theme,
    setTheme,
    SearchInput,
    setSearchInput,
    fetchData,
  };

  return (
    <>
      <dataContext.Provider value={values}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/Apod" element={<Hero />} />
            <Route path="/videos" element={<Video />} />
            <Route path="/images" element={<Images />} />
            <Route path="/images/:id" element={<SingleImage />} />
            {/* <Route path="/images/search?q=/:id" element={<Images />} /> */}
          </Routes>
        </Router>
      </dataContext.Provider>
    </>
  );
}

export default Pages;
