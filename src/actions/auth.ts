'use server'

import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import { encrypt } from '@/lib/auth'

export async function register(formData: FormData) {
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const phone = formData.get('phone') as string
  const country = formData.get('country') as string

  if (!email || !password || !firstName || !lastName) {
    return { error: 'Missing required fields' }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { error: 'Email already exists' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      country,
      passwordHash: hashedPassword,
      role: 'USER',
    },
  })

  // Create session
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const session = await encrypt({ user: { id: user.id, email: user.email, role: user.role, name: `${user.firstName} ${user.lastName}`, firstName: user.firstName } })

  ;(await cookies()).set('session', session, { expires, httpOnly: true, secure: true, sameSite: 'strict' })

  return { success: true, user: { id: user.id, email: user.email, role: user.role, name: `${user.firstName} ${user.lastName}` } }
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return { error: 'invalidCredentials' }
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash)

  if (!validPassword) {
    return { error: 'invalidCredentials' }
  }

  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const session = await encrypt({ user: { id: user.id, email: user.email, role: user.role, name: `${user.firstName} ${user.lastName}`, firstName: user.firstName } })

  ;(await cookies()).set('session', session, { expires, httpOnly: true, secure: true, sameSite: 'strict' })

  return { success: true, user: { id: user.id, email: user.email, role: user.role, name: `${user.firstName} ${user.lastName}` } }
}

export async function logout() {
  ;(await cookies()).delete('session')
}
