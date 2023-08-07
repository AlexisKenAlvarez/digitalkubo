'use client'
import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
    const { data: session } = useSession()

    if (session && session.user) {
        return (
            <>
                <DropdownMenuSeparator className="w-full h-[1px] bg-black/5" />
                <DropdownMenuItem onClick={() => { signOut() }} className="group cursor-pointer flex text-sm pt-[7px] pl-2 outline-0 pb-[7px] hover:bg-[#f1f5f9] items-center rounded-md transition-bg ease-in-out duration-75">
                    <LogOut className="mr-2 h-4 w-4 transition-all ease-in-out duration-100 group-hover:text-red-400" />
                    <span className="transition-all ease-in-out duration-100 group-hover:text-red-400">Log out</span>
                </DropdownMenuItem>
            </>
        )
    }

    return (
        <>

        </>
    )
}

export default LogoutButton