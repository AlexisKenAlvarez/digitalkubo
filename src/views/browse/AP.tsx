import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const AP = () => {
    return (
        <section className="w-full">
            <div className="w-full">
                <div className="w-full text-center">
                    <h1 className="font-primary text-[#D1770E] text-[30px] md:text-[60px] lg:text-[80px] font-bold px-4 py-2">ACTION PLANS</h1>
                    <p className="font-secondary text-[18px] text-[#0000004f] w-[72%] text-end">As of August 3, 2023</p>
                </div>
                <div className="flex align justify-center">
                    <Button className="rounded-sm text-center">
                        <Image
                        className="mt-1"
                        src="/material-symbols_search.png"
                        alt="search"
                        width="40"
                        height="25"></Image>
                    </Button>
                    <Input
                        className="w-[45%] mt-4 md:mt-0 border-nav outline-0 focus-visible:ring-0 rounded-none bg-transparent"
                        type="search"
                        placeholder="Search"
                    />
                    <Button className="rounded-sm text-center ml-1">
                        <Image
                        className="mt-1"
                        src="/material-symbols_filter.png"
                        alt="search"
                        width="25"
                        height="25"></Image>
                    </Button>
                </div>
                <div>

                </div>
            </div>
        </section>
    );
}

export default AP;