import React from 'react';
import Header from '../Components/Header'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import HomeCard from '../Components/HomeCard'
const Home = () => {

  return (
    <>
      <Navbar />
      <Header />
      <section>
        <h3 className='flex justify-center font-semibold text-xl mt-5 mb-9'>Top Travelled Bus Routes</h3>
        <div className="flex flex-wrap justify-center gap-10 mb-12 mt-8 px-4">
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;

