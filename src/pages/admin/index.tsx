import LeftMenu from "@/components/admin/LeftMenu";
import TopMenu from "@/components/admin/TopMenu";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { PiTrashSimpleThin } from "react-icons/pi";

const index = () => {

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['adminData'],
        queryFn: () => getData(),
    })

    const getData = async () => {
        const { data } = await axios.get('/api/getPdf')
        return data
    }


    return (
        <div className="bg-[#F3F3F3] flex lg:flex-row flex-col">
            <LeftMenu />
            <div className="w-full h-20 bg-white lg:hidden block py-5 px-2">
                <TopMenu />
            </div>
            <div className="w-full">
                <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center lg:px-4 py-4 ">
                    {/* INSERT CODE BELOW */}
                    <div className="w-full h-full  bg-white">
                        {isLoading ? <p>Loading...</p> :
                            <Table >
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Access</TableHead>
                                        <TableHead>File</TableHead>
                                        <TableHead>Delete</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.data.map((items: { title: string, locked: boolean, link: string }, i: number) => {
                                        return (
                                            <TableRow key={i}>
                                                <TableCell className="text-black">{items.title}</TableCell>
                                                <TableCell className="text-black capitalize">{items.locked ? "Locked" : "Unlocked"}</TableCell>
                                                <TableCell className="text-black">{items.link}</TableCell>
                                                <TableCell className="text-black">
                                                    <button>
                                                        <PiTrashSimpleThin className='text-lg hover:text-red-500 transition-all ease-in-out' />
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default index;