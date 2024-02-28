"use client"

import axios from 'axios'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post(`/api/users/signup`, { name, email, password, retypePassword })
      toast.success('Account created')
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
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-zinc-950'>
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
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-zinc-900">
        <form className="card-body" onSubmit={submit}>
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-zinc-400">Your name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered bg-zinc-800 text-zinc-400"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
              required
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-zinc-400">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered bg-zinc-800 text-zinc-400"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              required
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-zinc-400">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered bg-zinc-800 text-zinc-400"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              required
            />
          </div>

          {/* Retype Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-zinc-400">Retype Password</span>
            </label>
            <input
              type="password"
              placeholder="retype password"
              className="input input-bordered bg-zinc-800 text-zinc-400"
              value={retypePassword}
              onChange={(e) => { setRetypePassword(e.target.value) }}
              required
            />
          </div>

          {/* Submit */}
          <div className="form-control mt-6">
            <button type='submit' className="btn btn-primary">
              Create account
              {
                loading && <span className="loading loading-spinner loading-sm"></span>
              }
            </button>
          </div>
          <label className="flex justify-center">
            <Link href="/signin" className="text-xs text-zinc-400 hover:text-zinc-500">Already have an account?</Link>
          </label>
        </form>
      </div>
    </div>
  )
}

export default Signup