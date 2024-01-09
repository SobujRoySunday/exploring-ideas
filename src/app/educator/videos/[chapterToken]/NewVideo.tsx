"use client";

import Link from 'next/link';
import { useState } from 'react';

const NewVideo = ({ chapterId }: { chapterId: string }) => {
  const [video, setVideo] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleClick = () => {
    console.log()
  }

  return (
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 min-w-[32rem]">
      <div className="card-body">

        {/* Video name */}
        <div className="form-control flex flex-row items-center gap-8">
          <label className="label">
            <span className="label-text">Video name</span>
          </label>
          <input
            type="text"
            placeholder="chapter name"
            className="input input-bordered"
            value={video}
            onChange={(e) => { setVideo(e.target.value) }}
            required />
        </div>

        {/* PPT select */}
        <div className="form-control flex flex-row items-center gap-8">
          <label className="label">
            <span className="label-text">Upload your presentation</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
            onChange={(e) => {
              if (e.target.files)
                setFile(e.target.files[0]);
            }}
            accept=".pdf"
          />
        </div>

        {/* Submit */}
        <div className="form-control mt-6">
          <button onClick={handleClick} className="btn btn-primary">Go live</button>
        </div>
      </div>
    </div>
  )
}

export default NewVideo