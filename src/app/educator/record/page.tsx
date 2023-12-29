"use client"

import { setStreamObject } from "@/helpers/setStreamObject";
import { mediaMerge } from "@/helpers/videoStreamMerger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const RecordPage = () => {
  const [webcamMode, setWebcamMode] = useState(true)
  const [screenMode, setScreenMode] = useState(false)
  const [audioEnabled, setAudio] = useState(true)

  const webcamStream = useRef<MediaStream>()
  const displayStream = useRef<MediaStream>()
  const combinedStream = useRef<MediaStream>()

  const recordedChunks = useRef<BlobPart[]>([]);
  const mediaRecorder = useRef<MediaRecorder>();

  const startRecording = async () => {
    try {
      alert('Recording started...')
      console.log('Recording started...')

      const stream = combinedStream.current as MediaStream
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "test.webm";
        a.click();

        recordedChunks.current = [];
      };

      mediaRecorder.current.start();
    } catch (error) {
      alert("Some error occurred");
      console.error(error);
    }
  };

  const stopRecording = () => {
    alert('Recording stopped')
    if (mediaRecorder.current && combinedStream.current) {
      mediaRecorder.current.stop();
      combinedStream.current.getTracks().forEach((track) => track.stop());
    }
  };

  const previewOnlyWebcam = async () => {
    try {
      webcamStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: audioEnabled })
      setStreamObject(webcamStream.current)
      combinedStream.current = webcamStream.current
    } catch (error) {
      alert('Error accessing webcam')
      console.log(error)
    }
  }

  const previewOnlyScreen = async () => {
    try {
      displayStream.current = await navigator.mediaDevices.getDisplayMedia({ video: { displaySurface: 'window' }, audio: false })
      setStreamObject(displayStream.current)
      combinedStream.current = displayStream.current
    } catch (error) {
      alert('Error accessing screen media')
      console.log(error)
    }
  }

  const previewScreenWithCam = async () => {
    displayStream.current = await navigator.mediaDevices.getDisplayMedia({ video: { displaySurface: 'window' }, audio: false })
    webcamStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: audioEnabled })
    const mergedStream = mediaMerge(displayStream.current, webcamStream.current)
    setStreamObject(mergedStream)
    combinedStream.current = mergedStream as MediaStream
  }

  useEffect(() => {
    if (webcamMode && screenMode) {
      previewScreenWithCam()
    } else if (webcamMode) {
      previewOnlyWebcam()
    } else {
      previewOnlyScreen()
    }
  }, [screenMode, webcamMode, audioEnabled])

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div className="flex flex-col">
        <video id="video" width="100%" height="100%" autoPlay muted />
      </div>
      <div className="flex flex-row p-10 gap-10">
        <button onClick={() => {
          if (screenMode)
            setWebcamMode(!webcamMode)
        }}>Webcam</button>
        <button onClick={() => setScreenMode(!screenMode)}>Screen</button>
        <button onClick={() => setAudio(!audioEnabled)}>Audio</button>
        <button onClick={startRecording} className="bg-green-600 p-5">Start Recording</button>
        <button onClick={stopRecording} className="bg-red-600 p-5">Stop Recording</button>
      </div>
    </div>
  )
}

export default RecordPage