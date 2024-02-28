import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div title='Go to dashboard'>
      <Link href={`/educator`} className="btn btn-circle btn-success">
        <FontAwesomeIcon className='w-5' icon={faHouse} />
      </Link>
    </div>
  )
}

export default Home