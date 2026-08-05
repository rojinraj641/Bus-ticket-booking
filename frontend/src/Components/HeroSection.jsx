import Banner from "../Assests/banners/banner.png";
import SearchBar from "./SearchBar";
import useMediaQuery from "../Hooks/useMediaQuery";

const HeroSection = () => {
    const isMobile = useMediaQuery('(max-width: 767px)');

    return (
        <div className={`relative ${isMobile ? 'bg-[#3B82F6] h-full pt-22' : ''}`}>
            {!isMobile && (
                <img
                    src={Banner}
                    alt="Banner"
                    className="w-full h-140"
                />
            )}
            <div className={isMobile ? '' : 'absolute bottom-10 left-1/2 -translate-x-1/2'}>
                <SearchBar />
            </div>
        </div>
    );
};

export default HeroSection;