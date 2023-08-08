import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Button } from "@/components/ui/button";

const Latest = () => {
    return (
        <section className="w-full min-h-screen px-24 2xl:px-5 py-10 relative bg-white">
            <div className="max-w-[1400px] w-full mx-auto py-10">
                <h1 className="text-[#D1770E] font-primary md:text-[24px] font-bold md:text-left text-[40px] sm:text-[60px]">
                    LATEST
                </h1>
            </div>
            <div className="max-w-[1400px] w-full mx-auto flex py-16">
                <div className="w-full text-center">
                    <h1 className="text-[#D1770E] font-primary md:text-[43px] font-bold md:text-center text-[40px] sm:text-[60px]">
                    PROMOTE YOUR BUSINESS</h1>
                    <p className="text-[#0000004f] font-secondary md:text-[22px] font-medium md:text-justify text-[40px] sm:text-[60px] px-5 py-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
                    </p>
                    <Button className="bg-button hover:bg-nav text-lg mr-2 mb-2 px-7 py-7">
                        <p className="font-secondary">See More</p>
                    </Button>
                </div>
                <div className="w-full bg-[#D9D9D9] ml-5 py-60">

                </div>
            </div>
        </section>
    );
}

export default Latest;