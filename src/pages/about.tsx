import About from "@/views/about/About";
import Subscribe from "@/views/about/Subscribe";
import Team from "@/views/about/Team";
import What from "@/views/about/What";

const about = () => {
  return (
    <div className="w-full min-h-screen h-auto">
      <About />
      <What />
      <Team />
      <Subscribe />
    </div>
  );
};

export default about;
