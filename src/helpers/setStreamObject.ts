export function setStreamObject(stream: MediaStream | null) {
  const videoDiv = document.getElementById("video") as HTMLMediaElement
  videoDiv.srcObject = stream;
}