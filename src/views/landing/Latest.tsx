import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Latest = () => {
  const slider = React.useRef<Slider>(null);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 870,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 1,
        }
      }
    ],
  };

  const arr = [...new Array(6)];

  return (
    <section className="w-full md:px-24 2xl:px-5 md:py-10 relative bg-white">
      <div className="max-w-[1400px] w-full mx-auto flex flex-wrap">
        <div className="w-full mx-auto py-10">
          <h1 className="text-[#D1770E] font-primary md:text-[24px] font-bold md:text-left text-center text-[24px] tracking-wide">
            LATEST ACTION PLAN
          </h1>
          <div className="flex items-center justify-center">
            <Button
              className="text-[#ffffff] content-none p-2 md:text-[32px]"
              onClick={() => slider?.current?.slickPrev()}
            >
              {"<"}
            </Button>
            <Slider
              {...settings}
              ref={slider}
              className="px-2 md:px-0 max-w-[300px] md:max-w-[42rem] lg:max-w-[1000px]"
            >
              {arr.map((items, i) => {
                return (
                  <div
                    className="my-5 md:max-w-[18rem] lg:ml-2 border"
                    key={i + items}
                  >
                    <Image
                      src="/pdf.webp"
                      alt={i + items}
                      width="500"
                      height="500"
                    ></Image>
                    <h3 className="my-5 text-[#D1770E] text-[14px] md:text-[16px] font-primary font-medium text-center">
                      {" "}
                      Action Plan 00{i + 1}
                    </h3>
                  </div>
                );
              })}
            </Slider>
            <Button
              className="text-[#ffffff] content-none p-2 md:text-[32px]"
              onClick={() => slider?.current?.slickNext()}
            >
              {">"}
            </Button>
          </div>
        </div>
        <div className="max-w-[1400px] w-full mx-auto flex-wrap md:flex-nowrap md:flex py-16 gap-x-10">
          <div className="w-full text-center">
            <h1 className="text-[#D1770E] font-primary md:text-[40px] font-bold md:text-center text-[24px] tracking-wide">
              PROMOTE YOUR BUSINESS
            </h1>
            <p className="text-[#0000004f] font-secondary md:text-[20px] font-medium md:text-justify text-[16px] sm:text-[16px] px-5 py-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
              Praesent mauris. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Integer nec odio. Praesent libero. Sed cursus
              ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
              imperdiet. Duis sagittis ipsum. Praesent mauris.
            </p>
            <Button className="bg-button hover:bg-nav text-lg mt-6 mr-2 mb-2 px-6 py-4">
              <p className="font-secondary md:text-[16px]">See More</p>
            </Button>
          </div>
          <div className="w-full align-center h-fit hidden lg:block">
            <Image
              className="mx-auto hidden md:block"
              width="500"
              height="500"
              alt="Business"
              src="/business.webp"
            ></Image>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Latest;