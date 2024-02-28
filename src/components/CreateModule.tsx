import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

const CreateModule = () => {
  return (
    <div title='Create new Module'>
      <Link href="/educator/newModule" className="btn btn-circle btn-success">
        <FontAwesomeIcon className='w-5' icon={faPlus} />
      </Link>
    </div>
  )
}

export default CreateModule