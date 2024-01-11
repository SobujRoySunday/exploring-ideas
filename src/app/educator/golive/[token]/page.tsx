"use client"

import { setScreenStreamObject, setWebcamStreamObject } from "@/helpers/setStreamObject"
import { mediaMerge } from "@/helpers/videoStreamMerger"
import axios from "axios"
import { useState, useRef, useEffect } from "react"
import Interactivity from "./Interactivity"
import { useRouter } from "next/navigation"

const Live = ({ params }: {
  params: { token: string }
}) => {
  const config = {
    baseURL: process.env.BACKEND_DOMAIN,
    headers: { 'content-type': 'multipart/form-data' },
    onUploadProgress: (event: any) => {
      console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
    },
  };

  const router = useRouter()

  const [webcam, setWebcam] = useState(true)
  const [screen, setScreen] = useState(true)
  const [audio, setAudio] = useState(true)
  const [live, setLive] = useState(false)

  const webcamStream = useRef<MediaStream>()
  const screenStream = useRef<MediaStream>()
  const combinedStream = useRef<MediaStream>()

  const recordedChunks = useRef<BlobPart[]>([]);
  const mediaRecorder = useRef<MediaRecorder>();

  const startRecording = async () => {
    try {
      setLive(true)
      console.log('Recording started...')

      if (webcam && screen) {
        const mergedStream = mediaMerge(screenStream.current, webcamStream.current)
        combinedStream.current = mergedStream as MediaStream
      } else if (webcam) {
        combinedStream.current = webcamStream.current
      } else if (screen) {
        combinedStream.current = screenStream.current
      }

      const stream = combinedStream.current as MediaStream
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = async () => {
        const blob = new Blob(recordedChunks.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);

        const blobRes = await fetch(url)
          .then(r => r.blob())
          .then(blobFile => new File([blobFile], `${params.token}.webm`, { type: "video/webm" }))

        try {
          const data = new FormData()
          data.append("file", blobRes)
          const response = await axios.post('http://34.100.193.66:3000/uploadfile', data, config);
        } catch (error: any) {
          console.log(error)
        }

        recordedChunks.current = [];

        router.push('/educator');
      };

      mediaRecorder.current.start();
    } catch (error) {
      alert("Some error occurred");
      console.error(error);
    }
  };

  const stopRecording = () => {
    setLive(false)
    console.log('Recording stopped')
    if (mediaRecorder.current && combinedStream.current) {
      mediaRecorder.current.stop();
      combinedStream.current.getTracks().forEach((track) => track.stop());
    }
  };

  const previewWebcam = async () => {
    try {
      webcamStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      setWebcamStreamObject(webcamStream.current)
    } catch (error) {
      alert('Error accessing webcam')
      console.log(error)
    }
  }

  const previewScreen = async () => {
    try {
      screenStream.current = await navigator.mediaDevices.getDisplayMedia({ video: { displaySurface: 'window' }, audio: false })
      setScreenStreamObject(screenStream.current)
    } catch (error) {
      alert('Error accessing screen')
      console.log(error)
    }
  }

  const stopWebcam = async () => {
    webcamStream.current = await navigator.mediaDevices.getUserMedia({ video: false, audio: false })
    setWebcamStreamObject(null)
  }

  const stopScreen = async () => {
    setScreenStreamObject(null)
  }

  useEffect(() => {
    if (webcam) {
      previewWebcam()
    } else {
      stopWebcam()
    }
  }, [webcam])

  useEffect(() => {
    if (screen) {
      previewScreen()
    } else {
      stopScreen()
    }
  }, [screen])

  return (
    <>
      <div className="flex flex-col w-full justify-center items-center py-2">
        <div className="flex flex-row gap-10 justify-center items-center">
          {webcam &&
            <div>
              <video className="w-[20vw] rounded-2xl bordered border-primary border-2" id="webcam" autoPlay muted />
            </div>
          }
          {screen &&
            <video className="w-[60vw] bordered border-primary border-2" id="screen" autoPlay muted />
          }
        </div>
        <div className="flex flex-row gap-20 justify-center items-center mt-5">
          {
            !live &&
            <div className="flex flex-row gap-5">
              {webcam && <button className="btn btn-secondary rounded-full" onClick={() => { setWebcam(!webcam) }}>W</button>}
              {!webcam && <button className="btn btn-ghost rounded-full" onClick={() => { setWebcam(!webcam) }}>W</button>}
              {screen && <button className="btn btn-secondary rounded-full" onClick={() => { setScreen(!screen) }}>S</button>}
              {!screen && <button className="btn btn-ghost rounded-full" onClick={() => { setScreen(!screen) }}>S</button>}
              {audio && <button className="btn btn-secondary rounded-full" onClick={() => { setAudio(!audio) }}>M</button>}
              {!audio && <button className="btn btn-ghost rounded-full" onClick={() => { setAudio(!audio) }}>M</button>}
            </div>
          }
          {
            !live && <button className="btn btn-success" onClick={startRecording}>Start</button>
          }
          {
            live && <button className="btn btn-error" onClick={stopRecording}>Stop</button>
          }
        </div>

        <div>
          <Interactivity videoId={params.token} />
        </div>
      </div>
    </>
  )
}

export default Live