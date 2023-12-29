import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Logout = () => {
  async function logoutSession() {
    "use server"

    cookies().set('authToken', '', { expires: Date.now() })
    redirect('/')
  }

  return (
    <form action={logoutSession}>
      <button type='submit' className='btn btn-error'>Logout</button>
    </form>
  )
}

export default Logout