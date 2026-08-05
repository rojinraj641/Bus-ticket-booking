import { MapPin } from "lucide-react";

import bangalore from "../Assests/cities/bangalore.jpg";
import coimbatore from "../Assests/cities/coimbatore.jpg";
import goa from "../Assests/cities/goa.jpg";
import hyderabad from "../Assests/cities/hyderabad.jpg";

const HomeCard = () => {
  const cities = [
    {
      name: "Bangalore",
      image: bangalore,
    },
    {
      name: "Coimbatore",
      image: coimbatore,
    },
    {
      name: "Goa",
      image: goa,
    },
    {
      name: "Hyderabad",
      image: hyderabad,
    },
  ];

  return (
    <section className="py-20 px-8 bg-white">
      <h2 className="text-5xl font-bold text-center text-[#111827]">
        Top Travelled Places
      </h2>

      <p className="text-center text-gray-500 text-lg mt-4 mb-14">
        Discover the most popular destinations across India.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cities.map((city) => (
          <div
            key={city.name}
            className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
          >
            {/* Image */}
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

            {/* City Details */}
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={20} />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Popular Destination
                </span>
              </div>

              <h3 className="text-3xl font-bold">
                {city.name}
              </h3>

              <p className="text-sm text-gray-200 mt-1">
                Explore routes →
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeCard;