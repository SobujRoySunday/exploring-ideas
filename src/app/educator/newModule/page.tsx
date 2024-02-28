"use client";

import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewModule = () => {
  const [module, setModule] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const chapterCreateResponse = await axios.post(`/api/live/moduleCreate`, { module });
      toast.success(`New module created: ${module}`)
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
              <span className="label-text text-zinc-300">Module name</span>
            </label>
            <input
              type="text"
              placeholder="eg. Web Development"
              className="input input-bordered bg-zinc-800 text-zinc-300"
              value={module}
              onChange={(e) => { setModule(e.target.value) }}
              required
            />
          </div>
          {/* Submit */}
          <div className="form-control mt-6">
            <button onClick={handleClick} className="btn btn-primary">
              {
                loading && <span className="loading loading-spinner loading-sm"></span>
              }
              Create new module
            </button>
          </div>
          <Link href="/educator" className='text-zinc-300 text-xs hover:text-zinc-600 cursor-pointer flex justify-center'>Go back</Link>
        </div>
      </div>
    </div>
  )
}

export default NewModule