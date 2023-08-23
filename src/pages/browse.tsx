import Hero from "@/views/browse/Hero";
import AP from "@/views/browse/AP";
const browse = () => {
    return (
        <>
            <div style={{
                backgroundImage: `url('bg.webp')`
            }}>
                <Hero/>
                <AP/>
            </div>
        </>
    );
}

export default browse;