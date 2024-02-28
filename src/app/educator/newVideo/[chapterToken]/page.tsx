"use client";

import { convertToBase64 } from '@/helpers/convertToBase64';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const NewVideo = ({ params }: {
  params: { chapterToken: string }
}) => {
  const router = useRouter();
  const [video, setVideo] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      let fileBase64;
      if (file) {
        fileBase64 = await convertToBase64(file as File)
      } else {
        fileBase64 = ""
      }
      const response = await axios.post(`/api/live/create`, { video, chapterId: params.chapterToken, fileBase64 })
      const liveToken = response.data.createdVideoLog.id
      router.push(`/educator/golive/${liveToken}`)
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data);
      } else if (error.request) {
        console.log(error.request);
        toast.error(`Some error occurred`);
      } else {
        console.log('Error', error.message);
        toast.error(`Some error occurred`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen absolute top-0 left-0 bg-zinc-950">
      <div className="card shrink-0 max-w-sm shadow-2xl min-w-[30rem] bg-zinc-900">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className="card-body">

          {/* Video name */}
          <div className="form-control flex flex-row items-center gap-8">
            <label className="label">
              <span className="label-text text-zinc-300">Video name</span>
            </label>
            <input
              type="text"
              placeholder="eg. Vercel Deployment"
              className="input input-bordered bg-zinc-800 text-zinc-300"
              value={video}
              onChange={(e) => { setVideo(e.target.value) }}
              required />
          </div>

          {/* PPT select */}
          <div className="form-control flex flex-row items-center gap-8">
            <label className="label">
              <span className="label-text text-zinc-300">Upload your presentation</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-warning w-full max-w-xs bg-zinc-800 text-zinc-300"
              onChange={(e) => {
                if (e.target.files)
                  setFile(e.target.files[0]);
              }}
              accept=".pdf"
            />
          </div>

          {/* Submit */}
          <div className="form-control mt-6">
            <button onClick={handleClick} className="btn btn-primary">
              {
                loading && <span className="loading loading-spinner loading-sm"></span>
              }
              Go live
            </button>
          </div>
          <Link href={`/educator/videos/${params.chapterToken}`} className='text-zinc-300 text-xs hover:text-zinc-600 cursor-pointer flex justify-center'>Go back</Link>
        </div>
      </div>
    </div>
  )
}

export default NewVideo