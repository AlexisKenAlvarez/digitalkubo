import DashNav from "@/components/DashNav";
import React from "react";
import {AiOutlineEdit}  from "react-icons/ai";

const profile = () => {
  return (
    <div className="pt-4 container pb-20 h-screen ">
      <DashNav />
      
      <div className="pl-8 md:flex flex flex-col " >
          <div className=" flex flex-col pt-10">
            <h1 className=" mt-6 text-6xl font-primary text-nav font-bold ">
              Profile
            </h1>
            <p className=" text-xl pt-2 font-secondary text-black/50">
              My Profile
            </p>
            </div>
            <div className="shadow-md container py-6 mt-4 flex flex-row justify-between">
            <div className="flex flex-col">
            <h1 className="text-black/50 font-primary text-[24px]">Email</h1>
            <h1 className="text-black/50 font-primary text-[16px] font-bold pt-2">burgerfries@gmail.com</h1>

            <h1 className="text-black/50 font-primary text-[24px] pt-4">Password</h1>

            <h1 className="text-black/50 font-primary text-[16px] font-bold py-2">************</h1>
            </div>
            <div className="">
            <AiOutlineEdit className="w-10 h-10 fill-nav" />
            </div>

            </div>
          </div>



    </div>
  );
};

export default profile;
