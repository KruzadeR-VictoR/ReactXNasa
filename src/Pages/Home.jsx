import React, { useContext, useState } from "react";
import "../Styles/Home.css";
import Navbar from "../Components/Navbar";
import bgHome from "../assets/bg-Home.mp4";
import axios from "axios";
import { dataContext } from "./Pages";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { Datas, setDatas, SearchInput, setSearchInput, fetchData } =
    useContext(dataContext);
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
