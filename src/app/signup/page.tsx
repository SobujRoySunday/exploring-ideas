"use client"

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const router = useRouter()
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
        toast.error(error.request);
      } else {
        console.log('Error', error.message);
        toast.error(`Error ${error.message}`);
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center py-32'>
      <ToastContainer />
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={submit}>
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
              required
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              required
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              required
            />
          </div>

          {/* Retype Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Retype Password</span>
            </label>
            <input
              type="password"
              placeholder="retype password"
              className="input input-bordered"
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
          <label className="label justify-center">
            <Link href="/signin" className="label-text-alt link link-hover">Already have an account?</Link>
          </label>
        </form>
      </div>
    </div>
  )
}

export default Signup