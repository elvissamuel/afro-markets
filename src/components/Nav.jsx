import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/imgs/afrologo.png";

const Nav = () => {
  return (
    <main className="">
      <div className="flex items-center justify-around py-4">
        <div>
          <Image src={logo} width={106} height={52} alt="afromarket logo " />
        </div>

        <div className="text-[15px] flex justify-evenly h-full w-2/3 text-primaryColor font-semibold">
          <Link href="/">How to</Link>
          <Link href="/">Products</Link>
          <Link href="/">Pricing</Link>
          <Link href="/">Blog</Link>
        </div>
      </div>
    </main>
  );
};

export default Nav;
