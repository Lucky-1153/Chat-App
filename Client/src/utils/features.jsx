import React from 'react'

const fileFormat = (url = "") => {
  const fileExt = url.split(".").pop()

  if(fileExt === "mp4" || fileExt === "webm")
    return "video"

  if(fileExt === "mp3" || fileExt === "wav")
    return "audio"

  if(
    fileExt === "png" ||
    fileExt === "jpg" ||
    fileExt === "jpeg" ||
    fileExt === "gif" 
  )
    return "image"

  return "file"
}

export {
    fileFormat
}