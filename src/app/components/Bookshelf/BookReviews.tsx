'use client'

import { useEffect, useState } from 'react'
import { fetchReviews } from '@/lib/api'

type Review = {
  productId: string
  stars: number
  comment: string
  author: string
}

export default function BookReviews({
  productId,
}: {
  productId: string
}) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
      .then(data => {
        setReviews(data.filter((r: Review) => r.productId === productId))
      })
      .finally(() => setLoading(false))
  }, [productId])

  if (loading) {
    return <p className="text-sm opacity-60">Loading reviews…</p>
  }

  if (reviews.length === 0) {
    return <p className="text-sm opacity-60">No reviews yet</p>
  }

  return (
    <div className="mt-4 space-y-2">
      {reviews.map((r, i) => (
        <div key={i} className="border rounded-lg p-3 text-sm">
          <div className="font-semibold">
            ⭐ {r.stars} / 5
          </div>
          <p>{r.comment}</p>
          <p className="text-xs opacity-60 mt-1">
            {r.author}
          </p>
        </div>
      ))}
    </div>
  )
}
