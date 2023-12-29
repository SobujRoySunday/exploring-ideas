import { VideoStreamMerger } from "video-stream-merger";

export function mediaMerge(mainStream, subStream) {
  let merger = new VideoStreamMerger({
    width: 1280,
    height: 720,
    fps: 60,
  });

  merger.addStream(mainStream, {
    x: 0,
    y: 0,
    width: 1280,
    height: 720,
    mute: true,
  });

  const subStreamWidth = subStream.getVideoTracks()[0].getSettings().width;
  const subStreamHeight = subStream.getVideoTracks()[0].getSettings().height;

  merger.addStream(subStream, {
    x: 0,
    y: merger.height - subStreamHeight / 3,
    width: subStreamWidth / 3,
    height: subStreamHeight / 3,
    mute: false,
  });

  merger.start();

  const mergedStream = merger.result;
  return mergedStream;
}
