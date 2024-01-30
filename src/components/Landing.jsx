import enterIcon from "../assets/imgs/SendIcon.png";
import polygon1 from "../assets/imgs/Polygon1.png";
import polygon2 from "../assets/imgs/Polygon2.png";
import polygon4 from "../assets/imgs/Polygon4.png";
import dragIndicator from "../assets/imgs/Dragindicator.png";
import heroRight from "../assets/imgs/heroright.png";
import MainNav from "./MainNav";
import { useEffect, useRef, useState } from "react";
import { registerEmail } from "../api/api";
import Swal from "sweetalert2";

export default function Landing() {
  const [ipAddress, setIpAdrress] = useState();
  const [email, setEmail] = useState();
  const [disableBtn, setDisableBtn] = useState(false);
  const inputRef = useRef();

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

  const handleClick = () => {
    const myData = { email: email, ip_address: ipAddress };
    console.log("data: ", myData);
    if (email) {
      registerEmail(myData);
      Swal.fire({
        title: "Email sent successfully!",
        confirmButtonColor: "#01974B",
        customClass: {
          confirmButton: "no-border",
        },
      });
      setDisableBtn(true);
      inputRef.current.value = "";
    } else {
      Swal.fire({
        title: "Insert your email!",
        confirmButtonColor: "#01974B",
        customClass: {
          confirmButton: "no-border",
        },
      });
    }
  };

  return (
    <main className="h-screen ">
      <div className="absolute top-0 left-0 right-0 bg-none z-50">
        <MainNav />
      </div>

      <div className="w-full h-full grid md:grid-cols-2 relative overflow-hidden ">
        <div className="bg-secondaryColor">
          <div className="flex flex-col items-center text-center gap-8 pt-32 md:pt-56">
            <h1 className="text-primaryColor text-2xl font-semibold px-4 lg:px-0">
              Building Trust and Efficiency in <br /> Locally Produced African
              Products
            </h1>
            <div className="w-[287px] h-[50px] rounded-xl bg-white flex items-center pl-3 relative">
              <input
                ref={inputRef}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email me when it launches"
                className="text-primaryColor w-[80%] placeholder:text-primaryColor placeholder:text-opacity-40 h-[90%] outline-none px-4 bg-[#EBEBEB] "
              />
              <img
                src={enterIcon}
                onClick={handleClick}
                className={`absolute right-4 ${
                  disableBtn
                    ? "pointer-events-none opacity-20"
                    : "cursor-pointer"
                } `}
              />
            </div>
            <img
              src={polygon1}
              className="absolute -left-10 -bottom-40 md:top-[24rem] z-10 h-[300px]"
            />
            <img
              src={polygon2}
              className="absolute -left-6 -bottom-48  md:top-[25.5rem] z-20 h-[300px]"
            />
          </div>
          <div className="flex items-start absolute bottom-4 z-10 md:bottom-14 right-4 md:right-[55%]">
            <img src={dragIndicator} />
            <p className="text-primaryColor text-left">
              Securing funds and ensuring <br /> our merchants deliver as <br />{" "}
              promised
            </p>
          </div>
        </div>
        <div className="relative bg-secondaryColor md:bg-white">
          {/* <Link href='/' className='text-[15px] py-8 text-right pr-12 block text-primaryColor font-semibold'>Contact</Link> */}
          <img
            src={heroRight}
            className="-mt-40 sm:-mt-32 md:mt-20 md:pt-10 mx-auto"
          />
          <img
            src={polygon4}
            className="hidden md:absolute right-10 bottom-0"
          />
        </div>
      </div>
    </main>
  );
}
