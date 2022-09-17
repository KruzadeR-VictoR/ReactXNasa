import React, { useContext, useEffect, useState } from "react";
import "./Hero.css";
import axios from "axios";
import Navbar from "./Navbar";
import bgHero from "../assets/bg-hero.jpg";
import { dataContext } from "../Pages/Pages";

function Hero() {
  const { Datas, setDatas, fetchData } = useContext(dataContext);

  const [Apod, setApod] = useState({});

  const key = import.meta.env.VITE_API_KEY;
  console.log(key);

  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/planetary/apod?api_key=${key}`)
      .then((result) => {
        // console.log(result.data);
        setApod(result.data);
      });
  }, []);
 
  console.log(Apod);

  return (
    <>
      <Navbar />
      <div className="hero-wrapper" style={{ background: `url(${bgHero})` }}>
        <div className="hero">
          {/* <h3 className="heading">Astronomy Picture of the Day</h3> */}
          <div className="card">
            <h2 className="heading">Astronomy Picture of the Day</h2>
            <div className="media">
              {Apod.media_type === "video" ? (
                <>
                  <iframe src={Apod.url} frameborder="0"></iframe>
                </>
              ) : (
                <>
                  {/* <iframe src={Apod.url} frameborder="0"></iframe> */}
                  <img src={Apod.url} alt="" />
                </>
              )}
            </div>
            <div className="description">
              <h1 className="title">{Apod.title}</h1>
              <p className="explanation">{Apod.explanation}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
