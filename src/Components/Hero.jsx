import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import "./Hero.css";
import axios from "axios";
import Navbar from "./Navbar";
import { dataContext } from "../Pages/Pages";
// import Particle from "../Particles/Particle";
// import screenfull from 'screenfull'
const Particle = React.lazy(() => import("../Particles/Particle"));
const screenfull = React.lazy(() => import("screenfull"));
import gsap from "gsap";

function Hero() {
  const [Apod, setApod] = useState();

  const key = import.meta.env.VITE_API_KEY ?import.meta.env.VITE_API_KEY : `${API_KEY}` ;

  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/planetary/apod?api_key=${key}`)
      .then((result) => {
        setApod(result.data);
      });
  }, []);

  useLayoutEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1 } });    
      tl.from(".Apod", {
        scale: 0,
        opacity: 0,
        ease: "power4",
      });

      tl.from(".animHero", {
        y: 200,
        opacity: 0,
        stagger: 0.5,
      });    
  }, []);

  const handleImageFullscreen = (e) => {
    if (screenfull.isEnabled) {
      screenfull.toggle(e.target);
    }
  };

  // console.log(Apod);

  return (
    <>
      <div className="Apod">
        <Navbar />
        <div className="hero-wrapper">
          <div className="hero">
            <h1 className="heading">Astronomy Picture of the Day</h1>
            <div className="card">
              {/* <h2 className="heading">Astronomy Picture of the Day</h2> */}
              <div className="media animHero">
                {Apod?.media_type === "video" ? (
                  <>
                    <iframe src={Apod?.url} frameborder="0"></iframe>
                  </>
                ) : (
                  <>
                    {/* <iframe src={Apod.url} frameborder="0"></iframe> */}
                    <img
                      src={Apod?.url}
                      alt=""
                      onClick={(e) => handleImageFullscreen(e)}
                    />
                  </>
                )}
              </div>
              <div className="description">
                <h1 className="title animHero">{Apod?.title}</h1>
                <p className="explanation animHero">{Apod?.explanation}</p>
              </div>
            </div>
          </div>
        </div>
        <Particle />
      </div>
    </>
  );
}

export default Hero;
