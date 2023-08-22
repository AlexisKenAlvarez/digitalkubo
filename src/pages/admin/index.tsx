import * as React from "react";
import LeftMenu from "@/views/admin/LeftMenu";
import TopMenu from "@/views/admin/TopMenu";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Columns } from "@/components/admin/Columns";
import { DataTable } from "@/components/admin/Data-Table";

import { ColumnDef } from "@tanstack/react-table";
import { Separator } from "@/components/ui/separator";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// RUNS ON BACKEND
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  try {
    if (session) {
      const data = await axios.post(`${process.env.NEXTAUTH_URL}/api/checkAdmin`, {
        email: session?.user.email,
      });

      console.log(data)

      if (data.data.success) {
        return {
          props: {
            data: null,
          },
        };
      } else {
        return {
          redirect: {
            destination: "/home",
            permanent: false,
          },
        };
      }
    }

    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  } catch (error) {
    console.log("MAY ERROR PRE");
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
};

const Index = () => {
  const REACT_TABLE_PAGE_SIZE = 5;

  const unlockedPdf = useQuery({
    queryKey: ["adminData", { type: "unlocked" }],
    queryFn: () => getData(),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const lockedPdf = useQuery({
    queryKey: ["adminData", { type: "locked" }],
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
              {unlockedPdf.isLoading ? (
                <p>Loading...</p>
              ) : (
                <DataTable
                  columns={Columns}
                  data={unlockedPdf.data.data}
                  pageSize={REACT_TABLE_PAGE_SIZE}
                  tableName="Unlocked Action Plans"
                />
              )}
            </div>
            <Separator />
            <div className="flex flex-col gap-y-4 sm:p-10 p-2">
              {lockedPdf.isLoading ? (
                <p>Loading...</p>
              ) : (
                <DataTable
                  columns={Columns}
                  data={lockedPdf.data?.data}
                  pageSize={REACT_TABLE_PAGE_SIZE}
                  tableName="Locked Action Plans"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
