import React from "react";

import Image from "next/image";
import Questions from "@/components/Questions";

const faq = () => {

    const faqList = [
        {
            title: 'Lorem Ipsum?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed'
        },
        {
            title: 'Lorem Ipsum?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed'
        }, {
            title: 'Lorem Ipsum?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed'
        }, {
            title: 'Lorem Ipsum?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed'
        },
        {
            title: 'Lorem Ipsum?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed'
        },
        {
            title: 'Lorem Ipsum?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed'
        }, {
            title: 'Lorem Ipsum?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed'
        }, {
            title: 'Lorem Ipsum?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed'
        },
    ]

    return (
        <div className="w-full min-h-screen h-auto py-4 relative px-5 sm:flex sm:items-center md:items-center md:justify-center ">
            <div className="max-w-[1400px] ">
                {/* FAQ HERO */}
                <div className="flex items-center justify-center">
                    <div className="w-[50%]">

                        <h1 className="lg:text-[50px] text-left text-nav flex-col font-bold font-primary">
                            FREQUENTLY ASKED QUESTIONS
                        </h1>
                        <div className="font-inter">
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

                {/* ACCORDIONS */}
                <div className="w-full h-auto mt-32">
                    <h1 className="text-5xl text-nav text-center font-bold">Questions</h1>

                    <div className="grid lg:grid-cols-2 items-center justify-center gap-5 mt-10">
                        {faqList.map((items, i) => {
                            return (
                                <Questions title={items.title} desc={items.description} key={i} />
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default faq;
