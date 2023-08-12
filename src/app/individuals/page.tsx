"use client";
import { useSession } from "next-auth/react";
import Chat from "./Chat";

const Linkdin = () => {

  const {data} = useSession({required: true})

  console.log(data)

  return (
    <div className="flex flex-wrap justify-center px-[16px] py-[4px] bg-[#1a202c] min-h-[100vh]">
      <Chat />
    </div>
  );
};

export default Linkdin;
