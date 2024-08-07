import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import { ColumnData } from "@/components/admin/Columns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { debounce } from "lodash";
import { BiSolidDownArrow } from "react-icons/bi";
import { dateFilter, titleFilter, pricingFilter } from "@/lib/list";
import ActionPlanSkeleton from "@/skeleton/ActionPlanSkeleton";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AP = () => {
  const [search, setSearching] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [titleOrder, setTitleOrder] = useState("");
  const [pricing, setPricingFilter] = useState("");
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    <section className="w-full">
      <div className="w-full scroll-smooth" id="AP">
        <div className="w-full text-center">
          <h1 className="font-primary text-[#D1770E] text-[30px] md:text-[60px] lg:text-[80px] font-bold px-4 py-2">
            ACTION PLANS
          </h1>
          <p className="font-secondary text-[16px] text-[#0000004f] w-[72%] text-end">
            As of August 3, 2023
          </p>
        </div>
        <div className="flex align justify-center">
          <Button className="rounded-sm text-center mt-4 md:mt-0">
            <Image
              className="mt-1"
              src="/material-symbols_search.png"
              alt="search"
              width="40"
              height="25"
            ></Image>
          </Button>

          {/*SEARCH BAR*/}
          <Input
            className="w-[45%] mt-4 md:mt-0 border-nav outline-0 focus-visible:ring-0 rounded-none bg-transparent"
            type="search"
            placeholder="Search"
            onChange={handleSearch}
          />
          <Button className="rounded-sm text-center mt-4 md:mt-0" onClick={handleFilterState}>
            <Image
              className="mt-1"
              src="/material-symbols_filter.png"
              alt="search"
              width="25"
              height="25"
            ></Image>
            <BiSolidDownArrow
                className={`ml-2 transition-all ease-in-out duration-300 ${
                  filterOpen ? "" : "rotate-180"
                }`}
              />
          </Button>
        </div>
        <AlertDialog open={isOpen}>
              <AlertDialogContent className="border-[#D1770E] border-2 pt-0 pb-6 px-0">
                <AlertDialogCancel
                  onClick={handleClose}
                  className="border-0 text-right justify-end ml-auto hover:bg-white text-[18px]"
                >
                  x
                </AlertDialogCancel>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-primary md:text-[32px] text-[28px] text-center md:px-10 leading-8">
                    Please log in first to view these contents
                  </AlertDialogTitle>
                  <AlertDialogDescription className="font-secondary text-[#64748B] px-2 md:px-6 py-4 text-center">
                    This content is only available for our beloved users. We
                    encourage you to create an account or login to access these
                    action plans.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className=" sm:mx-auto sm:items-center gap-x-4 pb-4 md:pb-10 md:pl-4 gap-y-2">
                  <AlertDialogAction className="font-secondary text-white shadow-lg">
                    <Link href="/auth/login/">Log In</Link>
                  </AlertDialogAction>
                  <p className="font-secondary text-[#64748B] text-center">
                    or
                  </p>
                  <AlertDialogAction className="font-secondary border-2 border-[#D1770E] bg-[#ffffff] text-[#D1770E] hover:text-white shadow-lg">
                    <Link href="/auth/signup/">Create an account</Link>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        <div className="w-full h-full relative">
          <Image
            src="/bg.webp"
            height={20}
            width={20}
            alt="/"
            className="absolute top-0 left-0 object cover w-full h-full object-top"
          />
          <div className=" w-[full] min-h-auto container relative z-10 pb-24">
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
                            items.value === sortOrder
                              ? "bg-nav/20"
                              : "bg-nav/10"
                          }`}
                          key={items.value}
                          onClick={() => {
                            handleSortOrder({
                              value: items.value,
                              type: "date",
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
                  <h2 className="">Filter by Title</h2>
                  <div className="flex gap-x-5 items-center mt-2 sm:text-base text-sm">
                    {titleFilter.map((items) => {
                      return (
                        <button
                          className={` sm:px-10 px-7 py-3 rounded-md hover:bg-nav/20 transition-all ease-in-out duration-300 capitalize ${
                            items.value === titleOrder
                              ? "bg-nav/20"
                              : "bg-nav/10"
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
                  <h2 className="">Filter by Category</h2>
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
            <p className="font-primary font-medium md:text-[18px] mt-2">Most Suggested</p>
            <div className="w-full mx-auto grid 2xl:grid-cols-4 lg:grid-cols-3 gap-8 md:grid-cols-2 items-center mt-5">
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
                      <div className="max-w-[24rem] w-full h-[11rem] bg-nav/10 shadow-md rounded-xl border-[1px] md:border-nav/20 flex sm:flex-row flex-col pt-5 md:pl-5 md:border-t-0 border-t-[0.8rem] border-nav" onClick={handleOpen} key={i}>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AP;
