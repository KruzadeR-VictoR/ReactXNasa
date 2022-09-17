import React, { useContext, CSSProperties } from "react";
import "./Images.css";
import { dataContext } from "../Pages/Pages";
import Navbar from "./Navbar";
import RingLoader from "react-spinners/RingLoader";
import { useNavigate } from "react-router-dom";
function Images() {
  const { Datas, isLodaing, setisLodaing, SearchInput } =
    useContext(dataContext);

  const navigate = useNavigate();

  console.log(Datas);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const handleImage = (nasaID) => {
    console.log(nasaID);
    navigate(`/images/${nasaID}`);
  };

  return (
    <>
      <div className="Images">
        <Navbar />
        <h1 className="image-heading">
          Search results for <span>{SearchInput}</span>
        </h1>
        {isLodaing ? (
          <RingLoader
            color="teal"
            loading={isLodaing}
            size={150}
            cssOverride={override}
          />
        ) : (
          <div className="grid">
            {Datas?.map((image, index) => (
              // <>
              <div
                key={index}
                className="image-card"
                onClick={() => handleImage(image.data[0].nasa_id)}
              >
                <div className="image">
                  <img src={image.links[0].href} alt="" />
                </div>
                <div className="caption">
                  <h1 className="title">{image.data[0]?.title}</h1>
                  {/* <p className="description">{image.data[0]?.description}</p> */}
                </div>
              </div>
              // </>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Images;
