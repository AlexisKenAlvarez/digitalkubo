import React from "react";

import Image from "next/image";
import Questions from "@/components/Questions";

const faq = () => {
  const faqList = [
    {
      title: "Lorem Ipsum?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed",
    },
    {
      title: "Lorem Ipsum?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed",
    },
    {
      title: "Lorem Ipsum?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed",
    },
    {
      title: "Lorem Ipsum?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed",
    },
  ];

  return (
    <div className="w-full min-h-screen h-auto relative sm:flex sm:items-center md:items-center md:justify-center flex flex-col ">
      <div className="max-w-[1400px] ">
        {/* FAQ HERO */}
        <div className="flex items-center justify-center">
          <div className="lg:w-[50%] px-5">
            <h1 className="text-3xl md:text-5xl lg:text-7xl text-center  text-nav flex-col font-bold font-primary p-8 ">
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <p className="text-black/70 font-inter text-xl">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
              dolores quisquam fugit perspiciatis quae vel? Quas, modi ipsum.
              Magni distinctio nam maiores. Deserunt reiciendis, omnis maxime
              fuga molestias ullam minima.
            </p>
          </div>
          <div className="w-[50%] lg:block hidden">
            <Image
              src="/faqlog.webp"
              alt="kubo"
              width="1000"
              height="1000"
              className="w-[45rem] mt-10 rounded-md"
            />
          </div>
        </div>

        {/* ACCORDIONS */}
        <div className="w-full h-auto mt-32 px-5">
          <h1 className="md:text-5xl lg:text-7xl text-3xl text-nav text-center font-bold">
            Questions
          </h1>

          <div className="flex md:flex-row  mt-10 flex-col items-center justify-center  ">
            <div className=" flex flex-col md:w-[50%] gap-5 p-2">
              {faqList.map((items, i) => {
                return (
                  <Questions
                    title={items.title}
                    desc={items.description}
                    key={i}
                  />
                );
              })}
            </div>
            <div className=" flex flex-col md:w-[50%] gap-5 p-2 md:al">
              {faqList.map((items, i) => {
                return (
                  <Questions
                    title={items.title}
                    desc={items.description}
                    key={i}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* CONTACT US */}
      <div
        className="max-w-full w-full h-[500px] flex flex-col items-center justify-center py-2 mt-28 bg-cover "
        style={{
          backgroundImage: `url('/bg-faq.webp')`,
          height: "500px",
        }}
      >
        <h1 className="text-white md:text-[80px] font-bold md:text-center text-[30px] sm:text-[60px] font-primary">
          {" "}
          •GET IN TOUCH•
        </h1>
        <h1 className="text-white md:text-[50px] font-bold md:text-center text-[25px] sm:text-[40px] font-secondary">
          {" "}
          Contact us @
        </h1>
        <h1 className="text-white md:text-[45px] font-bold md:text-center text-[20px] sm:text-[40px] font-secondary ">
          {" "}
          digital.kubo@example.com
        </h1>
      </div>
    </div>
  );
};

export default faq;
