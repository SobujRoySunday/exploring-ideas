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
        <source src={`${process.env.BACKEND_DOMAIN}/uploads/${params.videoToken}.webm`} />
      </video>
    </main>
  )
}

export default Video