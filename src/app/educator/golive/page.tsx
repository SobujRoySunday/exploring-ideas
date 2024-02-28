"use client"

import { convertToBase64 } from "@/helpers/convertToBase64"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const GoLive = () => {
  const router = useRouter()
  const [newModule, setNewModule] = useState(true)
  const [newChapter, setNewChapter] = useState(true)
  const [module, setModule] = useState("")
  const [chapter, setChapter] = useState("")
  const [video, setVideo] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const createNewLive = async () => {
    try {
      setLoading(true)
      let moduleId, chapterId;

      // Setting the new module name if user has not given any module input
      if (newModule && !module) {
        const moduleCountResponse = await axios.get('/api/utils/getModuleCount')
        console.log(`${moduleCountResponse.data.count + 1}`)
        setModule(`Modules #${moduleCountResponse.data.count + 1}`)
      }

      if (newModule && newChapter && !chapter) {
        setChapter(`Chapter #1`)
      }

      if (newModule && module && chapter) {
        const moduleCreateResponse = await axios.post(`/api/live/moduleCreate`, { module })
        if (moduleCreateResponse) {
          moduleId = moduleCreateResponse.data.createdModule.id;
          const chapterCreateResponse = await axios.post(`/api/live/chapter`, { chapter, moduleId });
          if (chapterCreateResponse) {
            chapterId = chapterCreateResponse.data.createdChapter.id;
          }
        }
      }

      let fileBase64;
      if (file) {
        fileBase64 = await convertToBase64(file as File)
      } else {
        fileBase64 = ""
      }
      if (!video) {
        setVideo("Lesson #1")
      }
      const response = await axios.post(`/api/live/create`, { video, chapterId, fileBase64 })
      const liveToken = response.data.createdVideoLog.id
      router.push(`/educator/golive/${liveToken}`)
    } catch (error: any) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (newModule) {
      setNewChapter(true)
    }
  }, [newModule])

  return (
    <div className='flex justify-center items-center h-screen bg-zinc-950'>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl min-w-[29rem] bg-zinc-900">
        <div className="card-body">

          {/* Module */}
          <div className="form-control flex flex-row items-center gap-8">
            <label className="label">
              <span className="label-text text-zinc-300">Create a new module?</span>
            </label>
            <div className=" flex gap-2 text-zinc-300">
              Yes: <input onChange={() => { setNewModule(true) }} type="radio" className="radio radio-primary" checked={newModule} />
              No: <input onChange={() => { setNewModule(false) }} type="radio" className="radio radio-primary" checked={!newModule} />
            </div>
          </div>

          {/* Chapters */}
          <div className="form-control flex flex-row items-center gap-8">
            <label className="label">
              <span className="label-text text-zinc-300">Create a new chapter?</span>
            </label>
            <div className=" flex gap-2 text-zinc-300">
              Yes: <input onChange={() => { if (!newModule) setNewChapter(true) }} type="radio" className="radio radio-primary" checked={newChapter} />
              No: <input onChange={() => { if (!newModule) setNewChapter(false) }} type="radio" className="radio radio-primary" checked={!newChapter} />
            </div>
          </div>

          {/* Module name */}
          <div className="form-control flex flex-row items-center gap-8">
            <label className="label">
              <span className="label-text text-zinc-300">Module name</span>
            </label>
            <input
              type="text"
              placeholder="module name"
              className="input input-bordered bg-zinc-800 text-zinc-300"
              value={module}
              onChange={(e) => { setModule(e.target.value) }}
              disabled={!newModule}
              required
            />
          </div>

          {/* Chapter name */}
          <div className="form-control flex flex-row items-center gap-8">
            <label className="label">
              <span className="label-text text-zinc-300">Chapter name</span>
            </label>
            <input
              type="text"
              placeholder="chapter name"
              className="input input-bordered bg-zinc-800 text-zinc-300"
              value={chapter}
              onChange={(e) => { setChapter(e.target.value) }}
              disabled={!newChapter}
              required />
          </div>

          {/* Video name */}
          <div className="form-control flex flex-row items-center gap-8">
            <label className="label">
              <span className="label-text text-zinc-300">Video name</span>
            </label>
            <input
              type="text"
              placeholder="chapter name"
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
            <button onClick={createNewLive} className="btn btn-primary">Go live</button>
          </div>
          <label className="label justify-center">
            <Link href="/educator" className="label-text-alt link link-hover">
              Go back
              {loading && <span className="loading loading-spinner"></span>}
            </Link>
          </label>
        </div>
      </div>
    </div>
  )
}

export default GoLive