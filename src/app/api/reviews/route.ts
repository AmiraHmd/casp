import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    {
      productId: 'al-wafi-series',
      stars: 5,
      comment: 'ممتاز جدًا',
      author: 'ولي أمر',
    },
    {
      productId: 'al-wafi-series',
      stars: 4,
      comment: 'كتاب مفيد',
      author: 'معلم',
    },
  ])
}
