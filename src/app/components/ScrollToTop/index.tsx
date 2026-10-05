'use client'
import { useEffect, useState } from 'react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="
            flex h-12 w-12 items-center justify-center
            rounded-full
            bg-[#102C46] text-white
            shadow-md
            transition-colors duration-300 ease-in-out
            hover:bg-[#f47d27]
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f47d27]
          "
        >
          <span className="mt-[4px] h-3 w-3 rotate-45 border-l-2 border-t-2 border-white" />
        </button>
      )}
    </div>
  )
}
