import React, { useContext, useState } from "react";
import logo from "../assets/imgs/afrologo.png";
import bg1 from "../assets/imgs/rafiki.png";
import bg2 from "../assets/imgs/rafiki2.png"
import rect1 from "../assets/imgs/Rectangle26.png"
import rect2 from "../assets/imgs/Rectangle27.png"
import SellerForm from "../components/SellerForm";
import BuyerForm from "../components/BuyerForm";
import ImageSlider from "../components/ImageSlider";
import Swal from 'sweetalert2';
import { LoginContext } from "../contexts/LoginContext";



const Signup = () => {
  const [toBuy, setToBuy] = useState()
  
  return (
    <div className="grid lg:grid-cols-2 h-screen">
      <div className="px-16 py-2 hidden lg:block">
          <div className="flex flex-col items-center gap-12 pt-8 border px-20 border-opacity-50 border-secondaryColor pb-12 rounded-lg">
            <div className="h-[92px] w-[188px]">
              <img src={logo} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="w-full">
              {/* <ImageSlider /> */}
              <img src={bg1} alt="" />
            </div>
            <p className="text-primaryColor">Building trust and efficiency in locally produced african products</p>
            <div className="flex items-center gap-1">
              
                <img src={rect1} alt="" />
                <img src={rect2} alt="" />
            </div>
          </div>
      </div>

      <div className="text-primaryColor py-8 px-4 overflow-x-hidden md:px-14">
        <h2 className="text-center font-semibold">
          Unveiling a World of Possibilities: Your Ultimate Shopping Destination
          Awaits
        </h2>
        <p className="text-center">
          Welcome to AfroMarketSquare - where endless options meets effortless
          shopping. Dive in and discover your perfect pick today
        </p>

        <div className="w-[350px] md:w-[427px] border p-2 grid grid-cols-2 rounded-lg mx-auto my-4 border-opacity-50 border-secondaryColor">
          <button onClick={()=>setToBuy(false)} className={`border  p-2 rounded-lg ${!toBuy ? 'bg-secondaryColor text-primaryColor' : 'text-secondaryColor'} font-semibold `}>I want to sell</button>
          <button onClick={()=>setToBuy(true)}  className={`border p-2 rounded-lg ${toBuy ? 'bg-secondaryColor text-primaryColor' :' text-secondaryColor'} font-semibold`}>I want to buy</button>
        </div>
        {!toBuy ? <SellerForm /> : <BuyerForm />}
      </div>
    </div>
  );
};

export default Signup;
