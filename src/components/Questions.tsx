import { useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";

const Questions = ({ title, desc }: { title: string; desc: string }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked((current) => !current);
  };

  return (
    <button
      className={`max-w-[45rem] rounded-lg border-[1px] border-nav ${
        clicked ? "border-button" : "border-nav"
      }`}
      onClick={handleClick}
    >
      <div
        className={`bg-nav w-full p-5 flex items-center justify-between rounded-md text-white ${
          clicked ? "bg-[#8E5C44]" : "bg-nav"
        }`}
      >
        <h1 className=" font-primary">{title}</h1>
        <BiSolidDownArrow
          className={`transition-all ease-in-out duration-300 ${
            clicked ? "rotate-0" : "rotate-180"
          }`}
        />
      </div>
      <div
        className={`w-full h-full overflow-hidden transition-all ease-in-out duration-300 ${
          clicked ? "max-h-[20rem] p-4" : "max-h-0 p-0"
        }`}
      >
        <p className="font-secondary text-black/50">{desc}</p>
      </div>
    </button>
  );
};

export default Questions;
