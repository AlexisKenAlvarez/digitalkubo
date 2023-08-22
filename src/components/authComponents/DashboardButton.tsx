import React from 'react'
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react'
import { DropdownMenuGroup, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { LayoutDashboard } from 'lucide-react';

const DashboardButton = () => {
    const { data: session } = useSession()

    if (session && session.user) {
        return (
            <Link href="/home">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="group cursor-pointer flex text-sm pt-[7px] pl-2 outline-0 pb-[7px] hover:bg-[#f1f5f9] items-center rounded-md transition-bg ease-in-out duration-75">
                        <div className="group-hover:text-nav transition-all ease-in-out duration-100">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                        </div>
                        <span className="group-hover:text-nav transition-all ease-in-out duration-100">Home</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </Link>
        )
    }

    return (

        <DropdownMenuGroup onClick={() => { signIn() }}>
            <DropdownMenuItem className="group cursor-pointer flex text-sm pt-[7px] pl-2 outline-0 pb-[7px] hover:bg-[#f1f5f9] items-center rounded-md transition-bg ease-in-out duration-75">
                <div className="group-hover:text-nav transition-all ease-in-out duration-100">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                </div>
                <span className="group-hover:text-nav transition-all ease-in-out duration-100">Home / Login</span>
            </DropdownMenuItem>
        </DropdownMenuGroup>

    )
}

export default DashboardButton