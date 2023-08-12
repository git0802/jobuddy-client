"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const { data } = useSession({ required: true });

  return (
    <div className="min-h-[80vh] flex flex-col justify-center text-center">
      <h1 className="text-6xl font-bold max-w-2xl mx-auto">
        <span className="text-amber-500">JobuddyGPT</span> helps you find 10x
        more jobs using
        <span className="text-amber-500	"> AI</span>
      </h1>
      <p className="text-2xl opacity-60 mt-8 max-w-3xl mx-auto">
        Upload your <span className="text-amber-600	font-bold">CV</span> or{" "}
        <span className="text-amber-600	font-bold">linkedin</span> profile link,
        and chat with AI and find the most suitable job for you.
      </p>
      {data ? (
        <button className="bg-black px-4 py-4 rounded-md text-white text-base font-semibold mx-auto w-46 my-4">
          <Link href={"/individuals"}>Go to Dashboard</Link>
        </button>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="bg-black px-4 py-4 rounded-md text-white text-base font-semibold mx-auto w-36 my-4"
        >
          Get Started
        </button>
      )}

      <p className="opacity-50">Start for free</p>

      <div className="flex mx-auto mt-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png"
          className="h-12 w-12 rounded-full border-2"
          alt=""
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/391px-Apple_logo_black.svg.png"
          className="h-12 w-12 rounded-full -ml-4 border-2"
          alt=""
        />
        <img
          src="https://img.freepik.com/free-vector/meta-logo-file-social-media-icon-vector-3-november-2021-bangkok-thailand_53876-157873.jpg?w=2000"
          className="h-12 w-12 rounded-full -ml-4 border-2"
          alt=""
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png"
          className="h-12 w-12 rounded-full -ml-4 border-2"
          alt=""
        />
        <p className="ml-2 opacity-80 w-48 text-left text-sm">
          and 1000+ more companies waiting for you to apply
        </p>
      </div>
    </div>
  );
};

export default Hero;
