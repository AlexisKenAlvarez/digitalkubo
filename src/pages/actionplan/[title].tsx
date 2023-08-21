import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { AiOutlineFilePdf, AiOutlineFileWord } from "react-icons/ai";
import Image from "next/image";

const Title = () => {
  return (
    <div className="w-full h-auto">
      <div className="container">
        <div className="pt-6 ">
          <span className="flex items-center ">
            <IoIosArrowBack />
            <h1 className="font-secondary">Back</h1>
          </span>
          <h1 className="text-nav font-bold font-primary pt-4 md:text-3xl text-4xl">
            FIRST EVER ACTION PLAN{" "}
          </h1>
        </div>
      </div>

      {/* PDF VIEW */}
      <div className="w-full h-full relative">
        <Image
          src="/bg.webp"
          height={20}
          width={20}
          alt="/"
          className="absolute top-0 left-0 object cover w-full h-full object-top"
        />
        <div className="flex  lg:flex-row flex-col pb-24 pt-14 container">
          <div className="w-50% h-screen border z-10">
            <div className="md:w-[40rem]"> pic</div>
          </div>
          <div className="w-50% xl:h-screen pt-4 z-10">
            <div className="xl:w-[40rem] flex flex-col gap-y-4">
              <span className="lg:pl-8">
                <Button className="bg-nav hover:bg-button pl-2 py-6">
                  <span className="pl-2">
                    <AiOutlineFilePdf size={27} />
                  </span>
                  <p className="font-secondary font-bold text-sm px-4">
                    EXPORT AS PDF
                  </p>
                </Button>
              </span>
              <span className="lg:pl-8">
                <Button className="bg-nav hover:bg-button pl-2 py-6">
                  <span className="pl-2">
                    <AiOutlineFileWord size={27} />
                  </span>
                  <p className="font-secondary font-bold text-sm px-4">
                    EXPORT AS WORD
                  </p>
                </Button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;
