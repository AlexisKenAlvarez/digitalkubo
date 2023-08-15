import LeftMenu from "@/views/admin/LeftMenu";
import TopMenu from "@/views/admin/TopMenu";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { columns } from "@/components/admin/Columns";
import { DataTable } from "@/components/admin/Data-Table";

import {
    ColumnDef,
} from "@tanstack/react-table"


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
                            <DataTable columns={columns} data={data.data} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;