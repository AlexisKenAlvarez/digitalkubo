import About from "@/views/about/About";
import Location from "@/views/about/Location";
import Subscribe from "@/views/about/Subscribe";
// import Team from "@/views/about/Team";
import What from "@/views/about/What";

const about = () => {
  return (
    <div className="w-full min-h-screen h-auto">
      <About />
      <What />
      <Location />
    </div>
  );
};

export default about;
