import React, {useContext, useEffect, useLayoutEffect, useState } from "react";
import "../Styles/Home.css";
import Navbar from "../Components/Navbar";
import bgHome from "../assets/bg-Home.webm";
// const bgHome=React.lazy(()=>import('../assets/bg-Home.webm'))
import { dataContext } from "./Pages";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import gsap from "gsap";

function Home() {
  const navigate = useNavigate();
  const { setSearchInput, fetchData } = useContext(dataContext);
  const [Search, setSearch] = useState();

  const handleSearch = () => {
    if (Search.match(/[a-zA-z]/g)) {
      fetchData(`/search?q=${Search}&media_type=image`);
      setSearchInput(Search);
      navigate(`/images`);
    } else {
      alert("fill the correct input");
    }
  };

  const handlesearchTrigger = (e) => {
    console.log(e);
    if (e.key == "Enter") {
      handleSearch();
    }
  };

  const navRef = useRef(null);
  useLayoutEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1 } });    
      tl.from(".Home", {
        scale: 0,
        opacity: 0,
        ease: "power4",
      });

      tl.from(".animHome", {
        y: 200,
        opacity: 0,
        stagger: 0.5,
      });    
  }, []);

  return (
    <>
      <div className="Home">
        <Navbar />
        <div className="Hero">
          {/* set video as background */}          
          <video className="bg-Home" autoPlay loop>
            <source src={bgHome} type="video/mp4" />
          </video>          
          {/* page Content  */}
          <div className="content">
            <h1 className="heading animHome">
              Get the <span> universe</span> in your hand <span>.</span>
            </h1>
            <div className="search-box animHome">
              <label htmlFor="search"></label>
              <input
                className="search-input"
                type="search"
                name="search"
                id="search"
                placeholder="Seach any image..."
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

export default Home;
