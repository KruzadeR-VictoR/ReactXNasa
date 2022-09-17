import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SingleImage.css";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function SingleImage() {
  const [Image, setImage] = useState();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://images-api.nasa.gov/search?media_type=image&nasa_id=${id}`)
      .then((res) => {
        // console.log(res.data.collection.items[0]);
        setImage(res.data.collection.items[0]);
      });
  }, [id]);

  console.log(Image);
  return (
    <>
      <div className="singleImage">
        <Navbar />
        <div className="content">
          <div className="image">
            <img src={Image?.links[0].href} alt={Image?.data[0].title} />
            <div className="img-courtesy">
              Photo by{" "}
              <span>
                {" "}
                {Image?.data[0].secondary_creator
                  ? Image?.data[0].secondary_creator
                  : "https://www.nasa.gov"}
              </span>
            </div>
          </div>
          <div className="caption">
            <h1 className="title">{Image?.data[0].title}</h1>
            <p className="description">${Image?.data[0].description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleImage;
