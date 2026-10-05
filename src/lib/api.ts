const BASE_URL =
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_SITE_URL
    : ''

export async function fetchData() {
  const res = await fetch(`${BASE_URL}/api/data`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function fetchReviews() {
  const res = await fetch(`${BASE_URL}/api/reviews`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch reviews')
  }

  return res.json()
}
