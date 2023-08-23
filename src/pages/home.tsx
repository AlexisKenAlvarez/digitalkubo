import DashNav from "@/components/DashNav";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ColumnData } from "@/components/admin/Columns";
import ActionPlanSkeleton from "@/skeleton/ActionPlanSkeleton";
import { debounce } from "lodash";
import { FaFilter } from "react-icons/fa";
import { BiSolidDownArrow } from "react-icons/bi";
import { dateFilter, titleFilter, pricingFilter } from "@/lib/list";
import { Column } from "@tanstack/react-table";

const Home = () => {
  const [search, setSearching] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [titleOrder, setTitleOrder] = useState("");
  const [pricing, setPricingFilter] = useState("");

  const [filterOpen, setFilterOpen] = useState(false);

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
        createdAt: new Date(),
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
        createdAt: new Date(),
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
    if (unlockedQuery.data) {
      setAcpUnlocked(unlockedQuery.data.data);
    }

    if (lockedQuery.data) {
      setAcpLocked(lockedQuery.data.data);
    }
  }, [unlockedQuery.data, lockedQuery.data]);

  const debouncedSearch = debounce((criteria) => {
    setSearching(criteria);
  }, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    if (unlockedQuery.data && lockedQuery.data) {
      const filteredArrayUnlocked = unlockedQuery.data.data.filter(
        (item: ColumnData) => {
          // If there is no pricing filter then search for the default values, else search for the filtered values
          if (pricing === "") {
            return item.actionPlan.title
              .toLowerCase()
              .includes(search.toLowerCase());
          } else {
            return (
              item.actionPlan.title
                .toLowerCase()
                .includes(search.toLowerCase()) &&
              item.actionPlan.pricing.pricing === pricing
            );
          }
        }
      );

      const filteredArrayLocked = lockedQuery.data.data.filter(
        (item: { actionPlan: { title: string } }) => {
          return item.actionPlan.title
            .toLowerCase()
            .includes(search.toLowerCase());
        }
      );

      setAcpLocked(filteredArrayLocked);
      setAcpUnlocked(filteredArrayUnlocked);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [search]);

  const debounceOrder = debounce((value: string, type: string) => {
    try {
      const sortFunc = (a: ColumnData, b: ColumnData) => {
        if (type === "date") {
          const dateA = new Date(a.actionPlan.createdAt).getTime();
          const dateB = new Date(b.actionPlan.createdAt).getTime();

          if (value === "desc") {
            return dateA - dateB;
          } else {
            return dateB - dateA;
          }
        } else {
          const titleA = a.actionPlan.title.toUpperCase();
          const titleB = b.actionPlan.title.toUpperCase();
          if (value === "asc") {
            if (titleA < titleB) {
              return -1;
            }
            if (titleA > titleB) {
              return 1;
            }
          } else if (value === "desc") {
            if (titleA > titleB) {
              return -1;
            }
            if (titleA < titleB) {
              return 1;
            }
          }

          return 0;
        }
      };

      const sortedDataLocked = [...acpLocked].sort((a, b) => {
        return sortFunc(a, b);
      });

      const sortedDataUnlocked = [...acpUnlocked].sort((a, b) => {
        return sortFunc(a, b);
      });

      setAcpUnlocked(sortedDataUnlocked);
      setAcpLocked(sortedDataLocked);
    } catch (error) {
      console.log(error);
    }
  }, 300);

  const handleSortOrder = ({
    value,
    type,
  }: {
    value: string;
    type: string;
  }) => {
    debounceOrder(value, type);

    if (type === "date") {
      setSortOrder(value);
      setTitleOrder("");
    } else if (type === "title") {
      setTitleOrder(value);
      setSortOrder("");
    }
  };

  const debouncePricing = debounce((value: string) => {
    const dataCopyUnlocked = unlockedQuery.data.data;
    const dataCopyLocked = unlockedQuery.data.data;

    const filteredDataUnlocked = dataCopyUnlocked.filter(
      (items: ColumnData) => {
        return items.actionPlan.pricing.pricing === value;
      }
    );

    const filteredDataLocked = dataCopyLocked.filter((items: ColumnData) => {
      return items.actionPlan.pricing.pricing === value;
    });

    setAcpUnlocked(filteredDataUnlocked);
    setAcpLocked(filteredDataLocked);
  }, 300);

  const handlePricing = (value: string) => {
    if (value === pricing) {
      const resetData = debounce(() => {
        setAcpUnlocked(unlockedQuery.data.data);
      }, 300);

      resetData();
      setPricingFilter("");
    } else {
      debouncePricing(value);
      setPricingFilter(value);
    }
  };

  const handleFilterState = () => {
    setFilterOpen((current) => !current);
  };

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
          <button
            className="w-full bg-nav/10 hover:bg-nav/20 transition-bg ease-in-out duration-300 h-16 mt-4 flex items-center justify-between px-6 rounded-md"
            onClick={handleFilterState}
          >
            <div className="flex items-center gap-x-4">
              <FaFilter />
              <p>Filters</p>
            </div>

            <BiSolidDownArrow
              className={`transition-all ease-in-out duration-300 ${
                filterOpen ? "" : "rotate-180"
              }`}
            />
          </button>
          <div
            className={`w-full h-auto overflow-hidden origin-top transition-all ease-out duration-500 ${
              filterOpen ? "max-h-[20rem]" : "max-h-0"
            }`}
          >
            <div className="sm:p-5 py-5 flex flex-col gap-y-4">
              <div>
                <h2 className="">Filter by Date</h2>
                <div className="flex gap-x-5 items-center mt-2 sm:text-base text-sm">
                  {dateFilter.map((items) => {
                    return (
                      <button
                        className={` sm:px-10 px-7 py-3 rounded-md hover:bg-nav/20 transition-all ease-in-out duration-300 capitalize ${
                          items.value === sortOrder ? "bg-nav/20" : "bg-nav/10"
                        }`}
                        key={items.value}
                        onClick={() => {
                          handleSortOrder({ value: items.value, type: "date" });
                        }}
                      >
                        {items.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2 className="">Filter by Title</h2>
                <div className="flex gap-x-5 items-center mt-2 sm:text-base text-sm">
                  {titleFilter.map((items) => {
                    return (
                      <button
                        className={` sm:px-10 px-7 py-3 rounded-md hover:bg-nav/20 transition-all ease-in-out duration-300 capitalize ${
                          items.value === titleOrder ? "bg-nav/20" : "bg-nav/10"
                        }`}
                        key={items.value}
                        onClick={() => {
                          handleSortOrder({
                            value: items.value,
                            type: "title",
                          });
                        }}
                      >
                        {items.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2 className="">Filter by Pricing</h2>
                <div className="flex gap-x-5 items-center mt-2 sm:text-base text-sm">
                  {pricingFilter.map((items) => {
                    return (
                      <button
                        className={` sm:px-10 px-7 py-3 rounded-md hover:bg-nav/20 transition-all ease-in-out duration-300 capitalize ${
                          items.value === pricing ? "bg-nav/20" : "bg-nav/10"
                        }`}
                        key={items.value}
                        onClick={() => {
                          handlePricing(items.value);
                        }}
                      >
                        {items.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

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
              onChange={handleSearch}
            />
          </div>

          <div className="w-full mx-auto grid 2xl:grid-cols-4 lg:grid-cols-3 gap-8 md:grid-cols-2 items-center mt-10">
            {unlockedQuery.isLoading ? (
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
            {lockedQuery.isLoading ? (
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
