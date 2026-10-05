'use client'
import { Fragment, useEffect, useState } from 'react'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from '@headlessui/react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { CourseType } from '@/app/types/course'

const Dropdown = () => {
  const [course, setCourse] = useState<CourseType[]>([])
  const [selected, setSelected] = useState<CourseType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setCourse(data.CourseData)
        setSelected(data.CourseData[0])
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='w-full'>
      <p className='text-lg text-brand-navy/60'>What do you want to learn?</p>
      <Listbox value={selected} onChange={setSelected}>
        <div className='relative mt-1'>
          <ListboxButton className='relative w-full cursor-default rounded-lg bg-white dark:bg-brand-navy-dark text-xl py-2 pe-10 text-start focus:outline-hidden focus-visible:border-brand-orange focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-orange sm:text-sm hover:cursor-pointer'>
            <span className='block truncate text-xl font-semibold text-brand-navy dark:text-white'>
              {selected?.name}
            </span>
            <span className='pointer-events-none absolute inset-y-0 end-0 flex items-center pe-2'>
              <Icon
                icon='tabler:chevron-down'
                className='text-brand-navy/40 text-xl inline-block me-2'
              />
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <ListboxOptions className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-brand-navy-dark py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden sm:text-sm'>
              {course.map((person, personIdx) => (
                <ListboxOption
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 ps-10 pe-4 ${
                      active ? 'bg-brand-orange/10 text-brand-orange-dark' : 'text-brand-navy dark:text-white'
                    }`
                  }
                  value={person}>
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}>
                        {person.name}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 start-0 flex items-center ps-3 text-amber-600'>
                          <Icon
                            icon='tabler:check'
                            className='text-xl inline-block me-2'
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default Dropdown
