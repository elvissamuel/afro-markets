import React, { useContext, useState } from 'react'
import proimg from '../assets/imgs/producting.png'
import StarComponent from './StarComponent'
import { Link } from 'react-router-dom'
import { LoginContext } from '../contexts/LoginContext'
import { addToCart, createCart } from '../api/api'
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { encryptData } from '../AES/AES'
import { Toaster, toast } from 'sonner'

const HomeProducts = ({product}) => {
  const [loading, setLoading] = useState(false)
  const {count, setCount, setButtonClick, setProducts} = useContext(LoginContext)
  // const cart = JSON.parse(localStorage.getItem('Afro_Cart'))
  const loginResponse = JSON.parse(localStorage.getItem('Afro_Login_Response'))
  const dataAuth = loginResponse?.responseBody.authorization
  const dataIP = JSON.stringify(window.localStorage.getItem('ip_address'))
  const queryClient = useQueryClient()

  return (
      <div key={product.productid} className='w-full md:w-[200px]'>
        <Link to={`/product/${product.productId}`}>
          <div className='h-[220px] md:h-[180px] w-full relative my-2'>
            <img className='object-contain w-full h-full border rounded-lg p-3 shadow-md' src={product.imageUrl} alt="" />
            <span className='absolute top-2 right-1'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-red-500">
                <path d="M2 6.342a3.375 3.375 0 0 1 6-2.088 3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.437 14.437 0 0 1-2.676 1.61c-.02.01-.038.017-.05.022l-.014.006-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003-.015-.006a5.528 5.528 0 0 1-.232-.107 14.395 14.395 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38L2 6.342Z" />
              </svg>
            </span>
          </div>
        </Link>
        <div className='px-1 flex flex-col gap-1'>
          <div className='flex items-center font-semibold justify-between'>
              <p className='text-sm'>{product.name}</p>
              <span className='text-xs'>${product.productPrice}</span>
          </div>
          <p className='text-xs'>{product.category}</p>
          <StarComponent numberOfColored={5} />
          <button onClick={()=>toast.warning("Can't Add to Cart",{description: 'Sign in first before you add to cart'}, {duration: 2000,})} className='px-3 shadow-md hover:text-primaryColor py-1 text-sm border w-[107px] hover:bg-secondaryColor rounded-xl'>Add to Cart</button>
        </div>
      </div>
  )
}

export default HomeProducts
