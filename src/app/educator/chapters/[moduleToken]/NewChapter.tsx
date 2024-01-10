"use client";

import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewChapter = ({ moduleId }: { moduleId: string }) => {
  const [chapter, setChapter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const chapterCreateResponse = await axios.post(`/api/live/chapter`, { chapter, moduleId });
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
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 min-w-[32rem]">
      <ToastContainer />
      <div className="card-body">
        {/* Chapter name */}
        <div className="form-control flex flex-row items-center gap-8">
          <label className="label">
            <span className="label-text">Chapter name</span>
          </label>
          <input
            type="text"
            placeholder="eg. Deployments"
            className="input input-bordered"
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
      </div>
    </div>
  )
}

export default NewChapter