import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import jwt from 'jsonwebtoken'
import { UserRoles } from '@prisma/client'
import { redirect } from 'next/navigation'

type jwtAuthTokenPayload = {
  id: string,
  name: string,
  role: UserRoles,
  iat: number,
  exp: number
}

export default function Signin() {
  const login = async (formData: FormData) => {
    "use server"

    const email = formData.get("email")
    const password = formData.get("password")

    const response = await axios.post(`${process.env.DOMAIN}/api/users/login`, { email, password })
    if (!response) {
      throw new Error(`Couldn't login`)
    }

    const activeUserDetails: jwtAuthTokenPayload = jwt.verify(response.data.token, process.env.TOKEN_SECRET_KEY!) as jwtAuthTokenPayload
    if (activeUserDetails.role === UserRoles.STUDENT)
      redirect('/student')
    else if (activeUserDetails.role === UserRoles.EDUCATOR)
      redirect('/educator')
    else if (activeUserDetails.role === UserRoles.ADMIN)
      redirect('/admin')
  }

  return (
    <div className='flex justify-center py-64'>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" action={login}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input name='email' type="email" placeholder="email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input name='password' type="password" placeholder="password" className="input input-bordered" required />
            <label className="label">
              <Link href="/forgotPassword" className="label-text-alt link link-hover">Forgot password?</Link>
            </label>
          </div>
          <div className="form-control mt-6">
            <button type='submit' className="btn btn-primary">Login</button>
          </div>
          <label className="label justify-center">
            <Link href="/signup" className="label-text-alt link link-hover">Create new account</Link>
          </label>
        </form>
      </div>
    </div>
  )
}
