import { Button } from "@/components/ui/button";

const Expand = () => {
    return (
        <section className="w-full min-h-screen px-24 2xl:px-5 pt-10 bg-white">
            <div className="max-w-[1400px] w-full mx-auto text-center py-20 bg-[#D9D9D9]">
                <h1 className="text-[#D1770E] font-primary md:text-[52px] font-bold md:text-center text-[40px] sm:text-[60px] tracking-wide">
                    EXPAND YOUR BUSINESS WITH US!</h1>
                <Button className="bg-button hover:bg-nav text-lg mt-5 mr-2 mb-2 px-7 py-5">
                    <p className="font-secondary text-[1rem]">Sign Up</p>
                </Button>
            </div>
            <div className="w-full mt-52 pt-5 border-t border-neutral-300">
                <h1 className="text-[#D1770E] font-primary md:text-[25px] font-bold md:text-center tracking-wide">
                    DIGITALKUBO
                </h1>
                <p className="text-[#0000004f] mt-4 font-secondary font-medium md:text-center" >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                    </p>
            </div>
        </section>
    );
}

export default Expand;