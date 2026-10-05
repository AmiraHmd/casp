'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import crypto from 'crypto'
import { customAlphabet } from 'nanoid'
import { encrypt, decrypt } from '@/lib/encryption'
import bcrypt from 'bcrypt'

// --- User Management ---

export async function createUser(data: {
  firstName: string
  lastName: string
  email: string
  password?: string
  country?: string
  phone?: string
}) {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  })

  if (existingUser) {
    return { error: 'Email already exists' }
  }

  const hashedPassword = await bcrypt.hash(data.password || '123456', 10)

  const user = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash: hashedPassword,
      role: 'USER',
      country: data.country,
      phone: data.phone,
    },
  })

  revalidatePath('/admin/users')
  return { success: true, user }
}

export async function getUsers(limit: number = 5, search?: string, cursor?: string, direction: 'next' | 'prev' = 'next') {
  const whereClause = search ? {
    OR: [
      { firstName: { contains: search, mode: 'insensitive' as const } },
      { lastName: { contains: search, mode: 'insensitive' as const } },
      { email: { contains: search, mode: 'insensitive' as const } },
    ]
  } : {}

  const takeCount = direction === 'next' ? limit + 1 : -(limit + 1)

  const [total, usersRaw] = await Promise.all([
    prisma.user.count({ where: whereClause }),
    prisma.user.findMany({
      where: whereClause,
      take: takeCount,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      include: {
        accessCodes: {
          select: { code: true, used: true, expiresAt: true }
        }
      },
      orderBy: [
        { createdAt: 'desc' },
        { id: 'desc' }
      ]
    })
  ])

  let hasNextPage = false
  let hasPrevPage = false
  let usersToReturn = usersRaw

  if (direction === 'next') {
    if (usersRaw.length > limit) {
      hasNextPage = true
      usersToReturn = usersRaw.slice(0, limit)
    }
    hasPrevPage = !!cursor
  } else {
    if (usersRaw.length > limit) {
      hasPrevPage = true
      usersToReturn = usersRaw.slice(1)
    }
    hasNextPage = true
  }

  const nextCursor = usersToReturn.length > 0 ? usersToReturn[usersToReturn.length - 1].id : undefined
  const prevCursor = usersToReturn.length > 0 ? usersToReturn[0].id : undefined

  return {
    users: usersToReturn.map(user => ({
      ...user,
      accessCodes: user.accessCodes.map(ac => ({
        ...ac,
        code: ac.code ? decrypt(ac.code) : null
      }))
    })),
    total,
    nextCursor: hasNextPage ? nextCursor : undefined,
    prevCursor: hasPrevPage ? prevCursor : undefined,
  }
}

export async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } })
  revalidatePath('/admin/users')
}

export async function updateUserRole(id: string, role: 'USER' | 'ADMIN') {
  await prisma.user.update({
    where: { id },
    data: { role },
  })
  revalidatePath('/admin/users')
}

// --- Access Code Management ---

export async function getAccessCodes(limit: number = 5, search?: string, cursor?: string, direction: 'next' | 'prev' = 'next') {
  // Exclude Riyada-specific codes (tagged with email '@riyada') from the regular codes view
  const riyadaExclude = { NOT: { email: '@riyada' } }

  const whereClause = search ? {
    AND: [
      riyadaExclude,
      {
        OR: [
          { email: { contains: search, mode: 'insensitive' as const } },
          { user: { firstName: { contains: search, mode: 'insensitive' as const } } },
          { user: { lastName: { contains: search, mode: 'insensitive' as const } } },
          { user: { email: { contains: search, mode: 'insensitive' as const } } },
        ]
      }
    ]
  } : riyadaExclude

  const takeCount = direction === 'next' ? limit + 1 : -(limit + 1)

  const [total, codesRaw] = await Promise.all([
    prisma.accessCode.count({ where: whereClause }),
    prisma.accessCode.findMany({
      where: whereClause,
      take: takeCount,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
      },
      orderBy: [
        { createdAt: 'desc' },
        { id: 'desc' }
      ]
    })
  ])

  let hasNextPage = false
  let hasPrevPage = false
  let codesToReturn = codesRaw

  if (direction === 'next') {
    if (codesRaw.length > limit) {
      hasNextPage = true
      codesToReturn = codesRaw.slice(0, limit)
    }
    hasPrevPage = !!cursor
  } else {
    if (codesRaw.length > limit) {
      hasPrevPage = true
      codesToReturn = codesRaw.slice(1)
    }
    hasNextPage = true
  }

  const nextCursor = codesToReturn.length > 0 ? codesToReturn[codesToReturn.length - 1].id : undefined
  const prevCursor = codesToReturn.length > 0 ? codesToReturn[0].id : undefined

  return {
    codes: codesToReturn.map(code => ({
      ...code,
      code: code.code ? decrypt(code.code) : null
    })),
    total,
    nextCursor: hasNextPage ? nextCursor : undefined,
    prevCursor: hasPrevPage ? prevCursor : undefined,
  }
}

export async function generateAccessCode(data: {
  validityDays: number
  userId?: string
  email?: string
}) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*'
  const generateComplexCode = customAlphabet(alphabet, 6)
  const rawCode = generateComplexCode()
  const codeHash = crypto.createHash('sha256').update(rawCode).digest('hex')
  
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + data.validityDays)

  await prisma.accessCode.create({
    data: {
      code: encrypt(rawCode),
      codeHash,
      validityDays: data.validityDays,
      expiresAt: expiresAt,
      userId: data.userId || null,
      email: data.email || null,
    },
  })

  revalidatePath('/admin/codes')
  return { rawCode } // Only return raw code once
}

export async function deleteAccessCode(id: string) {
  await prisma.accessCode.delete({ where: { id } })
  revalidatePath('/admin/codes')
}

export async function getUnassignedCodes() {
  const codes = await prisma.accessCode.findMany({
    where: {
      userId: null,
      used: false,
      expiresAt: { gt: new Date() },
      NOT: { email: '@riyada' },
    },
    orderBy: { createdAt: 'desc' },
  })

  return codes.map(code => ({
    ...code,
    code: code.code ? decrypt(code.code) : null
  }))
}

export async function assignCode(codeId: string, userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  })

  if (!user) throw new Error('User not found')

  // Check if the code is already assigned to someone else
  const targetCode = await prisma.accessCode.findUnique({
    where: { id: codeId },
    select: { userId: true }
  })

  if (targetCode?.userId) {
    throw new Error('This code is already assigned to another user')
  }

  // Transaction to unassign old codes and assign the new one
  const [updatedCode] = await prisma.$transaction([
    // Update the new code with user info
    prisma.accessCode.update({
      where: { id: codeId },
      data: {
        userId,
        email: user.email,
      },
    }),
    // Unassign any other codes currently assigned to this user
    prisma.accessCode.updateMany({
      where: {
        userId: userId,
        NOT: { id: codeId }
      },
      data: {
        userId: null,
        email: null,
      }
    })
  ])

  revalidatePath('/admin/users')
  revalidatePath('/admin/codes')

  return {
    ...updatedCode,
    code: updatedCode.code ? decrypt(updatedCode.code) : null
  }
}

// --- Riyada Access Code Management ---

export async function getRiyadaAccessCodes(limit: number = 5, cursor?: string, direction: 'next' | 'prev' = 'next') {
  const whereClause = {
    email: '@riyada',
  }

  const takeCount = direction === 'next' ? limit + 1 : -(limit + 1)

  const [total, codesRaw] = await Promise.all([
    prisma.accessCode.count({ where: whereClause }),
    prisma.accessCode.findMany({
      where: whereClause,
      take: takeCount,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: [
        { createdAt: 'desc' },
        { id: 'desc' }
      ]
    })
  ])

  let hasNextPage = false
  let hasPrevPage = false
  let codesToReturn = codesRaw

  if (direction === 'next') {
    if (codesRaw.length > limit) {
      hasNextPage = true
      codesToReturn = codesRaw.slice(0, limit)
    }
    hasPrevPage = !!cursor
  } else {
    if (codesRaw.length > limit) {
      hasPrevPage = true
      codesToReturn = codesRaw.slice(1)
    }
    hasNextPage = true
  }

  const nextCursor = codesToReturn.length > 0 ? codesToReturn[codesToReturn.length - 1].id : undefined
  const prevCursor = codesToReturn.length > 0 ? codesToReturn[0].id : undefined

  return {
    codes: codesToReturn.map(code => ({
      ...code,
      code: code.code ? decrypt(code.code) : null
    })),
    total,
    nextCursor: hasNextPage ? nextCursor : undefined,
    prevCursor: hasPrevPage ? prevCursor : undefined,
  }
}

export async function generateRiyadaAccessCode(data: {
  validityDays: number
}) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*'
  const generateComplexCode = customAlphabet(alphabet, 6)
  const rawCode = generateComplexCode()
  const codeHash = crypto.createHash('sha256').update(rawCode).digest('hex')
  
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + data.validityDays)

  await prisma.accessCode.create({
    data: {
      code: encrypt(rawCode),
      codeHash,
      validityDays: data.validityDays,
      expiresAt: expiresAt,
      email: '@riyada',
    },
  })

  revalidatePath('/admin/riyada-codes')
  return { rawCode }
}

export async function deleteRiyadaAccessCode(id: string) {
  await prisma.accessCode.delete({ where: { id } })
  revalidatePath('/admin/riyada-codes')
}
