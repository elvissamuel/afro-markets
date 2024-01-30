import React, { useContext, useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Popover,  } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import logo from "../assets/imgs/afrologo.png";
import indomieimg from '../assets/imgs/indomie.png'
import garriimg from '../assets/imgs/garri.png'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { LoginContext } from '../contexts/LoginContext'
import ShoppingCart from './ShoppingCart'
import { encryptData } from '../AES/AES'
import { getAllOrders, getCategories } from '../api/api'
import { useQuery, useMutation } from '@tanstack/react-query'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DashBoardNav = ({setSearchValue}) => {
  const navigate = useNavigate()
  const [cartItemNo, setItemNo] = useState()
  const [cart, setCart] = useState({})
  
  const [logout, setLogout] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  const [noItem, setNoItem] = useState([])
  const [categories, setCategories] = useState([])
  const {buttonClick} = useContext(LoginContext)
  const loginResponse = JSON.parse(localStorage.getItem('Afro_Login_Response'))
  const afroUsername =  loginResponse.responseBody.fullName
  const afroUserEmail = loginResponse.responseBody.email

  useEffect(()=>{
    const cartStorage = localStorage.getItem('Afro_Cart')

      if (cartStorage === 'undefined' || cartStorage === null ){
        setCart({})
      } else{
        setCart(JSON.parse(cartStorage))
      }
  }, [])
  

  const isNotEmpty = Object.keys(cart).length !== 0;


  // useEffect(()=>{
  //   const items = JSON.parse(localStorage.getItem('Afro_Item_No'))
  //   setItemNo(items.length)
  // }, [ buttonClick])

  // const cartReference = loginResponse.responseBody.cartResponse.orders.length
  // const cartReference = JSON.parse(localStorage.getItem('Afro_Cart_Reference'))
  // const cartItemNo = cartReference.responseBody.numberOfItems
  const isBusiness = loginResponse?.responseBody.isBusiness
  const solutions = [
    { name: 'Yellow Garri', description: '150 Items Available', href: '#', icon: garriimg },
    {
      name: 'Chicken Noodles',
      description: '150 Items Available',
      href: '#',
      icon: indomieimg,
    },
    {
      name: 'Garri Ijebu',
      description: '150 Items Available',
      href: '#',
      icon: garriimg,
    },
    { name: 'Gino Paste', description: 'Build strategic funnels that will convert', href: '#', icon: garriimg },
    { name: 'Security', description: "150 Items Available", href: '#', icon: indomieimg },
    {
      name: 'Dabgote Spaghetti',
      description: '150 Items Available',
      href: '#',
      icon: indomieimg,
    },
  ]
    const cartOrders = isNotEmpty ? JSON.parse(localStorage.getItem('Afro_Cart_Orders')) : []

    // const dataAuth = JSON.parse(window.localStorage.getItem('My_Login_Auth'))
    const dataAuth = loginResponse?.responseBody.authorization
    const userAuth = localStorage.getItem('My_Login_Auth')
    const cartRef = JSON.parse(localStorage.getItem('Afro_Cart_Reference'))
    const dataIP = window.localStorage.getItem('ip_address')
    const mydata = {authorization: dataAuth, ip_address: JSON.parse(dataIP), cart_reference: cartRef}
    const encryptedData = encryptData(mydata, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
  
    const {data: allOrder, isLoading, isSuccess, isError} = useQuery({
      queryKey: ['All_Afro_Orders'],
      queryFn: async ()=>getAllOrders(encryptedData)
    })

    const itemLength = isSuccess && allOrder.length

    useEffect(() => {
      if (isSuccess) {
        console.log('hhh: ', allOrder.length);
        setNoItem(allOrder);
      }else{
        setNoItem([])
      }
    }, [isSuccess,]);

    useEffect(()=>{
      getCategories(setCategories)
    }, [])


  const handleLogout = () => {
    setLogout(true)
    window.localStorage.setItem('My_Login_Auth', '')
    setTimeout(() => {
      toast.loading("You've logged out successfully")
    }, 500);
    setTimeout(() => {
      navigate('/')
    }, 1500);
  }
  return (
    <Disclosure as="nav" className="sticky top-0 z-20 bg-white border-b-8 border-secondaryColor">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 py-2 sm:px-4 lg:px-8">
            {logout && <Toaster richColors position='top-right' closeButton />}
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  <Link to='/'>
                    <img
                      className="h-10 w-auto"
                      src={logo}
                      alt="Your Company"
                    />
                  </Link>
                </div>
                <div className="hidden lg:ml-6 lg:block">
                  <div className="flex space-x-4">
                    <Popover className="relative border-none px-1 py-2 text-sm font-medium text-white">
                      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold border-none leading-6 text-gray-500">
                        <span className='text-sm font-bold text-primaryColor hover:text-primaryColorVar'>Categories</span>
                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute -left-10 z-10 mt-5 flex w-screen max-w-max  px-4">
                          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl">
                            <div className="grid grid-cols-1 gap-x-2 gap-y-1 p-4 lg:grid-cols-2">
                              {categories && categories.map((item) => (
                                <div key={item.name} onClick={()=>{setSearchValue(item.name); console.log('Triggered: ', item.name)}} className="group relative cursor-pointer flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                    {/* <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" /> */}
                                    <img src={item.icon} alt="" />
                                  </div>
                                  <div>
                                    <a href={item.href} className="font-semibold text-gray-900">
                                      {item.name}
                                      <span className="absolute inset-0" />
                                    </a>
                                    {/* <p className="mt-1 text-gray-600">{item.description}</p> */}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                    <a
                      href="#"
                      className="rounded-md px-3 py-2 text-sm font-bold text-primaryColor hover:bg-secondaryColorVar hover:text-primaryColorVar"
                    >
                      What's New
                    </a>
                    <a
                      href="#"
                      className="rounded-md px-3 py-2 text-sm font-bold text-primaryColor hover:bg-secondaryColorVar hover:text-primaryColorVar"
                    >
                      Orders
                    </a>
                    
                  </div>
                </div>
              </div>
              <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end z-40">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="h-5 w-5 text-primaryColor" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border-0 bg-secondaryColor py-1.5 pl-10 pr-3 text-primaryColor placeholder:text-primaryColor focus:bg-secondaryColor focus:text-primaryColor focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Search Product"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative bg-primaryColor inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block bg-primaryColor h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block bg-primaryColor h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:block">
                <div className="flex items-center gap-2">
                  <button
                    onClick={()=>setOpenCart(prev => !prev)}
                    type="button"
                    className="z-40 relative flex-shrink-0 rounded-full p-1 text-primaryColor font-semibold hover:text-gray-700"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View cart</span>
                    {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                    {!isBusiness ? <p className='flex items-center gap-1 flex-row-reverse'> 
                        {noItem.length !== 0 && <div className='text-[11px] font-semibold absolute -left-2 -top-2 bg-primaryColor text-secondaryColor h-5 w-5 text-center rounded-[50%] flex justify-center items-center'>{allOrder.length}</div>}
                        <span className='text-sm font-semibold'>Cart</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 font-semibold">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </p> : null}
                    {openCart && <ShoppingCart orders={cartOrders} />}

                  </button>

                  {/* Profile dropdown */}
                  {userAuth ? <Menu as="div" className="relative ml-4 flex-shrink-0 z-40">
                    <div className=''>
                      <Menu.Button className="relative flex items-center gap-1 rounded-full text-sm text-primaryColor focus:outline-none">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>
                        </span>
                        <span className='text-xs font-semibold'>{afroUsername}</span>

                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <div className='flex items-center gap-1 px-3'>
                              <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clip-rule="evenodd" />
                              </svg>
                              </span>
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm font-semibold text-primaryColor'
                                )}
                              >
                                My Account
                              </a>
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <div className='flex items-center gap-1 px-3'>
                              <span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                              </svg>

                              </span>
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm font-semibold text-primaryColor'
                                )}
                              >
                                Order
                              </a>
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <div className='flex items-center gap-1 px-3'>
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                              </svg>
                              </span>
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm font-semibold text-primaryColor'
                                )}
                              >
                                Saved Item
                              </a>
                            </div>
                          )}
                        </Menu.Item>
                        
                        {isBusiness && <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={()=>navigate('/addproduct')}
                              href="#"
                              className={
                                ' px-4 py-1 mb-1 hover:bg-secondaryColor text-sm flex items-center text-primaryColor border border-primaryColor text-center mx-auto w-[90%] rounded-lg'
                              }
                            >
                              <span className='mr-4'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-primaryColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                              </span>
                              <span>Add Product</span>
                            </button>
                          )}
                        </Menu.Item>}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={()=>handleLogout()}
                              href="#"
                              className={classNames(
                                active ? 'bg-primaryColorVar' : 'bg-primaryColor',
                                'block px-4 py-2 text-sm text-white text-center mx-auto w-[90%] rounded-lg'
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu> : 
                  <div className='text-primaryColor text-sm p-1 font-semibold flex-shrink-0 '><Link to={'/signup'}><button className='rounded px-2 py-1 bg-secondaryColor'>Sign up</button></Link></div>}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-white"
              >
                <Popover className="relative border-none text-sm font-medium text-white">
                      <Popover.Button className="inline-flex items-center gap-x-1 font-semibold border-none text-gray-500">
                        <span className='text-base text-primaryColor font-medium'>Categories</span>
                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute -left-10 z-10 mt-5 flex w-screen max-w-max  px-4">
                          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl">
                            <div className="grid grid-cols-1 gap-x-2 gap-y-1 p-4 lg:grid-cols-2">
                              {solutions.map((item) => (
                                <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                    
                                    <img src={item.icon} alt="" />
                                  </div>
                                  <div>
                                    <a href={item.href} className="font-semibold text-gray-900">
                                      {item.name}
                                      <span className="absolute inset-0" />
                                    </a>
                                    <p className="mt-1 text-gray-600">{item.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-primaryColor hover:bg-primaryColorVar hover:text-white"
              >
                Whats New
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-primaryColor hover:bg-primaryColorVar hover:text-white"
              >
                Orders
              </Disclosure.Button>
              
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  
                  <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-8 h-8 text-primaryColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clip-rule="evenodd" />
                  </svg>

                  </span>
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-primaryColor">{afroUsername}</div>
                  <div className="text-sm font-medium text-primaryColor">{afroUserEmail}</div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View cart</span>
                  {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-primaryColor hover:text-primaryColorVar">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    </span>
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-primaryColorVar hover:text-white"
                >
                  My Account
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-primaryColorVar hover:text-white"
                >
                  Orders
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-primaryColorVar hover:text-white"
                >
                  Saved Items
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-primaryColorVar hover:text-white"
                  onClick={()=>handleLogout()}
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default DashBoardNav
