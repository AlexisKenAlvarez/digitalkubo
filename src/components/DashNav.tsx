import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const DashNav = () => {
  const router = useRouter();
  console.log(router.pathname);

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
    <div className="w-full flex flex-row border-b-2 border-black/10">
      <div className="flex gap-x-4 p-4 ">
        {dashLink.map((items, i) => {
          return (
            <Link
              key={items.name}
              href={items.link}
              className={`${
                router.pathname === items.link ? "text-nav" : "text-black "
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
