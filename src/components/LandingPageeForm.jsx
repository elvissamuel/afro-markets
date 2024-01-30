import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { registerEmail } from '../api/api'
import { Toaster, toast } from 'sonner'


export default function LandingPageForm({ipAddress, setOpen, open}) {
  // const [open, setOpen] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    const myData = { name: name, email: email, location: location, ip_address: ipAddress };
    console.log("data: ", myData);
      registerEmail(myData, toast, setLoading);
    }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <Toaster richColors position='top-center' />

          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div> */}
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-primaryColor">
                      Fill the Form
                    </Dialog.Title>
                    <div className="mt-2">
                      <form onSubmit={(e)=>handleClick(e)} action="" className='bg-white flex flex-col gap-3'>

                        <div className='flex flex-col text-primaryColor items-start w-full'>
                          <label htmlFor="name">Name</label>
                          <input onChange={(e)=>setName(e.target.value)} className='w-full px-2 py-1.5 bg-secondaryColor outline-none rounded-xl' type="text" id='name' />
                        </div>

                        <div className='flex flex-col text-primaryColor items-start w-full'>
                          <label htmlFor="email">Email</label>
                          <input onChange={(e)=>setEmail(e.target.value)} className='w-full px-2 py-1.5 bg-secondaryColor outline-none rounded-xl' type="text" id='email' />
                        </div>

                        <div className='flex flex-col text-primaryColor items-start w-full'>
                          <label htmlFor="location">Loation</label>
                          <input onChange={(e)=>setLocation(e.target.value)} className='w-full px-2 py-1.5 bg-secondaryColor outline-none rounded-xl' type="text" id='location' />
                        </div>

                        <div className="mt-5 sm:mt-6">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-primaryColor px-3 py-2 text-sm font-semibold text-white shadow-sm"
                            onClick={() => setTimeout(() => {
                              setOpen(false)
                            }, 2000) }
                          >
                           {loading ? 'Loading....' : 'Submit'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
