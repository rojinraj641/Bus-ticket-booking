import trivandrum from "../assets/cities/trivandrum.jpg";
import bangalore from "../assets/cities/bangalore.jpg";
import goa from "../assets/cities/goa.jpg";
import hyderabad from "../assets/cities/hyderabad.jpg";
import pune from "../assets/cities/pune.jpg";
import vijayawada from "../assets/cities/vijayawada.jpg";
import coimbatore from "../assets/cities/coimbatore.jpg";
import jaipur from "../assets/cities/jaipur.jpg";
import nagpur from "../assets/cities/nagpur.jpg";

import {
  boardingPoint as setBoardingPoint,
  destinationPoint as setDestinationPoint,
} from "../Features/Search/searchSlice.js";

import { useDispatch } from "react-redux";

const HomeCard = ({ boardingPoint, droppingPoint }) => {
  const cityImages = {
    Trivandrum: trivandrum,
    Bangalore: bangalore,
    Goa: goa,
    Hyderabad: hyderabad,
    Pune: pune,
    Vijayawada: vijayawada,
    Coimbatore: coimbatore,
    Jaipur: jaipur,
    Nagpur: nagpur,
  };

  const dispatch = useDispatch();

  const handleCardClick = () => {
    dispatch(setBoardingPoint(boardingPoint));
    dispatch(setDestinationPoint(droppingPoint));
  };

  return (
    <div
      className="w-64 border border-gray-300 sm:w-72 md:w-80 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 shadow-xl rounded-lg overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="h-48 sm:h-56 w-full">
        <img
          src={cityImages[droppingPoint]}
          alt={droppingPoint}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-sky-800 p-3 text-white">
        <p className="font-bold text-sm sm:text-base">Buses From</p>
        <p className="text-sm sm:text-base">
          From {boardingPoint} to {droppingPoint}
        </p>
      </div>
    </div>
  );
};

export default HomeCard;