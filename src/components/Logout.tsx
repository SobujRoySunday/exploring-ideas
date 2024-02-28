import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Logout = () => {
  async function logoutSession() {
    "use server"

    cookies().set('authToken', '', { expires: Date.now() })
    redirect('/')
  }

  return (
    <form action={logoutSession} title='Logout'>
      <button type='submit' className='btn btn-circle btn-error text-xs'>
        <FontAwesomeIcon className='w-5' icon={faRightFromBracket} />
      </button>
    </form>
  )
}

export default Logout