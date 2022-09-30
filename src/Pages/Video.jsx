import React, { useContext, useEffect, useState } from "react";
import '../Styles/Video.css'
import Navbar from "../Components/Navbar";
import bgHome from "../assets/bg-Home.webm";
import { useNavigate } from 'react-router-dom';
import { dataContext } from './Pages';
import gsap from "gsap";

function Video() {
  const navigate = useNavigate();
  const { Datas, setDatas, SearchInput, setSearchInput, fetchData } =
    useContext(dataContext);
  const [Search, setSearch] = useState();  

  const handleSearch = () => {
    if (Search.match(/[a-zA-z]/g)) {
      fetchData(`/search?q=${Search}&media_type=video`);
      setSearchInput(Search);
      navigate(`/Videos`);
    } else {
      alert("fill the correct input");
    }
  };

  const handlesearchTrigger = (e) => {
    console.log(e);
    if (e.key == "Enter"){
      handleSearch();
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1 } });
    return () => {
      tl.from(".Video", {
        scale: 0,
        opacity: 0,
        ease: "power4",
      });

      tl.from(".animVideo", {
        y: 200,
        opacity: 0,
        stagger: 0.5,
      });
    };
  }, []);

  return (
    <>
    <div className="Video">
      <Navbar />
      <div className="Hero">
          {/* set video as background */}
          {/* <video className="bg-Home" autoPlay loop>
            <source src={bgHome} type="video/mp4" />
          </video> */}
          {/* page Content  */}
          <div className="content">
            <h1 className="heading animVideo">
              Search videos across <span>galaxies .</span>
            </h1>
            <div className="search-box animVideo">
              <label htmlFor="search"></label>
              <input
                className="search-input"
                type="search"
                name="search"
                id="search"
                placeholder="Seach any video..."
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => handlesearchTrigger(e)}
              />
              <button
                type="button"
                className="search-Btn"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Video;