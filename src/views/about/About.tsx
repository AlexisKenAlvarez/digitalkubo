import React from "react";
import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";

const montserrat = Montserrat({ subsets: ["latin"] });

const About = () => {
  return (
    <main className={` ${montserrat.className}`}>
      <div className="max-w-full md:w-full h-[356px] bg-[#B4B3AE] flex flex-col items-center justify-center ">
        <h1 className="text-[#D1770E] md:text-[80px] font-bold md:text-center text-[40px] sm:text-[60px]">
          {" "}
          ABOUT US
        </h1>

        <Button className=" bg-button hover:bg-nav text-sm px-5 py-2.5 mr-2 mb-2">
          <p className="">See More</p>
        </Button>
      </div>
    </main>
  );
};

export default About;
