import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

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
        },
      },
    ],
  };

  const arr = [...new Array(6)];
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <section
      className="w-full md:px-24 2xl:px-5 md:py-10 relative bg-white scroll-smooth"
      id="latest"
    >
      <div className="max-w-[1400px] w-full mx-auto flex flex-wrap">
        <div className="w-full mx-auto py-10">
          <h1 className="text-[#D1770E] font-primary md:text-[24px] font-bold text-center text-[24px] tracking-wide pb-4">
            LATEST ACTION PLAN
          </h1>
          <div className="flex items-center justify-center">
            <Button
              className="text-[#ffffff] content-none p-2 md:text-[24px]"
              onClick={() => slider?.current?.slickPrev()}
            >
              {"⮜"}
            </Button>
            <Slider
              {...settings}
              ref={slider}
              className="px-2 md:px-0 max-w-[300px] md:max-w-[42rem] lg:max-w-[1000px]"
            >
              {arr.map((items, i) => {
                return (
                  <div
                    onClick={handleOpen}
                    className="my-5 md:max-w-[18rem] lg:ml-2 border"
                    key={i + items}
                  >
                    <Image
                      src="/sample.webp"
                      alt={i.toString()}
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
            <AlertDialog open={isOpen}>
              <AlertDialogContent className="border-[#D1770E] border-2 pt-0 pb-6 px-0">
                <AlertDialogCancel
                  onClick={handleClose}
                  className="border-0 text-right justify-end ml-auto hover:bg-white text-[18px]"
                >
                  x
                </AlertDialogCancel>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-primary md:text-[32px] text-[28px] text-center md:px-10 leading-8">
                    Please log in first to view these contents
                  </AlertDialogTitle>
                  <AlertDialogDescription className="font-secondary text-[#64748B] px-2 md:px-6 py-4 text-center">
                    This content is only available for our beloved users. We
                    encourage you to create an account or login to access these
                    action plans.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className=" sm:mx-auto sm:items-center gap-x-4 pb-10 md:pl-4 gap-y-2">
                  <AlertDialogAction className="font-secondary text-white shadow-lg">
                    <Link href="/auth/login/">Log In</Link>
                  </AlertDialogAction>
                  <p className="font-secondary text-[#64748B] text-center">
                    or
                  </p>
                  <AlertDialogAction className="font-secondary border-2 border-[#D1770E] bg-[#ffffff] text-[#D1770E] hover:text-white shadow-lg">
                    <Link href="/auth/signup/">Create an account</Link>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              className="text-[#ffffff] content-none p-2 md:text-[24px]"
              onClick={() => slider?.current?.slickNext()}
            >
              {"⮞"}
            </Button>
          </div>
        </div>
        <div className="max-w-[1400px] w-full mx-auto flex-wrap md:flex-nowrap md:flex py-16 gap-x-10">
          <div className="w-full align-center h-fit hidden lg:block">
            <Image
              className="mx-auto hidden md:block"
              width="700"
              height="600"
              alt="Business"
              src="/business.webp"
            ></Image>
          </div>
          <div className="w-full text-center md:text-left ">
            <h1 className="text-[#D1770E] font-primary md:text-[40px] font-bold text-[24px] tracking-wide">
              PROMOTE YOUR BUSINESS
            </h1>
            <p className="text-[#0000004f] font-secondary md:text-[20px] font-medium md:text-justify text-[16px] sm:text-[16px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
              Praesent mauris. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Integer nec odio. Praesent libero. Sed cursus
              ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
              imperdiet. Duis sagittis ipsum. Praesent mauris.
            </p>
            <Button className="bg-button hover:bg-nav text-lg mt-6 mr-2 mb-2 px-6 py-4">
              <Link href="/home" className="font-secondary md:text-[16px]">
                See More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Latest;
