import Link from 'next/link';
import { useRouter } from 'next/router';

import {
    NavigationMenu,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { menuList } from "@/lib/list";

const TopMenu = () => {

    const router = useRouter()
    const pathname = router.pathname

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {menuList.map((items, i) => {
                    return (
                        <Link key={i} href={items.link} legacyBehavior passHref>
                            <NavigationMenuList>
                                <button>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        <div className={`flex items-center ${pathname === items.link ? 'text-nav' : ''}`}>
                                            <div className="text-xl">
                                                {items.icon}
                                            </div>
                                            <p className="ml-2">
                                                {items.label}
                                            </p>
                                        </div>

                                    </NavigationMenuLink>
                                </button>
                            </NavigationMenuList>
                        </Link>
                    )
                })}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

export default TopMenu;