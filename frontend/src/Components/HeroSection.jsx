import Banner from "../Assests/banners/banner.png";
import SearchBar from "./SearchBar";

const HeroSection = () => {
    return (
        <div className="relative">
            <img
                src={Banner}
                alt="Banner"
                className="w-full h-140" />
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <SearchBar />
            </div>
        </div>
    )
}

export default HeroSection;