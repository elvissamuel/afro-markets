import React, { useContext, useEffect, useState } from 'react'
import DashBoardNav from '../components/DashBoardNav'
import DashboardBanner from '../components/DashboardBanner'
import { getAllItems, getAllProducts, getIPAddress } from '../api/api'
import { LoginContext } from '../contexts/LoginContext'
import { decryptAES, encryptData } from '../AES/AES'
import {Circles} from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Product from '../components/Product'
import { Toaster, toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import ProductDetails from '../components/ProductDetails'
import { useQuery } from '@tanstack/react-query'
import HomeNav from '../components/HomeNav'
import HomeProducts from '../components/HomeProducts'

const Home = () => {
  const [loading, setLoading] = useState()
  const [searchValue, setSearchValue] = useState()
  const {loginAuth, ipAddress, setProducts, products} = useContext(LoginContext)
  const dataAuth = localStorage.getItem('My_Login_Auth')
  const dataIP = window.localStorage.getItem('ip_address')
  const navigate = useNavigate()

  const myIP = window.localStorage.getItem('ip_address')
  const mydata = {ip_address: JSON.parse(dataIP)}
  const encryptedData = encryptData(mydata, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)

  const fetchData = async () => {
    try {
      let dataSent = {ip_address: JSON.parse(dataIP) };
      if (searchValue !== '') {
        dataSent.search_word = searchValue;
      }
  
      const encryptedData = encryptData(dataSent, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);
  
      const result = await getAllItems(encryptedData);
  
      return result;
    } catch (error) {
      console.error('Error in fetchData:', error);
      throw error; 
    }
  };

  const {data: allProducts, isLoading, refetch, isError} = useQuery({
    queryKey: ['All_Afro_Products'],
    queryFn: fetchData,
    onSuccess: (allProducts) => {
      setProducts(allProducts)
      console.log('Onsuccess products: ', products)
    }, 
    onError: (error) => {
      console.error('Error during refetch:', error);
    },
  })

  useEffect(() => {
      refetch();
      console.log('Refetch triggered');
    
  }, [searchValue, refetch]);
  if(allProducts){
    setProducts(allProducts)
    console.log('These are all the products: ', allProducts)
  }
  if(isLoading){
    return <div className='flex justify-center items-center mt-20'>
      <Circles
          type="TailSpin" 
          color="#01974B"
          height={50}
          width={50}
        />
    </div>
  } else return (
    <div className='font-lato'>
      <HomeNav setSearchValue={setSearchValue} />
      {/* <ProductDetails /> */}
      <DashboardBanner />
      <Toaster position="top-center" />
      <div className='grid gap-1 md:grid-cols-2 lg:grid-cols-4 w-[90%] mx-auto '>
        {allProducts?.map((product, index)=>(
          <div key={index} className='cursor-pointer my-6 flex items-center justify-center'>
            <HomeProducts product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
