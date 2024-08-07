import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const DashNav = () => {
  const router = useRouter();

  const dashLink = [
    {
      name: "RECIPES",

      link: "/home",
    },
    {
      name: "PROFILE",

      link: "/profile",
    },
  ];
  return (
    <div className="w-full flex flex-row border-b-2 border-black/10 container ">
      <div className="flex gap-x-6 ">
        {dashLink.map((items, i) => {
          return (
            <Link
              key={items.name}
              href={items.link}
              className={`${
                router.pathname === items.link
                  ? "text-nav border-b-2 pb-3 font-bold"
                  : "text-black pb-3 "
              }`}
            >
              {items.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DashNav;
