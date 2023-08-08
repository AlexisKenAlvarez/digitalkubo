import LeftMenu from "@/components/dashboard/LeftMenu";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react"
import { Session } from "next-auth";
import Link from 'next/link';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { menuList } from "@/lib/list";

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const session = await getSession(ctx)
    console.log(session)

    return {
        props: {
            session: session
        }
    }
}

const index = ({ session }: { session: Session }) => {
    return (
        <div className="bg-[#F3F3F3] flex lg:flex-row flex-col">
            <LeftMenu />
            <div className="w-full h-20 bg-white lg:hidden block py-5 px-2">
                <NavigationMenu>
                    <NavigationMenuList>
                        {menuList.map((items, i) => {
                            return (
                                <Link key={i} href={items.link} legacyBehavior passHref>
                                    <NavigationMenuList>
                                        <button>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                <div className="text-xl">
                                                    {items.icon}
                                                </div>
                                                <p className="ml-2">
                                                    {items.label}
                                                </p>
                                            </NavigationMenuLink>
                                        </button>
                                    </NavigationMenuList>
                                </Link>
                            )
                        })}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="w-full">
                <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center p-4">
                    {/* INSERT CODE BELOW */}
                    <div className="w-full h-full  bg-white">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default index;