import DashNav from "@/components/DashNav";
import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";

import { actionSet } from "../lib/indexs";
import Image from "next/image";

const Home = () => {
  return (
    <div className="bg-[#F7F7F7] w-[full] ">
      {/* WELCOME TO */}
      <div className="min-h-[50vh] h-auto flex flex-col items-center md:justify-center justify-start px-5">
        <h1 className="font-bold md:text-2xl sm:text-2xl text-2xl text-[#D1770E] font-primary text-center pt-10 md:pt-0">
          WELCOME TO
        </h1>
        <h1 className="font-bold md:text-7xl sm:text-5xl text-5xl text-[#D1770E] font-primary text-center pt-2 md:pt-0">
          DIGITALKUBO
        </h1>
        <h1 className="max-w-[40rem] md:pt-3  mt-3 font-secondary text-black/70 text-center">
          Access Our Free Action Plans Today! Upgrade Your Account for Premium
          Access to Unleash Even More Possibilities.
        </h1>
      </div>

      <DashNav />
      {/* RECIPES */}
      <div className="w-full h-full relative">
        <Image
          src="/bg.webp"
          height={20}
          width={20}
          alt="/"
          className="absolute
top-0 left-0
object cover
w-full h-full
object-top"
        />
        <div className=" w-[full] min-h-auto container relative z-10 pb-24">
          <div className="pl-8">
            <h1 className="  mt-6 text-3xl font-primary text-nav font-bold">
              Action Plans
            </h1>
            <p className=" font-secondary text-black/50">
              Acess our free action plans
            </p>
          </div>
          <div className="w-full mx-auto grid 2xl:grid-cols-4 px-8 lg:grid-cols-3 gap-5 md:grid-cols-2 items-center mt-10">
            {actionSet.map((action, i) => {
              return (
                <div
                  key={i}
                  className="max-w-[23rem] h-auto bg-nav/20 shadow-md rounded flex sm:flex-row flex-col pt-5 pl-5"
                >
                  <div className="items-end justify-center sm:flex hidden">
                    <Image
                      className="w-60"
                      src={action.image}
                      width={102}
                      height={138}
                      alt="/"
                    />
                  </div>
                  <div className="w-auto px-2 pb-6  pr-4 sm:pl-3">
                    <h1 className="flex text-left ">{action.title}</h1>

                    <Badge
                      variant="outline"
                      className="text-nav mt-2 bg-nav/25"
                    >
                      {action.text}
                    </Badge>
                    <span className="px-1"></span>
                    <Badge variant="outline" className="text-nav bg-nav/25">
                      {action.text1}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>

          {/* LOCKED ACTION PLANS */}

          <div className="pl-8">
            <h1 className="  mt-20 text-3xl font-primary text-nav font-bold">
              Locked Action Plans
            </h1>
            <p className=" font-secondary text-black/50 max-w-[25rem]">
              Upgrade your account to unlock all the locked action plans.
            </p>
          </div>
          <div className="w-full mx-auto grid 2xl:grid-cols-4 px-8 lg:grid-cols-3 gap-5 md:grid-cols-2 items-center mt-10">
            {actionSet.map((action, i) => {
              return (
                <div
                  key={i}
                  className="max-w-[23rem] h-auto bg-lock/50 shadow-md rounded flex sm:flex-row flex-col pt-5 pl-5"
                >
                  <div className="items-end justify-center sm:flex hidden">
                    <Image
                      className="w-64"
                      src={action.image1}
                      width={102}
                      height={138}
                      alt="/"
                    />
                  </div>
                  <div className="w-auto px-2 pb-6  pr-4 sm:pl-3">
                    <h1 className="flex text-left ">{action.title}</h1>

                    <Badge
                      variant="outline"
                      className="text-black mt-2 bg-lock2/25"
                    >
                      {action.text}
                    </Badge>
                    <span className="px-1"></span>
                    <Badge variant="outline" className="text-black bg-lock2/25">
                      {action.text1}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
