import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UserRoles } from '@prisma/client'
import { AdminPaths, PublicPaths, EducatorPaths, StudentPaths } from './lib/constants'
import { getUserRole } from './helpers/getUserRole'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = PublicPaths.includes(path)
  const isAdminPath = AdminPaths.includes(path)
  const isEducatorPath = EducatorPaths.includes(path)
  const isStudentPath = StudentPaths.includes(path)
  const token = request.cookies.get('authToken')?.value || ''
  const userRole = await getUserRole(token)

  if (isPublicPath && token) {
    if (userRole === UserRoles.ADMIN)
      return NextResponse.redirect(new URL('/admin', request.nextUrl))
    else if (userRole === UserRoles.EDUCATOR)
      return NextResponse.redirect(new URL('/educator', request.nextUrl))
    return NextResponse.redirect(new URL('/student', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (token && userRole === UserRoles.ADMIN && !isAdminPath) {
    return NextResponse.redirect(new URL('/admin', request.nextUrl))
  }
  if (token && userRole === UserRoles.EDUCATOR && !isEducatorPath) {
    return NextResponse.redirect(new URL('/educator', request.nextUrl))
  }
  if (token && userRole === UserRoles.STUDENT && !isStudentPath) {
    return NextResponse.redirect(new URL('/student', request.nextUrl))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/signup',
    '/signin',
    '/admin',
    '/educator',
    '/educator/golive',
    '/student'
  ],
}