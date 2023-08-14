"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LiaTelegramPlane } from "react-icons/lia";
import { RxDiscordLogo } from "react-icons/rx";
import { TfiTwitter } from "react-icons/tfi";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import DashboardButton from "./authComponents/DashboardButton";
import LogoutButton from "./authComponents/LogoutButton";
import DashboardMobile from "./authComponents/DashboardMobile";
import { signOut, useSession } from "next-auth/react";
import { navList } from "@/lib/list";

const Nav = () => {
  const [navDesktopActive, setNav] = useState(false);

  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState<boolean>(false);

  const scrollHandler = () => {
    if (window.scrollY > 32) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, true);
    return () => {
      window.removeEventListener("scroll", scrollHandler, true);
    };
  }, []);

  const icons = [
    {
      link: "",
      icon: <LiaTelegramPlane />,
    },
    {
      link: "",
      icon: <RxDiscordLogo />,
    },
    {
      link: "",
      icon: <TfiTwitter />,
    },
  ];

  const handleNavDesktop = () => {
    setNav((curr) => !curr);
  };

  const pathname = usePathname();

  if (pathname.includes("/dashboard")) {
    return null;
  }

  return (
    <>
      <nav
        className={`w-full h-[calc(100vh-60px)] md:hidden block right-0 top-[60px] bottom-0 bg-white text-black z-40 fixed transition-all  ease-in-out duration-500 ${
          navDesktopActive ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* NAV FOR MOBILE */}
        <div className="overflow-auto max-h-[100%] h-full w-full pb-20 right-0">
          <ul className="text-black font-secondary font-semibold uppercase px-7 w-full py-12 text-sm text-center">
            <DashboardMobile navDesktopActive={navDesktopActive} />
            {navList.map((items, i) => {
              return (
                <a href={`#${items.slug}`} className="w-full h-full" key={i}>
                  <motion.li
                    initial={{ x: 100, opacity: 0 }}
                    animate={navDesktopActive ? { x: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 0.7,
                      delay: 0.5 * (i * 0.1),
                      ease: [0.16, 0.77, 0.47, 0.97],
                    }}
                    className={`border-b-[1px] border-black/10 py-5 `}
                  >
                    {items.label}
                  </motion.li>
                </a>
              );
            })}

            {session ? (
              <motion.li
                onClick={() => {
                  signOut();
                }}
                initial={{ x: 100, opacity: 0 }}
                animate={navDesktopActive ? { x: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.5 * 0.3,
                  ease: [0.16, 0.77, 0.47, 0.97],
                }}
                className={`border-b-[1px] border-black/10 py-5`}
              >
                Logout
              </motion.li>
            ) : null}
          </ul>

          <div className="font-primary text-center -mt-2 px-6">
            <h2 className="text-neon font-semibold">Join the community</h2>
            <p className="font-medium text-black mt-6">
              For more details about our progress and workflow be sure to follow
            </p>

            <div className=" flex mx-auto w-fit mt-5 gap-x-6 text-2xl">
              {icons.map((items, i) => {
                return (
                  <a
                    href={items.link}
                    target="_blank"
                    rel="noopener noreferer"
                    className=""
                    key={i}
                  >
                    {items.icon}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
      <nav
        className={`w-full h-auto transtion-bg ease-in-out duration-300 fixed top-0 left-0 border-b-[1px] border-b-black/5 z-30 ${
          navDesktopActive
            ? "bg-button md:bg-white md:text-button text-white"
            : " bg-white text-button"
        }`}
      >
        <div
          className={`w-full h-8 bg-black/80 items-center md:flex hidden relative top-0 left-0 overflow-hidden transition-all ease-in-out duration-300 ${
            scrolled ? "max-h-0" : "max-h-8"
          }`}
        >
          <button className="text-[12px] text-center text-white w-full">
            <p className="">Subscribe for up to 50% discount!</p>
          </button>
        </div>

        <div className="max-w-[1500px] w-full mx-auto flex justify-between px-5 py-3">
          <div className="flex items-center gap-x-2">
            {/* <Image src="/logo.webp" alt="Logo" width="500" height="500" className='w-10' /> */}
            <Link href="/">
              <h1
                className={`font-bold text-2xl tracking-widest cursor-pointer ${
                  navDesktopActive ? "md:text-nav text-white" : "text-nav"
                }`}
              >
                DIGITALKUBO
              </h1>
            </Link>
          </div>

          <div className="md:block hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-gray-100 transition-bg ease-in-out duration-300 rounded-lg w-fit h-fit">
                  <Menu strokeWidth={3} size={32} className="text-nav" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[12rem] md:block hidden 2xl:mr-24 mr-10">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DashboardButton />
                  {navList.map((items, i) => {
                    return (
                      <Link href={items.slug} key={i}>
                        <DropdownMenuItem className="group cursor-pointer">
                          <div className="group-hover:text-nav transition-all ease-in-out duration-100">
                            {items.icon}
                          </div>
                          <span className="group-hover:text-nav transition-all ease-in-out duration-100">
                            {items.label}
                          </span>
                        </DropdownMenuItem>
                      </Link>
                    );
                  })}
                  <div className="">
                    <LogoutButton />
                  </div>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* <div className="md:flex hidden">
=======
    const pathname = usePathname()

    if (pathname.includes('/dashboard')) {
        return null
    }

    return (
        <>
            <nav className={`w-full min-h-[calc(100vh-60px)] md:hidden block right-0 top-[56px] bottom-0 bg-white text-black z-40 fixed transition-all  ease-in-out duration-500 ${navDesktopActive ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* NAV FOR MOBILE */}
                <div className="overflow-auto max-h-[100%] h-full w-full pb-20 right-0">
                    <ul className="text-black font-secondary font-semibold uppercase px-7 w-full py-12 text-sm text-center">
                        <DashboardMobile navDesktopActive={navDesktopActive} />
                        {navList.map((items, i) => {
                            return (

                                <a href={`#${items.slug}`} className="w-full h-full" key={i}>
                                    <motion.li initial={{ x: 100, opacity: 0 }} animate={navDesktopActive ? { x: 0, opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.5 * (i * 0.1), ease: [0.16, 0.77, 0.47, .97] }} className={`border-b-[1px] border-black/10 py-5 `}>
                                        {items.label}
                                    </motion.li>
                                </a>
                            )
                        })}

                        {session ? <motion.li onClick={() => { signOut() }} initial={{ x: 100, opacity: 0 }} animate={navDesktopActive ? { x: 0, opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.5 * 0.3, ease: [0.16, 0.77, 0.47, .97] }} className={`border-b-[1px] border-black/10 py-5`}>
                            Logout
                        </motion.li> : null}
                    </ul>

                    <div className="font-primary text-center -mt-2 px-6">
                        <h2 className="text-neon font-semibold">Join the community</h2>
                        <p className="font-medium text-black mt-6">For more details about our progress and workflow be sure to follow</p>

                        <div className=" flex mx-auto w-fit mt-5 gap-x-6 text-2xl">
                            {icons.map((items, i) => {
                                return (
                                    <a href={items.link} target="_blank" rel="noopener noreferer" className="" key={i}>
                                        {items.icon}
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </nav >
            <nav className={`w-full h-auto transtion-bg ease-in-out duration-300 fixed top-0 left-0 border-b-[1px] border-b-black/5 z-30 ${navDesktopActive ? 'bg-button md:bg-white md:text-button text-white' : ' bg-white text-button'}`}>

                <div className={`w-full h-8 bg-black/80 items-center md:flex hidden relative top-0 left-0 overflow-hidden transition-all ease-in-out duration-300 ${scrolled ? 'max-h-0' : 'max-h-8'}`} >
                    <button className="text-[12px] text-center text-white w-full">
                        <p className="">Subscribe for up to 50% discount!</p>
                    </button>
                </div>


                <div className="max-w-[1500px] w-full mx-auto flex justify-between px-5 py-3">
                    <div className="flex items-center gap-x-2">
                        {/* <Image src="/logo.webp" alt="Logo" width="500" height="500" className='w-10' /> */}
                        <Link href="/">
                            <h1 className={`font-bold text-2xl tracking-widest cursor-pointer ${navDesktopActive ? 'md:text-nav text-white' : 'text-nav'}`}>DIGITALKUBO</h1>
                        </Link>
                    </div>

                    <div className="md:block hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="p-2 hover:bg-gray-100 transition-bg ease-in-out duration-300 rounded-lg w-fit h-fit">
                                    <Menu strokeWidth={3} size={32} className="text-nav" />
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-[12rem] md:block hidden 2xl:mr-24 mr-10">
                                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DashboardButton />
                                    {navList.map((items, i) => {
                                        return (

                                            <Link href={items.slug} key={i}>
                                                <DropdownMenuItem className="group cursor-pointer">
                                                    <div className="group-hover:text-nav transition-all ease-in-out duration-100">
                                                        {items.icon}
                                                    </div>
                                                    <span className="group-hover:text-nav transition-all ease-in-out duration-100">{items.label}</span>
                                                </DropdownMenuItem>
                                            </Link>

                                        )
                                    })}
                                    <div className="">
                                        <LogoutButton />
                                    </div>
                                </DropdownMenuGroup>


                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* <div className="md:flex hidden">

                        <CreateQuizButton />
                    </div> */}

          <button
            className={` mt-2 mr-3 flex-col items-end gap-y-3 md:hidden flex transition-all ease-in-out duration-300 ${
              navDesktopActive ? "rotate-[360deg]" : "rotate-0"
            }`}
            onClick={handleNavDesktop}
          >
            <div
              className={` transition-all ease-in-out duration-300 ${
                navDesktopActive
                  ? "bg-white rotate-[-45deg] w-8 translate-y-[9px] h-[3px]"
                  : "w-8 h-[3px] bg-nav"
              }`}
            ></div>
            <div
              className={` transition-all ease-in-out duration-300  ${
                navDesktopActive
                  ? "bg-white rotate-[45deg] w-8 h-[3px] -translate-y-[6px]"
                  : "w-6 h-[3px] bg-nav"
              }`}
            ></div>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Nav;
