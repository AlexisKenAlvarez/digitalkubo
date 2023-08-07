import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";

const LogoutMobile = ({ navDesktopActive }: { navDesktopActive: boolean }) => {

    const { data: session } = useSession()

    if (session && session.user) {
        return (

                <motion.li initial={{ x: 100, opacity: 0 }} animate={navDesktopActive ? { x: 0, opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0, ease: [0.16, 0.77, 0.47, .97] }} className={`border-t-[1px] border-black/10 py-5 `} onClick={() => {signOut()}}>
                    Logout
                </motion.li>

        )
    }

    return (
        <></>
    );
}

export default LogoutMobile;