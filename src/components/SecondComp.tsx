"use client";

import React from "react";
import Typewriter from "typewriter-effect";
const SecondComp = () => {
  return (
    <div className="relative  flex" id="findAndHire">
      <div className="max-w-xl lg:max-w-5xl py-12 ml-4 md:ml-12 md:px-0">
        <div className="text-4xl md:text-5xl lg:text-6xl ">
          <h2 className="my-2">Find Effortlessly</h2>
          <div className="text-infraYellow font-extrabold">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                .typeString("Software Engineer")
                .pauseFor(1)
                .deleteAll()
                .typeString("Product Manager")
                .pauseFor(1)
                .deleteAll()
                .typeString("Machine Learning Engineer")
                .pauseFor(1)
                .deleteAll()
                .typeString("MERN Stack Engineer")
                .pauseFor(1)
                .start();
              }}
              options={{
                loop: true,
                autoStart: true,
              }}
            />
          </div>
          <h2 className="my-2">Jobs</h2>
        </div>
        <p className="mt-16 text-lg md:text-2xl max-w-sm md:max-w-2xl font-semibold">
       With <span className="text-amber-500">JobuddyGPT</span>, you no longer
        need to visit multiple job portals or spend hours searching for
        openings.
        </p>
      <button className="px-12 w-68 mt-12 py-6 text-2xl font-semibold bg-infraYellow rounded-md">
        Start Searching
      </button>
      </div>
      <div className="hidden md:block absolute right-10 -z-50 top-10">
        <img src={'https://uploads-ssl.webflow.com/63748a57aeb3b345173ed2ca/63ff714549fe395b27cc7353_Grid1-p-800.png'} alt="Technologies" className="md:h-[24rem] lg:h-[32rem]"/>
      </div>
      <div className="block md:hidden absolute right-10 -z-50 -mt-6">
        <img src={'https://uploads-ssl.webflow.com/63748a57aeb3b345173ed2ca/640ce351760bf3d2627b6ae0_Grid2.svg'} alt="Technologies" className="h-[16rem]"/>
      </div>

    </div>
  );
};

export default SecondComp;
