import React, { createContext, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RingLoader } from "react-spinners";
// import Videos from "../Components/Videos";
// import SingleVideo from "../Components/SingleVideo";
// import Hero from "../Components/Hero";
// import Images from "../Components/Images";
// import SingleImage from "../Components/SingleImage";
import searchData from "../hooks/SearchData";
// import Home from "./Home";
const Home=React.lazy(()=> import('./Home'))
const Hero=React.lazy(()=> import('../Components/Hero'))
const Video=React.lazy(()=> import('./Video'))
const Images=React.lazy(()=> import('../Components/Images'))
const SingleImage=React.lazy(()=> import('../Components/SingleImage'))
const Videos=React.lazy(()=> import('../Components/Videos'))
const SingleVideo=React.lazy(()=> import('../Components/SingleVideo'))
// import Video from "./Video";

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

  //> Pre-Loader CSS 
  const override = {
    display: "block",
    margin: "0 auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    translate: "-50% -50%",
  };

  return (
    <>
    {isLodaing ? 
    <RingLoader color="teal" size={150} loading={isLodaing} cssOverride={override} />
    :
      <dataContext.Provider value={values}>
        <Router>
          <Routes>
            <Route path="/" element={
              <Suspense fallback={null}>
            <Home />
            </Suspense>
            } exact />
            <Route path="/Apod" element={
              <Suspense fallback={null}>
            <Hero />
            </Suspense>
            } />
            <Route path="/video" element={
              <Suspense fallback={null}>
            <Video />
            </Suspense>
            } />
            <Route path="/images" element={
              <Suspense fallback={null}>
            <Images />
            </Suspense>
            } />
            <Route path="/images/:id" element={
              <Suspense fallback={null}>
            <SingleImage />
            </Suspense>
            } />  
            <Route path="/videos" element={
              <Suspense fallback={null}>
            <Videos />
            </Suspense>
            } />          
            <Route path="/videos/:id" element={
              <Suspense fallback={null}>
            <SingleVideo />
            </Suspense>
            } />            
          </Routes>
        </Router>
      </dataContext.Provider>
}
    </>
  );
}

export default Pages;
