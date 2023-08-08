import { Button } from "@/components/ui/button";
import Offer from "@/views/landing/Offer";
import LandingHero from "@/views/landing/LandingHero";
import Latest from "@/views/landing/Latest";
import Expand from "@/views/landing/Expand";

const index = () => {
    return (
        <>
            <LandingHero/>
            <Latest/>
            <Offer/>
            <Expand/>
        </>
    );
}

export default index;