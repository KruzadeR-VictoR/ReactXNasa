import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import "./SingleImage.css";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { RingLoader } from "react-spinners";
import { dataContext } from "../Pages/Pages";
// import Particle from "../Particles/Particle";

const Particle = React.lazy(() => import("../Particles/Particle"));

function SingleImage() {
  const { isLodaing, setisLodaing } = useContext(dataContext);
  const [Image, setImage] = useState();
  const { id } = useParams();
  const descRef = useRef();


  useEffect(() => {    
    try {
      setisLodaing(true);
      axios
        .get(
          `https://images-api.nasa.gov/search?media_type=image&nasa_id=${id}`
        )
        .then((res) => {
          // console.log(res.data.collection.items[0]);
          setImage(res.data.collection.items[0]);
        });
    } catch (err) {
      console.log(err);
    } finally {
      setisLodaing(false);
    }
  }, [id]);

  const override = {
    display: "block",
    margin: "0 auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    translate: "-50% -50%",
  };

  // console.log(Image);
  if (Image) {
    // descRef.innerHtml = Image.data[0].title;
    descRef.current.innerHTML = Image.data[0].description;
  }

  return (
    <>
      <div className="singleImage">
        <Navbar />
        {isLodaing ? (
          <>
            <RingLoader
              color="teal"
              size={150}
              loading={isLodaing}
              cssOverride={override}
            />
          </>
        ) : (
          <div className="content">
            <div className="image">
              <img src={Image?.links[0].href} alt={Image?.data[0].title} />
              <div className="img-courtesy">
                Photo by &nbsp;
                <span>
                  {Image?.data[0].secondary_creator
                    ? Image?.data[0].secondary_creator
                    : "https://www.nasa.gov"}
                </span>
              </div>
            </div>
            <div className="caption">
              <h1 className="title">{Image?.data[0].title}</h1>
              {/* <p className="description">${Image?.data[0].description}</p> */}
              <p ref={descRef} className="description"></p>
              {/* will update this later  */}
              {/* <div className="Tags">
              {Image?.data[0].keywords && (
                <>
                  <h1 className="tag-heading">Tags</h1>
                  {Image?.data[0].keywords.map((tag) => (
                    <div className="tag">{tag}</div>
                  ))}
                </>
              )}
            </div> */}
            </div>
          </div>
        )}
      </div>
      <Particle/>
    </>
  );
}

export default SingleImage;
