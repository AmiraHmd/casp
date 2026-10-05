import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const item = await req.json()
  return NextResponse.json({ success: true, item })
}
