import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import {
  Armchair,
  Lock,
  User,
  Check,
  Bus,
  Users,
  BadgeCheck,
  CircleDot,
  Venus,
  Mars,
} from "lucide-react";
import { toggleSeatSelection } from "../Features/Seats/selectedSeatsSlice.js";

const TOTAL_SEATS = 45;
const SEATS_PER_ROW = 5;
const LEFT_SIDE_COUNT = 2;
const TOTAL_ROWS = Math.ceil(TOTAL_SEATS / SEATS_PER_ROW); // 9

// Simple, actual steering-wheel icon (Lucide has no bus/car wheel icon)
const DriverWheel = ({ className = "w-8 h-8" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
    <line x1="12" y1="3" x2="12" y2="9.8" />
    <line x1="5.1" y1="16" x2="10.3" y2="13.3" />
    <line x1="18.9" y1="16" x2="13.7" y2="13.3" />
  </svg>
);

const SeaterSeats = () => {
  const { seats } = useSelector((state) => state.seats);
  const { seatIds } = useSelector((state) => state.selectedSeats);
  const { busId } = useSelector((state) => state.busId);
  const dispatch = useDispatch();

  const seatMap = useMemo(() => {
    const map = {};

    if (seats && seats.length > 0) {
      seats.forEach((seat) => {
        map[seat.seatNumber] = {
          id: seat._id,
          seatNumber: seat.seatNumber,
          status: seat.status || "Available",
          deck: seat.deck || 1,
          genderRestriction: seat.genderRestriction || null,
        };
      });
    }

    for (let i = 1; i <= TOTAL_SEATS; i++) {
      if (!map[i]) {
        map[i] = {
          id: `default-seat-${i}`,
          seatNumber: i.toString(),
          status: "Available",
          deck: 1,
          genderRestriction: null,
        };
      }
    }
    return map;
  }, [seats]);

  const rows = useMemo(() => {
    const result = [];
    for (let row = 0; row < TOTAL_ROWS; row++) {
      const left = [];
      const right = [];
      for (let col = 0; col < SEATS_PER_ROW; col++) {
        const idx = row * SEATS_PER_ROW + col + 1;
        const seat = seatMap[idx];
        if (col < LEFT_SIDE_COUNT) {
          left.push(seat);
        } else {
          right.push(seat);
        }
      }
      result.push({ rowIndex: row + 1, left, right });
    }
    return result;
  }, [seatMap]);

  const isSelected = (seat) => seatIds.includes(seat.id);

  // Single click -> select only (no-op if already selected)
  const handleSeatSelect = (seat) => {
    if (seat.status !== "Available") return;
    dispatch(toggleSeatSelection({ busId, seatId: seat.id }));
  };

  const statusCounts = useMemo(() => {
    const c = { available: 0, booked: 0, locked: 0, selected: 0 };
    Object.values(seatMap).forEach((s) => {
      if (s.status === "Available") c.available++;
      else if (s.status === "Locked") c.locked++;
      else if (s.status === "Booked") c.booked++;
    });
    c.selected = seatIds.length;
    return c;
  }, [seatMap, seatIds]);

  const getSeatVariant = (seat) => {
    if (seat.status === "Booked") return "booked";
    if (seat.status === "Locked") return "locked";
    if (isSelected(seat)) return "selected";
    return "available";
  };

  const renderSeat = (seat) => {
    const variant = getSeatVariant(seat);
    const isBooked = variant === "booked";
    const isLocked = variant === "locked";
    const isSel = variant === "selected";
    const isDisabled = isBooked || isLocked;

    let bgClass = "";
    let borderClass = "";
    let textClass = "";
    let iconComp = null;
    let interactiveClass = "";

    if (isBooked) {
      bgClass = "bg-slate-200";
      borderClass = "border-2 border-slate-300";
      textClass = "text-slate-500";
      iconComp = <User className="w-3.5 h-3.5 text-slate-400" />;
      interactiveClass = "cursor-default";
    } else if (isLocked) {
      bgClass = "bg-amber-50";
      borderClass = "border-2 border-amber-200";
      textClass = "text-amber-700";
      iconComp = <Lock className="w-3.5 h-3.5 text-amber-500" />;
      interactiveClass = "cursor-not-allowed";
    } else if (isSel) {
      bgClass = "bg-blue-500";
      borderClass = "border-2 border-blue-600";
      textClass = "text-white";
      iconComp = <Check className="w-3.5 h-3.5 text-white" />;
      interactiveClass = "cursor-pointer hover:bg-blue-600";
    } else {
      bgClass = "bg-green-50";
      borderClass = "border-2 border-green-200";
      textClass = "text-green-700";
      iconComp = <Armchair className="w-3.5 h-3.5 text-green-400" />;
      interactiveClass =
        "cursor-pointer hover:bg-green-100 hover:border-green-400";
    }

    const genderIcon =
      seat.genderRestriction === "Female" ? (
        <Venus className="w-2.5 h-2.5 text-pink-500 absolute -top-1 -right-1 bg-white rounded-full" />
      ) : seat.genderRestriction === "Male" ? (
        <Mars className="w-2.5 h-2.5 text-blue-500 absolute -top-1 -right-1 bg-white rounded-full" />
      ) : null;

    return (
      <div key={seat.id} className="relative inline-flex">
        <button
          onClick={() => handleSeatSelect(seat)}
          disabled={isDisabled}
          className={`relative flex flex-col items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg font-semibold text-[11px] md:text-xs transition-all duration-150 ${bgClass} ${borderClass} ${textClass} ${interactiveClass}`}
          title={`${seat.seatNumber} - ${seat.status}`}
        >
          {iconComp}
          <span className="mt-0.5">{seat.seatNumber}</span>
          {genderIcon}
        </button>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* ===================== Bus Body ===================== */}
      <div className="relative bg-gradient-to-b from-blue-50 to-white rounded-xl border border-blue-100 shadow-md px-2.5 py-3 md:px-6 md:py-4">
        {/* Driver Area */}
        <div className="flex items-center justify-end pr-48 gap-2 mb-3 pb-2 border-b border-blue-50">
          <DriverWheel className="w-6 h-6 md:w-7 md:h-7 text-slate-600" />
          <span className="text-[11px] md:text-xs font-semibold text-slate-500 tracking-wide">
            DRIVER
          </span>
        </div>

        {/* Seat Grid */}
        <div className="space-y-1.5 md:space-y-2">
          {rows.map((row) => (
            <div
              key={row.rowIndex}
              className="flex items-center justify-center gap-1 md:gap-1.5"
            >
              {/* Row Number */}
              <div className="w-5 text-center text-[11px] font-medium text-[#9CA3AF]">
                {row.rowIndex}
              </div>

              {/* Left Side Seats (3) */}
              <div className="flex items-center gap-1">
                {row.left.map((seat) => renderSeat(seat))}
              </div>

              {/* Aisle */}
              <div className="w-4 md:w-6 h-1 border-t-2 border-dashed border-blue-100 opacity-60" />

              {/* Right Side Seats (2) */}
              <div className="flex items-center gap-1">
                {row.right.map((seat) => renderSeat(seat))}
              </div>

              {/* Window indicator */}
              <div className="w-4 flex justify-end">
                <div className="w-3 h-4 md:w-3.5 md:h-4.5 rounded-b-md bg-blue-100 border-l border-t border-blue-200" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== Legend ===================== */}
      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="flex items-center gap-2 justify-center">
          <div className="w-6 h-6 rounded-md bg-green-50 border-2 border-green-200 flex items-center justify-center">
            <Armchair className="w-3 h-3 text-green-400" />
          </div>
          <span className="text-xs font-medium text-[#4B5563]">Available</span>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <div className="w-6 h-6 rounded-md bg-blue-500 border-2 border-blue-600 flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-medium text-[#4B5563]">Selected</span>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <div className="w-6 h-6 rounded-md bg-amber-50 border-2 border-amber-200 flex items-center justify-center">
            <Lock className="w-3 h-3 text-amber-500" />
          </div>
          <span className="text-xs font-medium text-[#4B5563]">Locked</span>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <div className="w-6 h-6 rounded-md bg-slate-200 border-2 border-slate-300 flex items-center justify-center">
            <User className="w-3 h-3 text-slate-400" />
          </div>
          <span className="text-xs font-medium text-[#4B5563]">Booked</span>
        </div>
      </div>

      {/* ===================== Summary Bar ===================== */}
      <div className="mt-3 bg-white rounded-lg border border-slate-200 p-2.5 md:p-3">
        <div className="flex flex-wrap gap-3 justify-center items-center">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#2563EB]" />
            <span className="text-sm font-medium text-[#111827]">
              Selected:{" "}
              <span className="text-[#2563EB]">
                {statusCounts.selected}/{TOTAL_SEATS}
              </span>
            </span>
          </div>
          <div className="w-px h-5 bg-slate-200" />
          <div className="flex items-center gap-4 text-xs text-[#4B5563]">
            <span className="flex items-center gap-1">
              <BadgeCheck className="w-3.5 h-3.5 text-green-500" />
              {statusCounts.available} Available
            </span>
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              {statusCounts.locked} Locked
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              {statusCounts.booked} Booked
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeaterSeats;