import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Button } from "@/components/ui/button";

const Latest = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <section className="w-full px-24 2xl:px-5 py-10 relative bg-white">
            <div className="max-w-[1400px] w-full mx-auto py-10">
                <h1 className="text-[#D1770E] font-primary md:text-[24px] font-bold md:text-left text-[40px] sm:text-[60px] tracking-wide">
                    LATEST ACTION PLANS
                </h1>
                <Slider {...settings}>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                </Slider>
            </div>
            <div className="max-w-[1400px] w-full mx-auto flex py-16">
                <div className="w-full text-center">
                    <h1 className="text-[#D1770E] font-primary md:text-[42px] font-bold md:text-center text-[40px] sm:text-[60px] tracking-wide">
                        PROMOTE YOUR BUSINESS</h1>
                    <p className="text-[#0000004f] font-secondary md:text-[20px] font-medium md:text-justify text-[16px] sm:text-[16px] px-5 py-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
                    </p>
                    <Button className="bg-button hover:bg-nav text-lg mt-6 mr-2 mb-2 px-6 py-4">
                        <p className="font-secondary md:text-[16px]">See More</p>
                    </Button>
                </div>
                <div className="w-full bg-[#D9D9D9] ml-5 py-52">

                </div>
            </div>
        </section>
    );
}

export default Latest;