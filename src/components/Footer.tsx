import React from "react";

const Footer = () => {
  return (
    <div>
      {/* <div className="max-w-6xl px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 mx-auto py-12 justify-between">
        <div>
          <img src="/logoBeta.png" className="h-12 mx-auto" />
        </div>

        <div className="flex flex-col gap-2 text-center sm:text-left">
          <a>Individuals</a>
          <a>Businesses</a>
          <a>Features</a>
          <a>Pricing</a>
          <a>Blog</a>
          <a>FAQ</a>
        </div>
      </div> */}
      <div className="w-full bg-black py-2 text-center text-white font-semibold">
        Powered by{" "}
        <a className="text-amber-500" href="https://infrahive.io">
          InfraHive
        </a>
      </div>
    </div>
  );
};

export default Footer;
