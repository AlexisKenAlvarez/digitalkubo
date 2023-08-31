import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full p-5 h-auto  text-white flex items-center justify-between">
      <p className="text-sm  tracking-widest text-black flex">
        ALL RIGHTS RESERVED © 2023 DIGITALKUBO{" "}
      </p>
      <p className="text-black text-sm tracking-widest ">
        {" "}
        <Link href="/privacy" className="hover:text-[#D1770E]">PRIVACY POLICY</Link> | <Link href="/tos" className="hover:text-[#D1770E]">TERMS AND CONDITIONS</Link>
      </p>
    </footer>
  );
};

export default Footer;
