import { Button } from "@/components/ui/button";

const LandingHero = () => {
    return (
        <section className="w-full min-h-screen px-24 2xl:px-5 py-10 pt-[8rem] relative">
            <div className="max-w-[1400px] w-full mx-auto">
                <h1 className="text-[#D1770E] font-primary md:text-[100px] font-bold md:text-left text-[40px] sm:text-[60px] tracking-wide">
                    {" "}
                    DIGITALKUBO
                </h1>

                <p className="text-[#0000004f] font-secondary font-medium md:text-left md:text-xl max-w-[42rem] my-10 mt-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam sed debitis praesentium laudantium architecto repudiandae minus at ipsum quis iusto vel iste, non accusamus magnam ut voluptas? Illo, nobis tempore?
                </p>

                <Button className=" bg-button hover:bg-nav text-lg mr-2 mb-2 px-7 py-7">
                    <p className="font-secondary">See More</p>
                </Button>
            </div>
        </section>
    );
}

export default LandingHero;