'use client'

import { Book } from './types'
import BookReviews from './BookReviews'

export default function BookModal({
  book,
  onClose,
}: {
  book: Book
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
        <h2 className="text-xl font-bold">{book.course}</h2>
        <p className="mt-2">{book.profession}</p>

        <BookReviews productId={book.course} />

        <button
          onClick={onClose}
          className="mt-6 border px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  )
}
