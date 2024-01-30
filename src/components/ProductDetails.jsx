import React, { useContext, useEffect, useState } from 'react'
import prodimg from '../assets/imgs/productinfo.png'
import StarComponent from './StarComponent'
import ButtonComponent from './ButtonComponent'
import DashBoardNav from './DashBoardNav'
import Counter from './Counter'
import { LoginContext } from '../contexts/LoginContext'
import { addToCart, createCart, getAllOrders, getCategories } from '../api/api'
import { Toaster, toast } from 'sonner'
import { encryptData } from '../AES/AES'
import { useQueryClient, useMutation } from '@tanstack/react-query';
import HomeNav from './HomeNav'


const ProductDetails = ({product}) => {
    const imgs = [1,2,3,4]
    const {count, setCount, setButtonClick, setProducts} = useContext(LoginContext)
    const [loading, setLoading] = useState(false)
    // const [cart, setCart] = useState()
    const loginResponse = JSON.parse(localStorage.getItem('Afro_Login_Response'))
    // const dataAuth = JSON.parse(window.localStorage.getItem('My_Login_Auth'))
    const dataAuth = loginResponse?.responseBody.authorization
    // const cartReference = JSON.parse(localStorage.getItem('Afro_Cart_Reference'))
    const cart = JSON.parse(localStorage.getItem('Afro_Cart'))
    const dataIP = JSON.stringify(window.localStorage.getItem('ip_address'))
    const queryClient = useQueryClient()

    useEffect(()=>{
        const allProducts = JSON.parse(localStorage.getItem('My_Afro_Products'))
        console.log('This is all product: ', allProducts)
        setProducts(allProducts)
    }, [])

    // useEffect(()=>{
    //     if(loginResponse){
    //         setCart(loginResponse.responseBody.cartResponse)
    //     }
    // }, [loginResponse])

    const getCart = () =>{
        const loginResponse = JSON.parse(localStorage.getItem('Afro_Login_Response'))
        const dataIP = localStorage.getItem('ip_address')
        const dataAuth = loginResponse?.responseBody.authorization
        const cartRef = JSON.parse(localStorage.getItem('Afro_Cart_Reference'))
        const mydata = {authorization: dataAuth, ip_address: JSON.parse(dataIP), cart_reference: cartRef}
        const encryptedData = encryptData(mydata, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
        console.log('ddd: ', mydata)
        getAllOrders(encryptedData)
    }

    const handleAddProduct = ()=>{
        if(cart) {
            const isEmpty = Object.keys(cart).length === 0;
            if (isEmpty){
                const data = {authorization: dataAuth, ip_address: dataIP, product_id: product.productId, quantity: count }
                console.log('Sent data: ', data)
                const encryptedInfo = encryptData(data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
                createCart(encryptedInfo, setLoading, toast, setCount)
            } else{
                const cartRef = JSON.parse(localStorage.getItem('Afro_Cart_Reference'))
                const data = {authorization: dataAuth, ip_address: dataIP, cart_reference: cartRef, product_id: product.productId, quantity: count}
                console.log('Sent data: ', data)
                const encryptedInfo = encryptData(data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
                addToCart(encryptedInfo, setLoading, toast, setCount)
            }
        }

    }

    const {mutate: addProduct} = useMutation({
        mutationFn: handleAddProduct,
        onSuccess: queryClient.invalidateQueries(['All_Afro_Orders'])
    })

    const currentPath = window.location.pathname
    const pathSegments = currentPath.split('/')
    const isDashboard = pathSegments[1] === 'dashboard' ? true : false

    useEffect(()=>{
        console.log('This is param path: ', pathSegments)
    }, [isDashboard])


  return (
    <>
    {isDashboard ? <DashBoardNav /> : <HomeNav />}
        <Toaster richColors position='top-center' />
        <div key={product.productId} className='w-full xl:w-[85%] mx-auto my-6'>
        <div className='flex flex-col lg:flex-row lg:justify-around gap-8 lg:items-center px-8'>
            <div className='w-full  xl:w-1/2'>
                <div className='md:w-[90%] md:h-[90%] mx-auto xl:w-[450px] xl:h-[450px] shadow-md p-24'>
                    <img className='w-full h-full' src={product.imageUrl} alt="" />
                </div>
                
            </div>
            <div className='py-10 w-full xl:w-1/2'>
                <div className='bg-secondaryColor text-primaryColor rounded-xl w-[127px] h-[35px] flex justify-center items-center font-semibold mb-3'>Afro Markets</div>
                <p className='text-primaryColor text-xl font-bold'>{product.name}</p>
                <p className='font-extrabold'>${product.productPrice}</p>
                <div className='flex items-center gap-1'>
                    <StarComponent numberOfColored={2} numberOfUncolored={3} />
                    <span className='text-xs text-primaryColor font-semibold'>(100 rating)</span>
                </div>
                <div className='shadow-md rounded-xl p-3 my-4 '>
                    <h2 className='font-semibold text-primaryColor'>Description({product.category})</h2>
                    <span className='text-sm'>{product.description}</span>
                </div>
                <div className='flex items-center my-2 justify-between gap-2 w-[415px] pr-6'>
                    {isDashboard ?
                     <button onClick={()=>{addProduct(); setButtonClick(prev => !prev)}} className='w-[251px] bg-secondaryColor font-semibold text-primaryColor rounded-lg h-[40px]'>Add to Cart</button> 
                    :
                     <button onClick={()=>{toast.warning("Can't Add to Cart", {description: 'You have to sign in before adding to cart'}); setButtonClick(prev => !prev)}} className='w-[251px] bg-secondaryColor font-semibold text-primaryColor rounded-lg h-[40px]'>Add to Cart</button>
                     }
                    <Counter />
                </div>
                <ButtonComponent handleClick={getCart} title='Add to wishlist' />
            </div>
        </div>

        <div className='w-[95%] mx-auto shadow-lg rounded-xl p-8 '>
            <h2 className='text-primaryColor font-bold mb-3'>Description</h2>
            <p className='text-sm '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis voluptates doloribus voluptatem unde iusto qui. Ea quos repudiandae consectetur asperiores dolorem temporibus tenetur obcaecati esse? <br /> Rem quos eius magni ut corrupti atque, modi sint rerum animi dolorum dolor inventore accusamus molestiae, sequi illo? Tempora quibusdam quaerat modi porro aut necessitatibus?</p>
        </div>

        <div className='my-16 w-[95%] mx-auto'>
            <h2 className='text-primaryColor text-lg font-semibold mb-6'>Customer Review</h2>

            <div className='grid gap-4 lg:grid-cols-2 '>
                <div className='col-span-1 flex flex-col gap-6'>
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-4xl font-bold'>0</p>
                        <StarComponent numberOfUncolored={5} />
                        <p className='text-sm text-primaryColor'>No reviews yet</p>
                    </div>
                    <div className='pl-4 text-sm font-semibold text-gray-600'>
                        <div className='flex gap-1 items-center'>
                            <StarComponent numberOfColored={5} />
                            <div className='h-[6px] w-[240px] bg-gray-400 rounded-lg' />
                            <span>0</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <StarComponent numberOfColored={4} numberOfUncolored={1} />
                            <div className='h-[6px] w-[240px] bg-gray-400 rounded-lg' />
                            <span>0</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <StarComponent numberOfColored={3} numberOfUncolored={2} />
                            <div className='h-[6px] w-[240px] bg-gray-400 rounded-lg' />
                            <span>0</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <StarComponent numberOfColored={2} numberOfUncolored={3} />
                            <div className='h-[6px] w-[240px] bg-gray-400 rounded-lg' />
                            <span>0</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <StarComponent numberOfColored={1} numberOfUncolored={4} />
                            <div className='h-[6px] w-[240px] bg-gray-400 rounded-lg' />
                            <span>0</span>
                        </div>
                    </div>
                </div>
                <div className='col-span-1 flex flex-col gap-2 text-primaryColor'>
                        <h2 className='uppercase text-primaryColor font-bold'>Add a review</h2>
                        <p className='text-sm'>Your email address will not be published, required fields are marked <span className='text-red-600 font-bold'>*</span></p>
                        <div className='flex items-center gap-1'>
                            <p className='text-sm'>Your Rating<span className='text-red-600 font-bold'>*</span>: </p>
                            <StarComponent numberOfUncolored={5} />
                        </div>
                        <form className='flex flex-col gap-4' action="">
                            <div className='flex flex-col text-primaryColor'>
                                <label htmlFor="review" className='text-sm font-semibold'>Your Review <span className='text-red-600 font-bold'>*</span></label>
                                <textarea name="" id="review" cols="30" rows="10" className='h-[178px] outline-none boder border-[1px] rounded-lg border-primaryColor shadow-md p-3' />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="name" className='text-sm font-semibold text-primaryColor'>Name<span className='text-red-600 font-bold'>*</span></label>
                                <input type="text" id='name' className='border-primaryColor outline-none border-[1px] rounded-lg px-3 py-1.5' />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="email" className='text-sm font-semibold text-primaryColor'>Email<span className='text-red-600 font-bold'>*</span></label>
                                <input type="text" id='email' className='border-primaryColor outline-none border-[1px] rounded-lg px-3 py-1.5' />
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type="checkbox" className='border-[1px] outline-none border-primaryColor' name="" id="" />
                                <p className='text-sm font-semibold text-primaryColor'>Save my name, email and website in this browser for next time</p>
                            </div>
                            <button className='bg-primaryColor text-white text-sm font-semibold py-2 px-4 rounded-md' type="submit">Submit</button>
                        </form>
                </div>
                <div>
                    <p className='text-primaryColor font-semibold'>0 Reviews</p>
                    <div className='border border-primaryColor border-opacity-40 shadow-lg rounded-lg p-4 my-8'>
                        <div className='flex justify-between items-center text-sm font-semibold'>
                            <p>[Reviewer name]</p>
                            <p>[Date]</p>
                        </div>
                        <p className='text-sm font-semibold'>[Star rating]</p>

                        <span className='my-4 text-sm block'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quas similique saepe, illo eaque asperiores repellendus possimus minima autem accusantium quibusdam repellat velit natus! Tenetur assumenda recusandae facilis eos sunt!</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default ProductDetails
