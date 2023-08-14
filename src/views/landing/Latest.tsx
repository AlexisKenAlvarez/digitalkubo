import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Button } from "@/components/ui/button";

const Latest = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };
    return (
        <section className="w-full md:px-24 2xl:px-5 md:py-10 relative bg-white">
            <div className="max-w-[1400px] w-full mx-auto flex flex-wrap">
                <div className="w-full mx-auto py-10">
                    <h1 className="text-[#D1770E] font-primary md:text-[24px] font-bold md:text-left text-center text-[24px] tracking-wide">
                        LATEST ACTION PLANS
                    </h1>
                    <Slider {...settings} className="px-2 md:px-0">
                        <div className="my-5">
                            <img src="pdf.webp"></img>
                            <h3 className="my-5 text-[#D1770E] text-[14px] md:text-[16px] font-primary font-medium text-center"> Action Plan 001</h3>
                        </div>
                        <div className="my-5">
                            <img src="pdf.webp"></img>
                            <h3 className="my-5 text-[#D1770E] text-[14px] md:text-[16px] font-primary font-medium text-center"> Action Plan 002</h3>
                        </div>
                        <div className="my-5">
                            <img src="pdf.webp"></img>
                            <h3 className="my-5 text-[#D1770E] text-[14px] md:text-[16px] font-primary font-medium text-center"> Action Plan 003</h3>
                        </div>
                        <div className="my-5">
                            <img src="pdf.webp"></img>
                            <h3 className="my-5 text-[#D1770E] text-[14px] md:text-[16px] font-primary font-medium text-center"> Action Plan 004</h3>
                        </div>
                        <div className="my-5">
                            <img src="pdf.webp"></img>
                            <h3 className="my-5 text-[#D1770E] text-[14px] md:text-[16px] font-primary font-medium text-center"> Action Plan 005</h3>
                        </div>
                        <div className="my-5">
                            <img src="pdf.webp"></img>
                            <h3 className="my-5 text-[#D1770E] text-[14px] md:text-[16px] font-primary font-medium text-center"> Action Plan 006</h3>
                        </div>
                    </Slider>
                </div>
                <div className="max-w-[1400px] w-full mx-auto flex-wrap md:flex-nowrap md:flex py-16 gap-x-10">
                    <div className="w-full text-center">
                        <h1 className="text-[#D1770E] font-primary md:text-[40px] font-bold md:text-center text-[24px] tracking-wide">
                            PROMOTE YOUR BUSINESS</h1>
                        <p className="text-[#0000004f] font-secondary md:text-[20px] font-medium md:text-justify text-[16px] sm:text-[16px] px-5 py-5">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
                        </p>
                        <Button className="bg-button hover:bg-nav text-lg mt-6 mr-2 mb-2 px-6 py-4">
                            <p className="font-secondary md:text-[16px]">See More</p>
                        </Button>
                    </div>
                    <div className="w-full align-center h-fit hidden lg:block">
                        <img className="mx-auto hidden md:block" src="business.webp"></img>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Latest;