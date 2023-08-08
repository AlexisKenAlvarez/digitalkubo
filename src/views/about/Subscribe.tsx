import React from "react";
import { Montserrat } from "next/font/google";

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
            <button
              type="button"
              className="text-white bg-[#D1770E] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-[#D1770E] dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Subscribe;
