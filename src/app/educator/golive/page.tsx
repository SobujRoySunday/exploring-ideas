import Link from "next/link"

const GoLive = () => {
  return (
    <div className='flex justify-center py-32'>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 min-w-[32rem]">
        <form className="card-body">

          {/* Module */}
          <div className="form-control flex flex-row items-center gap-8">
            <label className="label">
              <span className="label-text">Create a new module?</span>
            </label>
            <div className=" flex gap-2">
              Yes: <input type="radio" name="radio-2" className="radio radio-primary" checked />
              No: <input type="radio" name="radio-2" className="radio radio-primary" />
            </div>
          </div>

          {/* Chapters */}
          <div className="form-control flex flex-row items-center gap-8">
            <label className="label">
              <span className="label-text">Create a new chapter?</span>
            </label>
            <div className=" flex gap-2">
              Yes: <input type="radio" name="radio-2" className="radio radio-primary" checked />
              No: <input type="radio" name="radio-2" className="radio radio-primary" />
            </div>
          </div>

          {/* Module name */}
          <div className="form-control flex flex-row items-center gap-8">
            <label className="label">
              <span className="label-text">Module name</span>
            </label>
            <input type="text" placeholder="module name" className="input input-bordered" required />
          </div>

          {/* Chapter name */}
          <div className="form-control flex flex-row items-center gap-8">
            <label className="label">
              <span className="label-text">Chapter name</span>
            </label>
            <input type="text" placeholder="chapter name" className="input input-bordered" required />
          </div>

          {/* PPT select */}
          <div className="form-control flex flex-row items-center gap-8">
            <label className="label">
              <span className="label-text">Upload your presentation</span>
            </label>
            <input type="file" className="file-input file-input-bordered file-input-warning w-full max-w-xs" />
          </div>

          {/* Submit */}
          <div className="form-control mt-6">
            <button className="btn btn-primary">Go live</button>
          </div>
          <label className="label justify-center">
            <Link href="/educator" className="label-text-alt link link-hover">Go back</Link>
          </label>
        </form>
      </div>
    </div>
  )
}

export default GoLive