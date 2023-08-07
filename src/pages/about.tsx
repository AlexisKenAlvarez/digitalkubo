import About from "@/views/about/About";
import Team from "@/views/about/Team";
import What from "@/views/about/What";

const about = () => {
    return (
        <div className="w-full min-h-screen h-auto">
            <About />
            <What />
            <Team />
        </div>
    );
}

export default about;