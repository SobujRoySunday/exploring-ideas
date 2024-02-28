"use client";

import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewChapter = ({ params }: {
  params: { moduleToken: string }
}) => {
  const [chapter, setChapter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const chapterCreateResponse = await axios.post(`/api/live/chapter`, { chapter, moduleId: params.moduleToken });
      toast.success(`New chapter created: ${chapter}`)
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data);
      } else if (error.request) {
        console.log(error.request);
        toast.error(error.request);
      } else {
        console.log('Error', error.message);
        toast.error(`Error ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex justify-center items-center w-screen h-screen absolute top-0 left-0 bg-zinc-950'>
      <div className="card shrink-0 max-w-sm shadow-2xl min-w-[26rem] bg-zinc-900">
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
          {/* Chapter name */}
          <div className="form-control flex flex-row items-center gap-8">
            <label className="label">
              <span className="label-text text-zinc-300">Chapter name</span>
            </label>
            <input
              type="text"
              placeholder="eg. Deployments"
              className="input input-bordered bg-zinc-800 text-zinc-300"
              value={chapter}
              onChange={(e) => { setChapter(e.target.value) }}
              required
            />
          </div>
          {/* Submit */}
          <div className="form-control mt-6">
            <button onClick={handleClick} className="btn btn-primary">
              {
                loading && <span className="loading loading-spinner loading-sm"></span>
              }
              Create new chapter
            </button>
          </div>
          <Link className='text-zinc-300 text-xs flex justify-center hover:text-zinc-600' href={`/educator/chapters/${params.moduleToken}`}>
            Go back
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NewChapter