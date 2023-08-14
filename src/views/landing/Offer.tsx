import React from "react";

const Offer = () => {
    const templates = [
        {
            desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, enim odio, voluptate soluta porro inventore voluptas error temporibus obcaecati",
            img: "vector1.png"
        },
        {
            desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, enim odio, voluptate soluta porro inventore voluptas error temporibus obcaecati",
            img: "vector2.png"
        },
        {
            desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, enim odio, voluptate soluta porro inventore voluptas error temporibus obcaecati",
            img: "vector3.png"
        },
        {
            desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, enim odio, voluptate soluta porro inventore voluptas error temporibus obcaecati",
            img: "vector4.png"
        },
    ];

    console.log("HELLo");

    return (
        <>
            <section className="w-full md:px-24 2xl:px-5 pt-10 bg-white border-y">
                <div className="max-w-[1400px] w-full mx-auto flex flex-wrap text-center md:text-justify">
                    <div className="w-full mx-auto">
                        <div className="w-full mx-auto">
                            <h1 className="text-[#D1770E] font-primary md:text-[43px] font-bold md:text-center text-[24px] tracking-wide">
                                WHAT WE OFFER?
                            </h1>
                        </div>
                        <div className="my-4 mx-auto flex flex-wrap xl:flex-nowrap">
                            {templates.map(function (template) {
                                return (
                                    <div
                                        className="text-[#0000004f] font-secondary font-medium"
                                        key={template.desc}
                                    >
                                        <div className="w-full md:py-4 md:px-20">
                                            <div className="">
                                                <img className="mx-auto" key={template.img} src={template.img}></img>
                                            </div>
                                        </div>
                                        <div className="w-full text-justify p-6">
                                            <p className="text-[#0000004f] font-secondary font-medium">
                                                {template.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Offer;
