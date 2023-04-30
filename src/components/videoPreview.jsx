import React, { useEffect, useRef } from 'react';

export default function VideoPreview({ file }) {

  const playerRef = useRef();

  useEffect(()=> {
    const sourceURL = URL.createObjectURL(file);
    playerRef.current.src = sourceURL;
  }, [file, playerRef]);

  return (
    <>
      <video width={300} controls ref={playerRef} type="video/mp4" />
    </>
  );
}
