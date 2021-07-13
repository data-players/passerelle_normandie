import React from 'react';
import ReactPlayer from "react-player";

const VideoPlayer = ({ record, source }) => {
    var url = record[source]
  
    switch (detectPlayer(url)) {
      case 'peertube':
        if (!url.includes("embed")) {
            var spliturl = url.split("watch/")
            url = spliturl[0]+"embed/"+spliturl[1]
        }
        return  (
          <div align="center" >
            <iframe width="100%" height="630" sandbox="allow-same-origin allow-scripts" src={url} frameborder="0" allow="fullscreen"></iframe>
          </div>
        )
      case 'basic':
        return (
          <div align="center" >
            <ReactPlayer url={url} controls/>
          </div>
        )
      case "dailymotion":
        if (!url.includes("embed")) {
            var spliturl = url.split("video/")[1]
            url = "https://www.dailymotion.com/embed/video/" + spliturl.split('?play')[0]
        }
        return ( <ReactPlayer url={url} controls/> )
      case 'novideo':
        return null;
      default:
        return (
          <div align="center">Video Not Supported, check your URL</div>
        )
    }
  }
  
  function detectPlayer (url) {
    if (!url) {
      return "novideo"
    }
    if ( url.includes("youtube")) {
        return "basic"
    } else if (url.includes("facebook") || url.includes("fb.watch")) {
        return "basic"
    } else if (url.includes("videos/watch") || url.includes("videos/embed")){
        return "peertube"
    } else if (url.includes("dailymotion")) {
      return "dailymotion"
    }
  }

  export default VideoPlayer;
 