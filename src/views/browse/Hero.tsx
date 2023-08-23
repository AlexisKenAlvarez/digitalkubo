import { Button } from "@/components/ui/button";

const Hero = () => {
    return (
        <section className="w-full pb-72">
            <div className="w-full text-center pt-24">
                <div className="w-full">
                    <h1 className="font-primary text-[#D1770E] text-[30px] md:text-[60px] lg:text-[80px] font-bold px-4 py-2">BROWSE COLLECTION</h1>
                    <p className="font-secondary text-[#0F172A] text-[14px] md:text-[16px] pb-8 px-6 lg:px-80 leading-6 md:leading-8">Access Our Free Action Plans Today! Upgrade Your Account for Premium Access to Unleash Even More Possibilities.</p>
                    <Button className="font-secondary">Explore Collections</Button>
                </div>
            </div>
        </section>
    );
}

export default Hero;