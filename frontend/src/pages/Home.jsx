import HeroSection from "../Components/HeroSection";
import Navbar from "../Components/Navbar";
import HomeCard from "../Components/HomeCard";
import WhyChooseUs from "../Components/WhyChooseUs";
import Footer from "../Components/Footer";
import AuthModal from "../Components/AuthModal";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <HeroSection />
      <HomeCard />
      <WhyChooseUs />
      <Footer />
      <AuthModal />
    </div>
  )
}
export default Home;