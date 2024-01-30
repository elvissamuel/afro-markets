import React, { useContext, useEffect, useRef, useState } from 'react'
import logo from '../assets/imgs/afrologo.png'
import { handleEmailVerification, registerBusiness } from '../api/api';
import { LoginContext } from '../contexts/LoginContext';
import { useLocation, useNavigate } from 'react-router-dom'
import { encryptData } from '../AES/AES';
import { Toaster, toast } from 'sonner'


const VerifyEmail = () => {
    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();
    const inputRef4 = useRef();
    const inputRef5 = useRef();
    const inputRef6 = useRef();

    const [input1, setInput1] = useState()
    const [input2, setInput2] = useState()
    const [input3, setInput3] = useState()
    const [input4, setInput4] = useState()
    const [input5, setInput5] = useState('')
    const [input6, setInput6] = useState('')
    const [authSuccessful, setAuthSuccessful] = useState(false)
    const [authUnsuccessful, setAuthUnsuccessful] = useState(false)
    const [userEmail, setUserEmail] = useState('elvissamuel8@gmail.com')
    const navigate = useNavigate()
    // const {userEmail} = useContext(LoginContext)
    const [loading, setLoading] = useState(false)
    const afroUserEmail = window.localStorage.getItem('Afro_Email')
    const location = useLocation()


    const handleSubmit = (e)=>{
        e.preventDefault() 
        const token = [input1, input2, input3, input4, input5, input6]
        const verifyCode = token.join('')
        const data = {email: afroUserEmail, token: verifyCode}
        const myData = encryptData(data, process.env.REACT_APP_AFROMARKETS_SECRET_KEY)
        console.log('token: ', token.join(''), 'email: ', userEmail)
        handleEmailVerification(myData, setLoading, navigate, toast, location)
        setTimeout(() => {
          setInput1('')
          setInput2('')
          setInput3('')
          setInput4('')
          setInput5('')
        }, 1000);
    }


    const handleInput1 = (e)=>{
        setInput1(e.target.value);
        if(e.target.value!==0) { 
            inputRef2.current.focus()
        }else{
            inputRef1.current.focus()
        } 
}
const handleInput2 = (e)=>{
    setInput2(e.target.value);
    if(e.target.value!==0) { 
        inputRef3.current.focus()
    }else{
        inputRef2.current.focus()
    } 
}
const handleInput3 = (e)=>{
    setInput3(e.target.value);
    if(e.target.value!==0) { 
        inputRef4.current.focus()
    }else{
        inputRef3.current.focus()
    } 
}
const handleInput4 = (e)=>{
    setInput4(e.target.value);
    if(e.target.value!==0) { 
        inputRef5.current.focus()
    }else{
        inputRef4.current.focus()
    } 
}
const handleInput5 = (e)=>{
    setInput5(e.target.value);
    // if(e.target.value!==0) { 
    //     inputRef6.current.focus()
    // }else{
    //     inputRef5.current.focus()
    // } 
}
// const handleInput6 = (e)=>{
//     setInput6(e.target.value);
// }
  return (
    <div className=" flex bg-gradient-to-r from-secondaryColor via-white to-white min-h-full h-screen flex-1 flex-col justify-center px-6 py-2 lg:px-8">
      <Toaster richColors position='top-right' />
      <div className='absolute top-6 left-4'>
        <button className="flex items-center gap-1" onClick={()=>navigate('/signup')}>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clip-rule="evenodd" />
          </svg>
          </span>
          <p>Go Back</p>
        </button>
      </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm -mt-32 ">
            <img
              className="mx-auto h-14 w-auto"
              src={logo}
              alt="Your Company"
            />
           
          </div>
      <div className="flex flex-col justify-center items-center mx-auto w-full max-w-sm lg:w-96 ">
       <div>
         
         <h2 className="mt-8 text-xl font-bold leading-9 tracking-tight text-gray-900">
           Continue to your Afromarkets account
         </h2>
         <p className="mt-2 text-sm leading-6 text-gray-500">
           Enter the 5 digit code sent to you at {' '}
           <a href="#" className="font-semibold text-[#0069FF] hover:text-[#006affc8]">
              {afroUserEmail}
           </a>
         </p>
       </div>

       <div className="mt-10">
         <h2 className='text-slate-800 font-bold mb-2'> Your 5-digit number</h2>

         <div className='flex gap-2 text-primaryColor'>
             <input ref={inputRef1} maxLength={1} value={input1} onInput={(e)=>handleInput1(e)} type="text" className=' bg-secondaryColor px-2 w-12 h-10' />
             <input ref={inputRef2} maxLength={1} value={input2} onInput={(e)=>handleInput2(e)}  type="text" className=' px-2 w-12 bg-secondaryColor' />
             <input ref={inputRef3} maxLength={1} value={input3} onInput={(e)=>handleInput3(e)}  type="text" className=' px-2 w-12 bg-secondaryColor' />
             <input ref={inputRef4} maxLength={1} value={input4} onInput={(e)=>handleInput4(e)}  type="text" className=' px-2 w-12 bg-secondaryColor' />
             <input ref={inputRef5} maxLength={1} value={input5} onInput={(e)=>handleInput5(e)} type="text" className=' px-2 w-12 bg-secondaryColor' />
             {/* <input ref={inputRef6} maxLength={1} value={input6} onInput={(e)=>handleInput6(e)} type="text" className=' px-2 w-12 bg-secondaryColor' /> */}
         </div>

         {/* <Link to='/continuetodashboard'> */}
             <button onClick={(e)=>handleSubmit(e)} disabled={input5 === ''} className={`border px-32 rounded-xl py-2 my-6 block ${input5 === '' ? 'bg-gray-300 text-gray-100' : loading ? 'bg-gray-400 text-gray-700' : 'bg-primaryColor text-white'}`}>
                {loading ? 'Loading...' : 'Continue'}
             </button>
             {/* <Link to='/signup' className='text-sm text-center text-gray-600'>Go back</Link> */}
         {/* </Link> */}
         {/* <p className='text-base text-center text-gray-600'>Resend code: 0:12</p> */}

       </div>
     </div>
    </div>
  )
}

export default VerifyEmail
