import LeftMenu from "@/views/admin/LeftMenu";
import TopMenu from "@/views/admin/TopMenu";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { PiTrashSimpleThin } from "react-icons/pi";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

const Index = () => {

    const { isLoading, isError, error, data, refetch } = useQuery({
        queryKey: ['adminData'],
        queryFn: () => getData(),
        staleTime: 1000 * 60 * 60 * 24,
    })

    const getData = async () => {
        const { data } = await axios.get('/api/getPdf')
        console.log("execute")
        return data
    }


    return (
        <div className="bg-[#F3F3F3] flex lg:flex-row flex-col">
            <LeftMenu />
            <div className="w-full h-20 bg-white lg:hidden block py-5 px-2">
                <TopMenu />
            </div>
            <div className="w-full">
                <div className="w-full h-auto min-h-[calc(100vh-80px)] flex items-center justify-center lg:px-4 py-4 ">
                    {/* INSERT CODE BELOW */}
                    <div className="w-full  min-h-[calc(100vh-80px)]  bg-white">
                        {isLoading ? <p>Loading...</p> :
                            <Table >
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead className="md:flex items-center hidden">Access</TableHead>
                                        <TableHead>File</TableHead>
                                        <TableHead>Delete</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.data.map((items: { title: string, locked: boolean, link: string, fileName: string }, i: number) => {
                                        return (
                                            <TableRow key={i} className="">
                                                <TableCell className="text-black  md:text-sm text-xs">{items.title}</TableCell>
                                                <TableCell className="text-black capitalize md:block hidden">{items.locked ? "Locked" : "Unlocked"}</TableCell>
                                                <TableCell className="text-black  md:text-sm text-xs">{items.fileName}</TableCell>
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

export default Index;