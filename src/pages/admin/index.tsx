import LeftMenu from "@/views/admin/LeftMenu";
import TopMenu from "@/views/admin/TopMenu";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { columns } from "@/components/admin/Columns";
import { DataTable } from "@/components/admin/Data-Table";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const Index = () => {
  const unlockedPdf = useQuery({
    queryKey: ["adminDataUnlocked"],
    queryFn: () => getData(),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const lockedPdf = useQuery({
    queryKey: ["adminDataLocked"],
    queryFn: () => getDataLocked(),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const getData = async () => {
    const { data } = await axios.post("/api/getPdf", { locked: false });
    return data;
  };

  const getDataLocked = async () => {
    const { data } = await axios.post("/api/getPdf", { locked: true });
    return data;
  };

  return (
    <div className="bg-[#F3F3F3] flex lg:flex-row flex-col">
      <LeftMenu />
      <div className="w-full h-20 bg-white lg:hidden block py-5 px-2">
        <TopMenu />
      </div>
      <div className="w-full">
        <div className="w-full h-auto min-h-[calc(100vh-80px)] flex items-center justify-center lg:px-4 py-4 ">
          {/* INSERT CODE BELOW */}
          <div className="w-full min-h-[calc(100vh-80px)] bg-white flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-4 sm:p-10 p-2">
              <h1 className="font-primary text-2xl">Unlocked Action Plan</h1>
              {unlockedPdf.isLoading ? (
                <p>Loading...</p>
              ) : (
                <DataTable columns={columns} data={unlockedPdf.data.data} />
              )}
            </div>
            <Separator />
            <div className="flex flex-col gap-y-4 sm:p-10 p-2">
              <h1 className="font-primary text-2xl">Locked Action Plan</h1>
              {lockedPdf.isLoading ? (
                <p>Loading...</p>
              ) : (
                <DataTable columns={columns} data={lockedPdf.data.data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
