import React from "react";

const Offer = () => {
    const templates = [
        {
            desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, enim odio, voluptate soluta porro inventore voluptas error temporibus obcaecati",
        },
        {
            desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, enim odio, voluptate soluta porro inventore voluptas error temporibus obcaecati",
        },
        {
            desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, enim odio, voluptate soluta porro inventore voluptas error temporibus obcaecati",
        },
        {
            desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, enim odio, voluptate soluta porro inventore voluptas error temporibus obcaecati",
        },
    ];

    console.log("HELLo");

    return (
        <>
            <section className="w-full px-24 2xl:px-5 pt-10 bg-white border-y">
                <div className="max-w-[1400px] w-full mx-auto">
                    <div className="w-full">
                        <h1 className="text-[#D1770E] font-primary md:text-[43px] font-bold md:text-center text-[40px] sm:text-[60px] tracking-wide">
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
                                    <div className="w-full py-4 px-20">
                                        {" "}
                                        <div className=" bg-[#D9D9D9] p-12"></div>
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
            </section>
        </>
    );
};

export default Offer;
