'use client'

import Image from 'next/image'
import { useState } from 'react'
import BookModal from './BookModal'
import { useCart } from '@/app/context/cart.context'
import { Book } from './types'

export default function BookCard({ book }: { book: Book }) {
  const [open, setOpen] = useState(false)
  const { addItem } = useCart()

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer border rounded-xl p-4 hover:shadow-lg"
      >
        <Image
          src={book.imageSrc}
          alt={book.course}
          width={300}
          height={400}
        />
        <h3 className="font-semibold mt-3">{book.course}</h3>
        <p className="text-sm opacity-70">{book.profession}</p>
        <p className="font-bold mt-2">${book.price}</p>

        <button
          onClick={e => {
            e.stopPropagation()
            addItem({
              id: book.course,
              title: book.course,
              price: Number(book.price),
              quantity: 1,
            })
          }}
          className="mt-2 bg-brand-orange text-white px-4 py-1 rounded-full text-sm hover:bg-brand-orange-dark transition-colors"
        >
          Add to cart
        </button>
      </div>

      {open && <BookModal book={book} onClose={() => setOpen(false)} />}
    </>
  )
}
