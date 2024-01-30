
import { useContext, useEffect, useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import { getCategories } from '../api/api'
import { LoginContext } from '../contexts/LoginContext'

const people = [
  { id: 1, name: 'Leslie Alexander' },
  // More users...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CategoryDropdown() {
  const [query, setQuery] = useState('')
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [categories, setCategories] = useState()
  const {productCategory, setProductCategory} = useContext(LoginContext)

  useEffect(()=>{
    getCategories(setCategories)
  }, [])

  const filteredPeople =
  productCategory === ''
      ? categories
      : categories.filter((person) => {
          return person.name.toLowerCase().includes(productCategory.toLowerCase())
        })

  return (
    <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Label className="block text-sm leading-6 font-semibold text-primaryColor">Category</Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 py-1.5 pl-3 pr-10 bg-secondaryColor text-primaryColor shadow-sm outline-none sm:text-sm sm:leading-6"
          onChange={(event) => setProductCategory(event.target.value)}
          displayValue={(person) => person?.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredPeople?.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.map((person) => (
              <Combobox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-8 pr-4',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span onClick={()=>setProductCategory(person.name)} className={classNames('block truncate', selected && 'font-semibold')}>{person.name}</span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 left-0 flex items-center pl-1.5',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}
