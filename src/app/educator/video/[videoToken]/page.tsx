import React from 'react'

const Video = ({ params }: {
  params: { videoToken: string }
}) => {
  return (
    <div>Video: {params.videoToken}</div>
  )
}

export default Video