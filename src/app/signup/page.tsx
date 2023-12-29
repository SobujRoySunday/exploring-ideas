import axios from 'axios'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const Signup = () => {
  const submit = async (formData: FormData) => {
    "use server"

    const name = formData.get("name")?.toString()
    const email = formData.get("email")?.toString()
    const password = formData.get("password")?.toString()
    const retypePassword = formData.get("retypePassword")?.toString()

    const response = await axios.post(`${process.env.DOMAIN}/api/users/signup`, { name, email, password, retypePassword })
    if (!response) {
      throw new Error(`Couldn't create an account`)
    }

    redirect('/signin')
  }

  return (
    <div className='flex justify-center py-32'>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" action={submit}>
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your name</span>
            </label>
            <input name='name' type="text" placeholder="name" className="input input-bordered" required />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input name='email' type="email" placeholder="email" className="input input-bordered" required />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input name='password' type="password" placeholder="password" className="input input-bordered" required />
          </div>

          {/* Retype Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Retype Password</span>
            </label>
            <input name='retypePassword' type="password" placeholder="retype password" className="input input-bordered" required />
          </div>

          {/* Submit */}
          <div className="form-control mt-6">
            <button type='submit' className="btn btn-primary">Create account</button>
          </div>
          <label className="label justify-center">
            <Link href="/signin" className="label-text-alt link link-hover">Already have an account?</Link>
          </label>
        </form>
      </div>
    </div>
  )
}

export default Signup