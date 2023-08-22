import DashNav from "@/components/DashNav";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ColumnData } from "@/components/admin/Columns";
import ActionPlanSkeleton from "@/skeleton/ActionPlanSkeleton";

const Home = () => {
  const [search, setSearching] = useState("");
  const [debounce, setDebounce] = useState(false);

  const [acpUnlocked, setAcpUnlocked] = useState<ColumnData[]>([
    {
      id: "",
      locked: false,
      actionPlan: {
        fileName: "",
        id: 0,
        link: "",
        publicId: "",
        title: "",
        pricing: {
          id: 0,
          pricing: "",
        },
      },
    },
  ]);

  const [acpLocked, setAcpLocked] = useState<ColumnData[]>([
    {
      id: "",
      locked: false,
      actionPlan: {
        fileName: "",
        id: 0,
        link: "",
        publicId: "",
        title: "",
        pricing: {
          id: 0,
          pricing: "",
        },
      },
    },
  ]);

  const lockedQuery = useQuery({
    queryKey: ["adminData", { type: "locked" }],
    queryFn: () => getData({ locked: true }),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const unlockedQuery = useQuery({
    queryKey: ["adminData", { type: "unlocked" }],
    queryFn: () => getData({ locked: false }),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const getData = async ({ locked }: { locked: boolean }) => {
    const { data } = await axios.post("/api/getPdf", { locked });
    return data;
  };

  useEffect(() => {
    console.log("Hi");
    if (unlockedQuery.data) {
      setAcpUnlocked(unlockedQuery.data.data);
    }

    if (lockedQuery.data) {
      setAcpLocked(lockedQuery.data.data);
    }
  }, [unlockedQuery.data, lockedQuery.data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const message = e.target.value;
    setSearching(message);
  };

  useEffect(() => {
    const debounceFunction = (filteredArray: ColumnData[], locked: boolean) => {
      setDebounce(true);

      if (debounce) {
        console.log(debounce);
        let timer = setTimeout(() => {
          if (locked) {
            setAcpLocked(filteredArray);
          } else {
            setAcpUnlocked(filteredArray);
          }
          setDebounce(false);
        }, 1000);

        return () => clearTimeout(timer);
      } else {
        let timer = setTimeout(() => {
          if (locked) {
            setAcpLocked(filteredArray);
          } else {
            setAcpUnlocked(filteredArray);
          }
          setDebounce(false);
        }, 1000);
        return () => clearTimeout(timer);
      }
    };

    if (unlockedQuery.data) {
      const filteredArrayUnlocked = unlockedQuery.data.data.filter(
        (item: { actionPlan: { title: string } }) => {
          return item.actionPlan.title
            .toLowerCase()
            .includes(search.toLowerCase());
        }
      );

      const filteredArrayLocked = lockedQuery.data.data.filter(
        (item: { actionPlan: { title: string } }) => {
          return item.actionPlan.title
            .toLowerCase()
            .includes(search.toLowerCase());
        }
      );

      debounceFunction(filteredArrayUnlocked, false);
      debounceFunction(filteredArrayLocked, true);
    }
  }, [search]);

  const arr = [...new Array(3)];

  return (
    <div className="bg-[#F7F7F7] w-[full] ">
      {/* WELCOME TO */}
      <div className="min-h-[50vh] h-auto flex flex-col items-center md:justify-center justify-start px-5">
        <h1 className="font-bold md:text-2xl sm:text-2xl text-2xl text-[#D1770E] font-primary text-center pt-10 md:pt-0">
          WELCOME TO
        </h1>
        <h1 className="font-bold md:text-7xl sm:text-5xl text-5xl text-[#D1770E] font-primary text-center pt-2 md:pt-0">
          DIGITALKUBO
        </h1>
        <h1 className="max-w-[40rem] md:pt-3  mt-3 font-secondary text-black/70 text-center">
          Access Our Free Action Plans Today! Upgrade Your Account for Premium
          Access to Unleash Even More Possibilities.
        </h1>
      </div>

      <DashNav />
      {/* RECIPES */}
      <div className="w-full h-full relative">
        <Image
          src="/bg.webp"
          height={20}
          width={20}
          alt="/"
          className="absolute top-0 left-0 object cover w-full h-full object-top"
        />
        <div className=" w-[full] min-h-auto container relative z-10 pb-24">
          <div className="md:flex items-center justify-between flex-row">
            <div className=" flex flex-col ">
              <h1 className=" mt-6 text-3xl font-primary text-nav font-bold ">
                Action Plans
              </h1>
              <p className=" font-secondary text-black/50">
                Acess our free action plans
              </p>
            </div>

            {/* SEARCH BAR */}
            <Input
              className="w-64 mt-4 md:mt-0 border-nav outline-0 focus-visible:ring-0"
              type="search"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="w-full mx-auto grid 2xl:grid-cols-4 lg:grid-cols-3 gap-8 md:grid-cols-2 items-center mt-10">
            {debounce ? (
              <>
                <ActionPlanSkeleton />
                <ActionPlanSkeleton />
                <ActionPlanSkeleton />
                <ActionPlanSkeleton />
              </>
            ) : unlockedQuery.isLoading ? (
              <>
                <ActionPlanSkeleton />
                <ActionPlanSkeleton />
                <ActionPlanSkeleton />
                <ActionPlanSkeleton />
              </>
            ) : acpUnlocked && acpUnlocked.length > 0 ? (
              acpUnlocked.map((action, i) => {
                return (
                  <div
                    key={i}
                    className="max-w-[24rem] w-full h-[11rem] bg-nav/10 shadow-md rounded-xl border-[1px] md:border-nav/20 flex sm:flex-row flex-col pt-5 md:pl-5 md:border-t-0 border-t-[0.8rem] border-nav"
                  >
                    <div className="items-end justify-center sm:flex hidden flex-shrink-0 ">
                      <Image
                        className="w-28"
                        src="/action.webp"
                        width={102}
                        height={138}
                        alt="/"
                      />
                    </div>
                    <div className="md:pl-3 md:pr-3 px-5">
                      <div className="w-full block overflow-hidden">
                        <h1 className="max-h-24 line-clamp-4 font-medium text-sm">
                          {action.actionPlan.title}
                        </h1>
                      </div>
                      <Badge className="text-nav mt-2 bg-nav/25 hover:bg-nav/30">
                        {action.locked ? "Locked" : "Unlocked"}
                      </Badge>
                      <span className="px-1"></span>
                      <Badge className="text-nav bg-nav/25 capitalize hover:bg-nav/30">
                        {action.actionPlan.pricing.pricing}
                      </Badge>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No results...</p>
            )}
          </div>

          {/* LOCKED ACTION PLANS */}

          <div className="">
            <h1 className="  mt-20 text-3xl font-primary text-nav font-bold">
              Locked Action Plans
            </h1>
            <p className=" font-secondary text-black/50 max-w-[25rem]">
              Upgrade your account to unlock all the locked action plans.
            </p>
          </div>
          <div className="w-full mx-auto grid 2xl:grid-cols-4 lg:grid-cols-3 gap-8 md:grid-cols-2 items-center mt-10">
            {debounce ? (
              <>
                <ActionPlanSkeleton />
                <ActionPlanSkeleton />
                <ActionPlanSkeleton />
                <ActionPlanSkeleton />
              </>
            ) : lockedQuery.isLoading ? (
              <>
                <ActionPlanSkeleton />
                <ActionPlanSkeleton />
                <ActionPlanSkeleton />
                <ActionPlanSkeleton />
              </>
            ) : acpLocked && acpLocked.length > 0 ? (
              acpLocked.map((action, i) => {
                return (
                  <div
                    key={i}
                    className="max-w-[24rem] w-full h-[11rem] bg-lock/40 shadow-md rounded-xl border-[1px] md:border-lock2/20 flex sm:flex-row flex-col pt-5 md:pl-5 md:border-t-[1px] border-t-[0.8rem] border-lock2"
                  >
                    <div className="items-end justify-center sm:flex hidden flex-shrink-0 ">
                      <Image
                        className="w-28"
                        src="/locked.webp"
                        width={102}
                        height={138}
                        alt="/"
                      />
                    </div>
                    <div className="md:pl-3 md:pr-3 px-5">
                      <div className="w-full block overflow-hidden">
                        <h1 className="max-h-24 line-clamp-4 font-medium text-sm">
                          {action.actionPlan.title}
                        </h1>
                      </div>
                      <Badge className="text-black mt-2 bg-lock2/25 hover:bg-lock2/30">
                        {action.locked ? "Locked" : "Unlocked"}
                      </Badge>
                      <span className="px-1"></span>
                      <Badge className="text-black bg-lock2/25 capitalize hover:bg-lock2/30">
                        {action.actionPlan.pricing.pricing}
                      </Badge>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No results...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Home.requireAuth = true;

export default Home;
