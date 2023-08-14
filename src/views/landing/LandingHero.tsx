import { Button } from "@/components/ui/button";

const LandingHero = () => {
    return (
        <section className="w-full min-h-screen 2xl:px-5 py-10 flex relative md:min-h-screen items-center">
            <div className="w-[50%] mx-auto pl-14">
                <h1 className="text-[#D1770E] font-primary md:text-[90px] font-bold md:text-left text-[40px] tracking-wide">
                    DIGITALKUBO
                </h1>

                <p className="text-[#0000004f] font-secondary font-medium md:text-justify md:text-xl max-w-[42rem] my-10 mt-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam sed debitis praesentium laudantium architecto repudiandae minus at ipsum quis iusto vel iste, non accusamus magnam ut voluptas? Illo, nobis tempore?
                </p>

                <Button className="bg-button hover:bg-nav text-lg mt-6 mr-2 mb-2 px-6 py-4">
                    <p className="font-secondary text-[1rem]">See More</p>
                </Button>
            </div>
            <div className="w-full align-center h-fit">
                <img className="mx-auto" src="kubo.webp"></img>
            </div>
        </section>
    );
}

export default LandingHero;