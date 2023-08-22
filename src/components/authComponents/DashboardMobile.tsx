import { signIn, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";

const DashboardMobile = ({ navDesktopActive }: { navDesktopActive: boolean }) => {

    const { data: session } = useSession()

    if (session && session.user) {
        return (
            <Link href="home">
                <motion.li initial={{ x: 100, opacity: 0 }} animate={navDesktopActive ? { x: 0, opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0, ease: [0.16, 0.77, 0.47, .97] }} className={`border-b-[1px] border-black/10 py-5 `}>
                    Home
                </motion.li>
            </Link>
        )
    }

    return (
        <motion.li initial={{ x: 100, opacity: 0 }} animate={navDesktopActive ? { x: 0, opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0, ease: [0.16, 0.77, 0.47, .97] }} className={`border-b-[1px] border-black/10 py-5`} onClick={() => {signIn()}}>
            Home
        </motion.li>
    );
}

export default DashboardMobile;