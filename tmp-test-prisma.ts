import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function test() {
  console.log('Fetching access codes...')
  try {
    const codes = await prisma.accessCode.findMany({
      take: 5,
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
      },
      orderBy: [
        { createdAt: 'desc' },
        { id: 'desc' }
      ]
    })
    console.log('Successfully fetched', codes.length, 'codes')
  } catch (error) {
    console.error('Error fetching codes:', error)
  } finally {
    await prisma.$disconnect()
  }
}

test()
