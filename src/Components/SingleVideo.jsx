import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import "./SingleVideo.css";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { RingLoader } from "react-spinners";
import { dataContext } from "../Pages/Pages";
import VideoJS from "../VideoJS/VideoJS";
// import vid from "../assets/bg-Home.webm";
const vid=React.lazy(()=>import('../assets/bg-Home.webm'))

function SingleVideo() {
  const { isLodaing, setisLodaing } = useContext(dataContext);
  const [Video, setVideo] = useState();
  const [VideoData, setVideoData] = useState();
  const { id } = useParams();
  const descRef = useRef();

  useEffect(() => {
    console.log(descRef);
    try {
      setisLodaing(true);
      axios.get(`https://images-api.nasa.gov/asset/${id}`).then((res) => {
        // console.log(res);
        setVideoData(res.data.collection.items[0]);
      });
      axios
        .get(
          `https://images-api.nasa.gov/search?media_type=video&nasa_id=${id}`
        )
        .then((res) => {
          // console.log(res.data.collection.items[0]);
          setVideo(res.data.collection.items[0]);
        });
    } catch (err) {
      console.log(err);
    } finally {
      setisLodaing(false);
    }
  }, [id]);

  console.log(Video);
  const override = {
    display: "block",
    margin: "0 auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    translate: "-50% -50%",
  };

  if (Video) {
    descRef.current.innerHTML = Video.data[0].description;
  }
  console.log(VideoData?.href);

  // VideoJS configs
  const playerRef = React.useRef(null);
  const videoJsOptions = {
    controls: true,
    // responsive: true,
    fluid: true,
    // src:VideoData?.href,
    sources: [
      {
        src: VideoData?.href,
        type: "video/mp4",
      },
      {
        src: vid,
        type: "video/mp4",
      },
    ],
    playbackRates: [0.5, 1, 1.5, 2],
  };

  return (
    <>
      <div className="singleVideo">
        {/* <video controls autoPlay>
          <source src={VideoData?.href} type="video/mp4" />
        </video> */}
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
              <VideoJS options={videoJsOptions} />
              <div className="img-courtesy">
                Video by &nbsp;
                <span>
                  {Video?.data[0].secondary_creator
                    ? Video?.data[0].secondary_creator
                    : "https://www.nasa.gov"}
                </span>
              </div>
            </div>
            <div className="caption">
              <h1 className="title">{Video?.data[0].title}</h1>
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
    </>
  );
}

export default SingleVideo;
