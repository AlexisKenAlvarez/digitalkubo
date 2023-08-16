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
      <div className="bg-[#F7F7F7] w-[full] min-h-auto">
        <div className="pl-8">
          <h1 className="  mt-6 text-3xl font-primary text-nav font-bold">
            Action Plans
          </h1>
          <p className=" font-secondary text-black/50">
            Acess our free action plans
          </p>
        </div>
        <div className="w-full mx-auto grid lg:grid-cols-4 gap-8 px-8 md:grid-cols-3 sm:grid-cols-2">
          {actionSet.map((action, i) => {
            return (
              <div
                key={i}
                className="w-[355px] h-auto bg-nav/20 shadow-md rounded flex flex-row  my-4 pt-5 "
              >
                <div className="px-2 pl-6">
                  <Image
                    className="h-[138] w-[102px]"
                    src={action.image}
                    width={102}
                    height={138}
                    alt="/"
                  />
                </div>
                <div className="w-auto px-6 ">
                  <h1 className="flex text-left max-w-[160px] ">
                    {action.title}
                  </h1>

                  <Badge variant="outline" className="text-nav mt-2 bg-nav/25">
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
      </div>
    </div>
  );
};

export default Home;
