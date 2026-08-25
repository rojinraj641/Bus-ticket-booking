import { useSelector } from "react-redux";
import { useMemo } from "react";
import { Bus, MapPin, Route } from "lucide-react";
import SeaterSeats from "./SeaterSeats";
import SleeperSeats from "./SleeperSeats";
import PriceBreakout from "./PriceBreakout";

const SeatSelection = () => {
  const { busList } = useSelector((state) => state.bus);
  const { busId } = useSelector((state) => state.busId);
  const { seats } = useSelector((state) => state.seats);

  const bus = useMemo(
    () => busList.find((b) => b._id === busId),
    [busList, busId]
  );

  const isSleeper = useMemo(
    () => bus?.busType?.toLowerCase().includes("sleeper"),
    [bus]
  );

  const hasSeats = seats && seats.length > 0;

  if (!bus || !hasSeats) return null;

  return (
    <div className="w-full mx-auto max-w-7xl">
      {/* ===================== Bus Header ===================== */}
      {/* <div className="mb-6 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <Bus className="w-5 h-5 text-[#2563EB]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#111827]">
              {bus.busName}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-0.5">
              <span className="px-2.5 py-0.5 bg-blue-50 text-[#2563EB] rounded text-xs font-medium">
                {bus.busNumber}
              </span>
              <span className="px-2.5 py-0.5 bg-slate-100 text-[#4B5563] rounded text-xs">
                {bus.busType}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#4B5563]">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#2563EB]" />
            <span className="font-medium text-[#111827]">{boarding}</span>
            <span className="text-[#9CA3AF]">→</span>
            <span className="font-medium text-[#111827]">{destination}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Route className="w-4 h-4 text-[#9CA3AF]" />
            <span>{bus.distance} km</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-[#111827]">{bus.departureTime}</span>
            <span className="text-[#9CA3AF]">→</span>
            <span className="font-medium text-[#111827]">{bus.arrivalTime}</span>
          </div>
        </div>
      </div> */}

      {/* ===================== Layout Grid ===================== */}
      {/* Desktop: Seat Map (2/3) | Price Breakout (1/3) */}
      {/* Mobile: Seat Map on top | Price Breakout bottom bar (handled by component) */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
        {/* Seat Map */}
        <div className="pb-[80px] lg:pb-0">
          {isSleeper ? <SleeperSeats /> : <SeaterSeats />}
        </div>

        {/* Price Breakout */}
        <div>
          <PriceBreakout />
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
