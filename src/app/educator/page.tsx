import Link from 'next/link'
import React from 'react'

const Educator = () => {
  return (
    <div className='flex justify-center my-10'>
      <Link className="btn btn-error" href='/educator/golive'>Go Live</Link>
    </div>
  )
}

export default Educator