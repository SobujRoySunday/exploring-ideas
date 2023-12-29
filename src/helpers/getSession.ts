import { cookies } from 'next/headers'

export function getSession() {
  const cookieStore = cookies()
  const authToken = cookieStore.get('authToken')

  if (authToken)
    return authToken?.value
  else
    return null

}