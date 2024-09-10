import React from 'react'
import { MdOutlineFileOpen } from "react-icons/md";
import VideoThumbnail from 'react-video-thumbnail'
const AttatchmentRender = (file, url) => {
  switch(file) {
    case "video" :
      return  <video 
            src={url}
            preload='none'
            width={"200px"}
            controls
        />


    case "image" :
       return <img
            src={url}
            alt='attatchment'
            width={"200px"}
            height={"150px"}
            style={{
                objectFit: "contain",
            }}
        />
  

    case "audio" :
    return    <video
            src={url}
            preload='none'
            controls
        />


    default: 
      return  <MdOutlineFileOpen />

  }
}

export default AttatchmentRender