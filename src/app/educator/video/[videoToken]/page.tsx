"use client"

import Live from "@/components/Live";
import Logout from "@/components/Logout";
import Home from "@/components/buttons/Home";

const Video = ({ params }: {
  params: { videoToken: string }
}) => {

  function handle() {
    var vid1 = document.getElementById("video") as HTMLVideoElement;
    console.log(vid1.currentTime)
  }

  return (
    <main className='flex justify-center items-center h-screen bg-zinc-950'>
      <video id="video" className='w-[50vw]' controls autoPlay onSeeked={handle}>
        <source src={`http://localhost:4000/uploads/${params.videoToken}.webm`} />
      </video>
      <div className='absolute bottom-8 flex gap-2'>
        <Home />
        <Live />
      </div>
    </main>
  )
}

export default Video