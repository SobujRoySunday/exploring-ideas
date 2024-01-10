"use client"

import axios from 'axios'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signin() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const login = async (e: FormEvent) => {
    e.preventDefault()

    try {

      setLoading(true);
      await axios.post(`/api/users/login`, { email, password });
      router.push('/')

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

    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center py-64'>
      <ToastContainer />
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={login} className="card-body">
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
          <div className="form-control mt-6">
            <button type='submit' className="btn btn-primary">
              Login
              {
                loading && <span className="loading loading-spinner loading-sm"></span>
              }
            </button>
          </div>
          <label className="label justify-center">
            <Link href="/signup" className="label-text-alt link link-hover">Create new account</Link>
          </label>
        </form>
      </div>
    </div>
  )
}
