import React, { useEffect, useState } from 'react'
import afrologo from '../assets/imgs/afrologo.png'
import herobg from '../assets/imgs/hero-bg.png'
import LandingPageForm from './LandingPageeForm'

const LandingPage = () => {
  const [displayForm, setDisplayForm] = useState(false)
  const [ipAddress, setIpAdrress] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        const myIPAddress = data.ip;
        setIpAdrress(myIPAddress);
      })
      .catch((error) => {
        console.error("Error fetching IP:", error);
      });
  }, []);

  return (
    <div className='grid lg:grid-cols-2 bg-gradient-to-r from-secondaryColor via-white to-white h-screen lg:overflow-hidden'>
      <div className='pt-6 h-full border-r'>
          <nav className='w-full text-right'>
            <p className='text-primaryColor font-semibold px-4 text-lg cursor-pointer'>Contact</p>
          </nav>
        <div className='mx-auto  flex flex-col items-center h-full pt-32'>
          
          <div className='flex flex-col items-center text-center gap-5'>
            <img className='w-[211px] h-[100px]' src={afrologo} alt="afro-logo" />
            <h2 className='text-primaryColor text-5xl font-semibold'>Be First in Line!</h2>
            <p className='text-primaryColor'>Join our exclusive waiting list and stay informed for the Grand Launch</p>
            <button onClick={()=>setOpen((prev)=>!prev)} className='bg-primaryColor text-white py-3 w-44 rounded-xl'>Join now</button>
          </div>
        </div>
      </div>

      <div className=''>
        <div className='w-full h-screen'>
          <img src={herobg} className='object-fill h-full w-full' alt="" />
        </div>
      </div>

      {open && <LandingPageForm ipAddress={ipAddress} setOpen={setOpen} open={open} />}
    </div>
  )
}

export default LandingPage
