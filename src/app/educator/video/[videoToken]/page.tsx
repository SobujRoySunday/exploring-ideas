"use client"

import { useEffect } from "react"

const Video = ({ params }: {
  params: { videoToken: string }
}) => {

  function handle() {
    var vid1 = document.getElementById("video") as HTMLVideoElement;
    console.log(vid1.currentTime)
  }

  return (
    <main className='flex justify-center items-center p-14'>
      <video id="video" className='w-[50vw]' controls autoPlay onSeeked={handle}>
        <source src={`https://35.200.215.197:3000/uploads/${params.videoToken}.webm`} />
      </video>
    </main>
  )
}

export default Video