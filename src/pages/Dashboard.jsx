import React, { useContext, useEffect, useState } from 'react'
import DashBoardNav from '../components/DashBoardNav'
import DashboardBanner from '../components/DashboardBanner'
import { getAllBuisnessProducts, getAllItems, getAllProducts, getIPAddress } from '../api/api'
import { LoginContext } from '../contexts/LoginContext'
import { decryptAES, encryptData } from '../AES/AES'
import {Circles} from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Product from '../components/Product'
import { Toaster, toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import ProductDetails from '../components/ProductDetails'
import { useQuery } from '@tanstack/react-query'

const Dashboard = () => {
  const [loading, setLoading] = useState()
  const [searchValue, setSearchValue] = useState('')
  const {loginAuth, ipAddress, setProducts, products} = useContext(LoginContext)
  const loginResponse = JSON.parse(localStorage.getItem('Afro_Login_Response'))
  const isBusiness = loginResponse?.responseBody.isBusiness
  const dataAuth = JSON.parse(localStorage.getItem('My_Login_Auth'))
  const dataIP = window.localStorage.getItem('ip_address')
  const navigate = useNavigate()
  let queryCall;

  const handleEndpoint = ()=>{
    if (isBusiness){
      queryCall = getAllBuisnessProducts
    }else{
      queryCall = getAllItems
    }
  }

  const fetchData = async () => {
    try {
      let dataSent = { authorization: dataAuth, ip_address: JSON.parse(dataIP) };
      if (searchValue !== '') {
        dataSent.search_word = searchValue;
      }
  
      const encryptedData = encryptData(dataSent, process.env.REACT_APP_AFROMARKETS_SECRET_KEY);
  
      const result = await queryCall(encryptedData);
  
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

  useEffect(()=>{
    handleEndpoint()
  }, [searchValue, refetch])

  useEffect(() => {
      refetch();
      console.log('Refetch triggered');
    
  }, [searchValue, refetch]);

  if(isLoading){
    return <div className='flex justify-center items-center mt-20'>
      <Circles
          type="TailSpin" 
          color="#01974B"
          height={50}
          width={50}
        />
    </div>
  } else if(dataAuth === ''){
    return(
      <div className='mx-auto mt-32 text-center'>
        <p>You have to login first to view this page</p>
        <button onClick={()=>navigate('/login')} className='border py-1 my-3 block w-32 mx-auto bg-primaryColor hover:bg-primaryColorVar text-white'>Login</button>
      </div>
    )
  }else return (
    <div className='font-lato'>
      <Toaster richColors position='top-right' closeButton />
      <DashBoardNav setSearchValue={setSearchValue} />
      {/* <ProductDetails /> */}
      <DashboardBanner />
      <button className='ml-10 p-2 border rounded-lg' onClick={()=>{setSearchValue('Condiments'); refetch()}}>Test</button>
      
      <div className='grid gap-1 grid-cols-2 lg:grid-cols-4 w-[90%] mx-auto '>
        {allProducts?.map((product, index)=>(
          <div key={index} className='cursor-pointer my-6 flex items-center justify-center'>
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
