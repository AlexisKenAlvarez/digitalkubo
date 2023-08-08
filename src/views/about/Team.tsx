import React from "react";
import Image from "next/image.js";
import { teamSet } from "../../lib/indexs";

const Team = () => {
    return (
        <div className="w-full min-h-screen h-auto flex flex-col items-center justify-center px-5 py-10">
            <div className="shadow shadow-[#D7882C] max-w-[1600px] w-full h-auto rounded-md py-10">
                <h1 className="text-center text-[#D1770E] font-bold text-[50px] py-10 font-primary">
                    MEET OUR TEAM
                </h1>
                <div className=" mx-auto flex flex-wrap items-center justify-center w-fit gap-5 mt-5 font-secondary">
                    {teamSet.map((skills, i) => (
                        <div
                            className="sm:w-[435px] w-[19rem] pt-5 h-auto border rounded-md bg-[#B4B3AE] overflow-hidden group relative"
                            key={i}
                        >
                            {/* HOVERED INFORMATION */}
                            <div className="absolute w-full h-full bg-[#B4B3AE] z-1 p-6 translate-y-full group-hover:translate-y-0 transition-all ease 
                            duration-500">
                                <p className=" font-bold text-center text-3xl">
                                    {skills.text}
                                </p>
                                <p className="text-center">{skills.text1}</p>
                                <p className="p-8">{skills.desc}</p>
                            </div>
                            {/* USER IMAGE */}
                            <Image
                                className="w-[435px]"
                                src={skills.image}
                                width={435}
                                height={392}
                                alt="/"
                            />
                            {/* USER INFORMATION */}
                            <div className="w-[435px] h-[85px] p-3 bg-bg ">
                                <h2 className=" text-black text-2xl font-medium text-left">
                                    {skills.text}
                                </h2>
                                <h2 className=" text-left text-black font-medium">
                                    {skills.text1}
                                </h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Team;
