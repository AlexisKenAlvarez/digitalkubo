import React from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const About = () => {
  return (
    <div className="max-w-full w-full min-h-screen flex flex-col h-auto items-center justify-center bg-[#FFFFFF] ">
      <div className="max-w-[1400px]">
        <div className="flex items-center justify-center">
          <div className="md:w-[50%] text-center">
            <h1 className="text-[#D1770E] md:text-[80px] font-bold md:text-center text-[50px] sm:text-[60px] font-primary">
              {" "}
              ABOUT US
            </h1>
            <h1 className="max-w-[60rem] md:pt-5 text-justify mt-5 font-secondary text-black/70 lg:p-3 p-3">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
              corporis. Minus quae quam odit. Fugiat ullam, officiis similique
              mollitia ex autem ab, laboriosam minima nihil dolorem totam
              maxime? Veritatis, porro?
            </h1>
          </div>
          <div className="w-[50%] lg:block hidden ">
            <Image
              src="/about.webp"
              alt="kubo"
              width="500"
              height="500"
              className="ml-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
