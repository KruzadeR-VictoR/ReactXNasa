import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
// import '@silvermine/videojs-quality-selector';
// import '@silvermine/videojs-quality-selector/dist/css/quality-selector.css'
import './VideoJS.css'
// city 
import '@videojs/themes/dist/city/index.css';
// Fantasy
import '@videojs/themes/dist/fantasy/index.css';

// Forest
import '@videojs/themes/dist/forest/index.css';

// Sea
import '@videojs/themes/dist/sea/index.css';

function VideoJS({ options,video}) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  // const {options, onReady} = props;

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const player = playerRef.current;
      if (!player) {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        playerRef.current = videojs(videoElement, options);
      }

      return () => {
        if (player) {
          player.dispose();
          playerRef.current = null;
        }
      };
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  // useEffect(()=>{
  //     const player = playerRef.current;

  //     return () => {
  //       if (player) {
  //         player.dispose();
  //         playerRef.current = null;
  //       }
  //     };
  // },[playerRef])

  return (
    <>
      <div data-vjs-player>
        <video ref={videoRef} data-src={video} className="video-js vjs-big-play-centered " />
      </div>
    </>
  );
}

export default VideoJS;
