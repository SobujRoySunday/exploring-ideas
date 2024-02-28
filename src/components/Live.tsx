import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

const Live = () => {
  return (
    <div title='Go live'>
      <Link className="btn btn-circle btn-success" href='/educator/golive'>
        <FontAwesomeIcon className='w-5' icon={faVideo} />
      </Link>
    </div>
  )
}

export default Live;
