import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Stack } from "@mui/system";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

function App() {
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
      {/* <video>
        <source src={Apod.url} type="video.mp4" />
      </video> */}
      <div className="card">
        <div className="media">
          {Apod.media_type === "video" ? (
            <>
              <iframe src={Apod.url} frameborder="0"></iframe>
            </>
          ) : (
            <>
              <iframe src={Apod.url} frameborder="0"></iframe>
            </>
          )}
        </div>
        <div className="description">
          <h1 className="title">{Apod.title}</h1>
          <p>{Apod.explanation}</p>
        </div>
      </div>
    </>
  );
}

export default App;
