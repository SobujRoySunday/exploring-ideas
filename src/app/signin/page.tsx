"use client"

import axios from 'axios'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserRoles } from '@prisma/client'

export default function Signin() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const login = async (e: FormEvent) => {
    e.preventDefault()

    try {

      setLoading(true);
      const response = await axios.post(`/api/users/login`, { email, password });
      const role = response.data.role
      if (role === UserRoles.ADMIN) {
        router.push('/admin')
      } else if (role === UserRoles.EDUCATOR) {
        router.push('/educator')
      } else if (role === UserRoles.STUDENT) {
        router.push('/student')
      }
    } catch (error: any) {

      if (error.response) {
        toast.error(error.response.data);
      } else if (error.request) {
        console.log(error.request);
        toast.error('Some error occurred');
      } else {
        console.log('Error', error.message);
        toast.error('Some error occurred');
      }

    }
    finally {
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
        <form onSubmit={login} className="card-body">
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
          <div className="form-control mt-6">
            <button type='submit' className="btn btn-primary">
              Login
              {
                loading && <span className="loading loading-spinner loading-sm"></span>
              }
            </button>
          </div>
          <label className="flex justify-center">
            <Link href="/signup" className="text-xs text-zinc-400 hover:text-zinc-500">Create new account</Link>
          </label>
        </form>
      </div>
    </div>
  )
}
