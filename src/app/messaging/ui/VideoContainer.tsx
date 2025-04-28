

"use client"
import React, { useEffect, useRef } from 'react'

interface iVideoContainer {
    stream: MediaStream,
    isLocalStream: boolean,
    isOnCall: boolean
}

function VideoContainer({ stream, isLocalStream, isOnCall }: iVideoContainer) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream])

  return (
    <video 
      ref={videoRef} 
      className={`rounded-lg ${
        isLocalStream && isOnCall 
          ? "absolute w-[200px] h-auto right-4 bottom-4 shadow-lg z-10" 
          : "w-full h-full"
      }`} 
      autoPlay 
      muted={isLocalStream} 
      playsInline
    ></video>
  )
}

export default VideoContainer