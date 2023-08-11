import React from "react";
import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";

const montserrat = Montserrat({ subsets: ["latin"] });

const Subscribe = () => {
  return (
    <main className={` ${montserrat.className}`}>
      <div>
        <div className="max-w-full md:w-full h-[356px] bg-[#B4B3AE] flex flex-col items-center justify-center ">
          <h1 className="text-[#D1770E] md:text-[50px] font-bold md:text-center text-[30px] sm:text-[60px]">
            {" "}
            Want to see more?
          </h1>
          <h1 className="text-[#D1770E] md:text-[60px] font-bold md:text-center text-[30px] sm:text-[60px]">
            {" "}
            SUBSCRIBE!
          </h1>
          <div className="py-5">
            <Button className=" bg-button hover:bg-nav text-sm px-5 py-2.5 mr-2 mb-2 font-secondary">
              <p className="">SUBSCRIBE NOW!</p>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Subscribe;
