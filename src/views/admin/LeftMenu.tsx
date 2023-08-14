

import { menuList } from '../../lib/list';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/router';

const LeftMenu = () => {

    const pathname = usePathname()
    const router = useRouter()
    
    const handleNav = (link: string) => {
        router.push(link)
    }

    return (
        <div className="bg-white w-[14rem] h-screen border-r-[1px] border-black/10 flex-shrink-0 lg:block hidden">
            {/* <Image src="/logo2.webp" alt="Logo" width="500" height="500" className="w-16 mx-auto mt-5" /> */}

            <div className="w-full mt-20 flex flex-col gap-y-10">
                <div className="px-6 ">
                    <div className="flex items-center gap-x-2">
                        <h1 className="font-bold">Menu</h1>
                    </div>
                    <Separator className="mt-2" />
                    <ul className="mx-auto w-full mt-2">
                        {menuList.map((items) => {
                            return (
                                <Link key={items.label} href={items.link} replace>
                                    <li
                                        className={`py-2 hover:text-nav ${pathname === items.link ? ' text-button' : 'text-black'}`}
                                        key={items.label}>
                                        <div className="capitalize mx-auto flex items-center gap-x-2 font-medium">
                                            {items.icon}
                                            <h1 className="">
                                                {items.label}
                                            </h1>
                                        </div>
                                    </li>
                                </Link>

                            )
                        })}
                    </ul>
                </div>


            </div>
        </div>
    );
}

export default LeftMenu;