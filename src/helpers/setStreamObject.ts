export function setWebcamStreamObject(stream: MediaStream | null) {
  const videoDiv = document.getElementById("webcam") as HTMLMediaElement
  videoDiv.srcObject = stream;
}

export function setScreenStreamObject(stream: MediaStream | null) {
  const videoDiv = document.getElementById("screen") as HTMLMediaElement
  videoDiv.srcObject = stream;
}