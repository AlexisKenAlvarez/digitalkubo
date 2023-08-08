import React from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({ subsets: ["latin"] });

const faq = () => {
  return (
    <main className={` ${montserrat.className}`}>
      <div className="w-full min-h-screen h-auto sm:py-4 relative sm:px-5 sm:flex sm:items-center md:items-center md:justify-center ">
        <div className="max-w-[1400px] flex items-center justify-center">
          <div className="w-[50%]  ">
            {" "}
            <h1 className="lg:text-[50px] text-left text-[#D1770E] flex-col font-bold">
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <div className="">
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
              dolores quisquam fugit perspiciatis quae vel? Quas, modi ipsum.
              Magni distinctio nam maiores. Deserunt reiciendis, omnis maxime
              fuga molestias ullam minima.
            </div>
          </div>
          <div className="w-[50%] lg:block hidden">
            <Image
              src="/hut.webp"
              alt="kubo"
              width="1000"
              height="1000"
              className="w-[45rem] mt-10 border-black"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default faq;
