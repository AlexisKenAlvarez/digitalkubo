import { HelpCircle, HelpingHand, Lamp, Phone } from "lucide-react";
import { BiSolidDashboard, BiSolidPlusSquare } from "react-icons/bi";

export const registerList: inputInterface[] = [
  {
    label: "Email",
    id: "email",
    placeholder: "test@example.com",
    type: "text",
  },
  {
    label: "Password",
    id: "password",
    placeholder: "***********",
    type: "password",
  },
  {
    label: "Confirm password",
    id: "confirm",
    placeholder: "***********",
    type: "password",
  },
];

export const loginList: inputInterface[] = [
  {
    label: "Email",
    id: "email",
    placeholder: "test@example.com",
    type: "text",
  },
  {
    label: "Password",
    id: "password",
    placeholder: "***********",
    type: "password",
  },
];

export const resetList: inputInterface[] = [
  {
    label: "Email",
    id: "email",
    placeholder: "test@example.com",
    type: "text",
  },
];

export const changeList: inputInterface[] = [
  {
    label: "Password",
    id: "password",
    placeholder: "***********",
    type: "password",
  },
  {
    label: "Confirm password",
    id: "confirm",
    placeholder: "***********",
    type: "password",
  },
];

export const navList = [
  {
    label: "About",
    slug: "/about",
    icon: <Lamp className="mr-2 h-4 w-4" />,
  },
  {
    label: "Faq",
    slug: "/faq",
    icon: <HelpCircle className="mr-2 h-4 w-4" />,
  },
];

export const menuList = [
  {
    label: "Dashboard",
    link: "/admin",
    icon: <BiSolidDashboard />,
  },
  {
    label: "Create ACP",
    link: "/admin/create",
    icon: <BiSolidPlusSquare />,
  },
];

export const dateFilter = [
  {
    label: "Oldest First",
    value: "desc",
  },
  {
    label: "Newest First",
    value: "asc",
  },
];

export const titleFilter = [
  {
    label: "Ascending",
    value: "asc",
  },
  {
    label: "Descending",
    value: "desc",
  },
];

export const pricingFilter = [
  {
    label: "Paid",
    value: "paid",
  },
  {
    label: "Free",
    value: "free",
  },
];

