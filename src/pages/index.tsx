
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from "react";
import { useScroll, useSpring, useTransform, motion } from 'framer-motion'
import { Button } from "@/components/ui/button";
import BotTop from "@/components/anim/BotTop";
import { signIn } from "next-auth/react";


const index = () => {

    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end end']
    })

    const opac = useTransform(scrollYProgress, [0.3, 0.8], [1, 0])
    const opacity = useSpring(opac)

    return (
        <>
            <motion.section style={{ opacity }} className="container min-h-[65vh] sm:min-h-[30rem] lg:min-h-[35rem] h-auto relative" >
                <div className="fixed left-0 right-0 mx-auto top-28 sm:top-44 px-5">
                    <div className=" relative w-fit mx-auto">
                        <Image src="/logo2.webp" alt="Logo" width="600" height="600" className="absolute w-[13rem] right-0 opacity-40 sm:block hidden" />
                        <div className="relative z-10">
                            <h1 className="text-center font-bold text-3xl md:text-[48px] max-w-[50rem] mx-auto tracking-tight leading-tight">
                                Automated Reviewer Exam Generator from <span className="text-cvsu">Excel</span> Uploads
                            </h1>
                            <p className="text-black/50 text-center max-w-[40rem] mx-auto">
                                Experience the joy of crafting interactive quizzes effortlessly with our user-friendly quiz maker website, where knowledge meets fun.
                            </p>
                        </div>
                    </div>
                    <div className="w-fit mx-auto mt-6 gap-x-2 flex">
                        <Link href="/auth/signup">
                            <Button className="bg-cvsu hover:bg-cvsu/70 rounded-md" onClick={() => {signIn()}}>
                                Join us
                            </Button>
                        </Link>

                        <Button variant="ghost">
                            Get Started
                        </Button>
                    </div>
                </div>
            </motion.section>

            <section className="container h-auto min-h-screen bg-white z-10 relative pb-20" ref={containerRef}>
                <Image src="/excelquiz.webp" alt="Excel" width="1200" height="900" className="mx-auto"></Image>

                <div className="mt-20">
                    <BotTop>
                        <div className="flex items-center justify-center gap-x-3">
                            <Image src="/diamond.webp" alt="Diamond" width="200" height="200" className="w-10"></Image>
                            <h1 className="md:text-[48px] text-2xl font-bold">ABOUT ERWIN</h1>
                        </div>
                    </BotTop>

                    <div className="relative mt-10 min-h-[40rem] h-auto">

                        <BotTop>
                            <div className="w-full h-full bg-white border-2 border-black rounded-xl relative z-10 overflow-hidden p-6 py-8 sm:p-10 lg:p-16 shadow-aboutShadow">
                                <Image src="/sofa.webp" alt="Sofa" width="900" height="900" className="absolute -bottom-12 -right-10 w-[30rem] lg:block hidden"></Image>

                                <div className="flex flex-col gap-y-10 relative z-10">
                                    <div className="">
                                        <div className="flex items-center gap-x-4">
                                            <div className=" items-center  sm:flex hidden">
                                                <div className="w-3 h-3 rounded-full bg-cvsu"></div>
                                                <div className="w-8 h-[5px] rounded-full bg-cvsu -ml-2"></div>
                                            </div>
                                            <h2 className="font-semibold sm:text-[30px] text-xl">What is ERWIN?</h2>
                                        </div>

                                        <p className="text-black/50 lg:max-w-[50%] mt-2">
                                            Experience the joy of crafting interactive quizzes effortlessly with our user-friendly quiz maker website, where knowledge meets fun. Experience the joy of crafting interactive quizzes effortlessly with our user-friendly quiz maker website, where knowledge meets fun.
                                        </p>
                                    </div>

                                    <div className="">
                                        <div className="flex items-center gap-x-4">
                                            <div className="items-center  sm:flex hidden">
                                                <div className="w-3 h-3 rounded-full bg-cvsu"></div>
                                                <div className="w-8 h-[5px] rounded-full bg-cvsu -ml-2 sm:block hidden"></div>
                                            </div>
                                            <h2 className="font-semibold  sm:text-[30px] text-xl">How does ERWIN work?</h2>
                                        </div>

                                        <p className="text-black/50 lg:max-w-[50%] mt-2">
                                            Experience the joy of crafting interactive quizzes effortlessly with our user-friendly quiz maker website, where knowledge meets fun. Experience the joy of crafting interactive quizzes effortlessly with our user-friendly quiz maker website, where knowledge meets fun. Experience the joy of crafting interactive quizzes effortlessly with our user-friendly quiz maker website, where knowledge meets fun. Experience the joy of crafting interactive quizzes effortlessly with our user-friendly quiz maker website, where knowledge meets fun.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </BotTop>
                    </div>
                </div>
            </section>
        </>
    )
}

export default index;