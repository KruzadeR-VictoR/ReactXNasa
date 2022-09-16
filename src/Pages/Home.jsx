import React from "react";
import "../Styles/Home.css";
import Navbar from "../Components/Navbar";
import bgHome from "../assets/bg-Home.mp4";

function Home() {
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
            <h1 className="heading">
              Get the <span> universe</span> in your hand <span>.</span>
            </h1>
            <div className="search-box">
              <label htmlFor="search"></label>
              <input
                className="search-input"
                type="search"
                name="search"
                id="search"
                placeholder="Seach any image..."
              />
              <button type="button" className="search-Btn">
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
