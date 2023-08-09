import LeftMenu from "@/components/admin/LeftMenu";
import TopMenu from "@/components/admin/TopMenu";


const index = () => {

    return (
        <div className="bg-[#F3F3F3] flex lg:flex-row flex-col">
            <LeftMenu />
            <div className="w-full h-20 bg-white lg:hidden block py-5 px-2">
                <TopMenu />
            </div>
            <div className="w-full">
                <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center lg:px-4 py-4 ">
                    {/* INSERT CODE BELOW */}
                    <div className="w-full h-full  bg-white">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default index;