"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

const NavBar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const { data } = useSession({ required: true });

  return (
    <div className="py-4 relative">
      {/* Desktop Layout */}
      <div className="hidden md:flex max-w-6xl mx-auto justify-between">
        <img src="/images/logo.png" className="h-16" />

        <ul className="flex gap-6 text-lg my-auto">
          {/* <li>
                <a href='#intro'>Individuals</a>
            </li> */}
          {/* <li>
            <a href="#pricing">Pricing</a>
          </li> */}
        </ul>

        <div className="my-auto">
          {/* <button className='bg-black p-4 rounded-md text-white font-semibold text-base mx-2'>Get Started</button> */}
          {data ? (
            <button
              className="bg-white p-4 rounded-md text-black font-semibold text-base mx-2"
              // onClick={() => signIn("google")}
            >
              <Link href={"/individuals"}>Go to Dashboard</Link>
              {/* Sign In */}
            </button>
          ) : (
            <button
              className="bg-white p-4 rounded-md text-black font-semibold text-base mx-2"
              onClick={() => signIn("google")}
            >
              {/* <Link href={"/individuals"}>Sign In</Link> */}
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden px-4 justify-between ">
        <img src="/images/logo.png" className="h-12" />
        <button onClick={toggleMenu}>
          <img src="/hamburgerIcon.png" className="h-12" />
        </button>
      </div>

      {menuVisible && (
        <div className="w-full z-50 absolute top-20 left-0 right-0 bg-white text-black py-4 ">
          <ul className="grid grid-cols-1 divide-y divide-gray-200 text-lg my-auto indent-4">
            {/* <li>
                <a href='#intro'>Individuals</a>
            </li> */}
            <li className="pt-2 mb-1">
              <a href="#pricing">Pricing</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
