import logo from '../assets/imgs/afrologo.png'
import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form'
import { getIPAddress, handleLogin, handlePasswordReset } from '../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { encryptData } from '../AES/AES';
import { LoginContext } from '../contexts/LoginContext';
import { Toaster, toast } from 'sonner'

export default function ResetPassword() {
  const [loading, setLoading] = useState()
  const {register, handleSubmit, formState: {errors}, reset} = useForm()
  const navigate = useNavigate()
  const {setIpAddress, setLoginAuth, setIsBusiness, setKycVerified, loginAuth} = useContext(LoginContext)

  // useEffect(()=>{
  //   getIPAddress(setIpAddress)
  // }, [])

  const onSubmit = (data) => {
    const myData = {email: window.localStorage.getItem('Afro_Email'), password: data.password}
    const encryptedInfo = encryptData(myData, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
    console.log('encry: ',encryptedInfo)
    handlePasswordReset(encryptedInfo, setLoading, reset, navigate, toast)  
  }

    
    return (
      <>
        <div className="flex bg-gradient-to-r from-secondaryColor via-white to-white min-h-full h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <Toaster richColors position='top-right' />
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-14 w-auto"
              src={logo}
              alt="Your Company"
            />
           
          </div>
          
  
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md p-8 bg-viaColor">
            <h2 className=" text-center text-xl font-bold leading-9 tracking-tight text-primaryColor">
                New Password
            </h2>
            <p className='mb-2 text-sm text-primaryColor'>Please enter the new password</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST">
            <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-primaryColor">
                    New Password
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    {...register('password', {required:true})}
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full bg-secondaryColor rounded-md border-0 py-1.5 px-3 text-primaryColor shadow-sm placeholder:text-primaryColor sm:text-sm sm:leading-6"
                  />
                  {errors.password && <span className='text-sm'>This field is required</span>}
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-primaryColor">
                    Confirm Password
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    {...register('confirmpassword', {
                        validate: (value) => value === document.getElementById('password').value || 'The passwords do not match'
                      }, {required:true}, )}
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    required
                    className="block w-full bg-secondaryColor rounded-md border-0 py-1.5 px-3 text-primaryColor shadow-sm placeholder:text-primaryColor sm:text-sm sm:leading-6"
                  />
                  {errors.confirmpassword && <span className='text-sm text-primaryColor'>This field is required</span>}
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className={`${loading ? 'bg-gray-500' : 'bg-primaryColor'} flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-600`}
                >
                  {loading ? 'Loading...' : 'Continue'}
                </button>
              </div>
            </form>
  
          </div>
        </div>
      </>
    )
  }
  