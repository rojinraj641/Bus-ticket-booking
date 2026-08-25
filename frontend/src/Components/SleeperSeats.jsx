import { useSelector, useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import {
  Lock,
  User,
  Check,
  Bus,
  Layers,
  ChevronUp,
  ChevronDown,
  CircleDot,
  Users,
  BadgeCheck,
  Venus,
  Mars,
} from "lucide-react";
import { toggleSeatSelection } from "../Features/Seats/selectedSeatsSlice.js";

const DEFAULT_TOTAL_SEATS = 30;
const SEATS_PER_ROW = 3;
const LEFT_SIDE_COUNT = 1;

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

const SleeperSeats = () => {
  const { seats } = useSelector((state) => state.seats);
  const { seatIds } = useSelector((state) => state.selectedSeats);
  const { busId } = useSelector((state) => state.busId);
  const dispatch = useDispatch();

  const [activeDeck, setActiveDeck] = useState("all");

  const seatMap = useMemo(() => {
    const map = {};

    if (seats && seats.length > 0) {
      const hasUpperDeck = seats.some((seat) => seat.deck === 2);

      if (hasUpperDeck && seats.length > 1) {
        const halfCount = Math.floor(seats.length / 2);
        const sortedSeats = [...seats].sort((a, b) => {
          const aNum = Number(a.seatNumber);
          const bNum = Number(b.seatNumber);
          if (isNaN(aNum) || isNaN(bNum)) return 0;
          return aNum - bNum;
        });

        sortedSeats.forEach((seat, index) => {
          const deck = index >= halfCount ? 2 : 1;
          map[seat.seatNumber] = {
            id: seat._id,
            seatNumber: seat.seatNumber,
            status: seat.status || "Available",
            deck: deck,
            genderRestriction: seat.genderRestriction || null,
          };
        });
      } else {
        seats.forEach((seat) => {
          map[seat.seatNumber] = {
            id: seat._id,
            seatNumber: seat.seatNumber,
            status: seat.status || "Available",
            deck: 1,
            genderRestriction: seat.genderRestriction || null,
          };
        });
      }
    }

    for (let i = 1; i <= DEFAULT_TOTAL_SEATS; i++) {
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

  const deckData = useMemo(() => {
    const upper = [];
    const lower = [];

    Object.values(seatMap).forEach((seat) => {
      const entry = {
        id: seat.id,
        seatNumber: seat.seatNumber,
        status: seat.status,
        genderRestriction: seat.genderRestriction,
      };
      if (seat.deck === 2) {
        upper.push(entry);
      } else {
        lower.push(entry);
      }
    });

    upper.sort((a, b) => Number(a.seatNumber) - Number(b.seatNumber));
    lower.sort((a, b) => Number(a.seatNumber) - Number(b.seatNumber));

    const hasUpper = upper.length > 0;
    const hasLower = lower.length > 0;

    const arrangeRows = (deckSeats) => {
      const rows = [];
      for (let i = 0; i < deckSeats.length; i += SEATS_PER_ROW) {
        const chunk = deckSeats.slice(i, i + SEATS_PER_ROW);
        const left = chunk.slice(0, LEFT_SIDE_COUNT);
        const right = chunk.slice(LEFT_SIDE_COUNT, SEATS_PER_ROW);
        rows.push({ left, right });
      }
      return rows;
    };

    return {
      upper,
      lower,
      upperRows: arrangeRows(upper),
      lowerRows: arrangeRows(lower),
      hasUpper,
      hasLower,
      hasBoth: hasUpper && hasLower,
      totalSeats: upper.length + lower.length,
    };
  }, [seatMap]);

  const isSelected = (seat) => seatIds.includes(seat.id);

  // Single click -> select only (no-op if already selected)
  const handleSeatSelect = (seat) => {
    if (seat.status !== "Available") return;
    if (!isSelected(seat)) {
      dispatch(toggleSeatSelection({ busId, seatId: seat.id }));
    }
  };

  // Double click -> deselect only (no-op if not selected)
  const handleSeatDeselect = (seat) => {
    if (seat.status !== "Available") return;
    if (isSelected(seat)) {
      dispatch(toggleSeatSelection({ busId, seatId: seat.id }));
    }
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

  const DeckBadge = ({ deck }) => {
    if (deck === "upper") {
      return (
        <div className="inline-flex items-center gap-1 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
          <ChevronUp className="w-3 h-3" />
          Upper Berth
        </div>
      );
    }
    return (
      <div className="inline-flex items-center gap-1 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
        <ChevronDown className="w-3 h-3" />
        Lower Berth
      </div>
    );
  };

  // Berth-shaped seat: rectangle body + pillow notch at the top.
  // Click -> select. Double-click -> deselect.
  const renderSeat = (seat, size = "md") => {
    const variant = getSeatVariant(seat);
    const isBooked = variant === "booked";
    const isLocked = variant === "locked";
    const isSelectedSeat = variant === "selected";
    const isDisabled = isBooked || isLocked;

    const sizeClass =
      size === "sm"
        ? "w-11 h-8 text-[10px]"
        : "w-14 h-9 md:w-16 md:h-10 text-[11px] md:text-xs";

    let bgClass = "";
    let borderClass = "";
    let textClass = "";
    let pillowClass = "";
    let interactiveClass = "";

    if (isBooked) {
      bgClass = "bg-slate-200";
      borderClass = "border-2 border-slate-300";
      textClass = "text-slate-500";
      pillowClass = "bg-slate-300";
      interactiveClass = "cursor-default";
    } else if (isLocked) {
      bgClass = "bg-amber-50";
      borderClass = "border-2 border-amber-200";
      textClass = "text-amber-700";
      pillowClass = "bg-amber-200";
      interactiveClass = "cursor-not-allowed";
    } else if (isSelectedSeat) {
      bgClass = "bg-blue-500";
      borderClass = "border-2 border-blue-600";
      textClass = "text-white";
      pillowClass = "bg-blue-300";
      interactiveClass = "cursor-pointer hover:bg-blue-600";
    } else {
      bgClass = "bg-green-50";
      borderClass = "border-2 border-green-200";
      textClass = "text-green-700";
      pillowClass = "bg-green-200";
      interactiveClass =
        "cursor-pointer hover:bg-green-100 hover:border-green-400";
    }

    const genderIcon =
      seat.genderRestriction === "Female" ? (
        <Venus className="absolute -top-1 -right-1 w-2.5 h-2.5 text-pink-500 bg-white rounded-full" />
      ) : seat.genderRestriction === "Male" ? (
        <Mars className="absolute -top-1 -right-1 w-2.5 h-2.5 text-blue-500 bg-white rounded-full" />
      ) : null;

    return (
      <div key={seat.id} className="relative inline-flex">
        <button
          onClick={() => handleSeatSelect(seat)}
          onDoubleClick={() => handleSeatDeselect(seat)}
          disabled={isDisabled}
          className={`relative flex flex-col items-center ${sizeClass} rounded-md font-semibold transition-all duration-150 ${bgClass} ${borderClass} ${textClass} ${interactiveClass} overflow-hidden`}
          title={
            isDisabled
              ? `${seat.seatNumber} - ${seat.status}`
              : isSelectedSeat
              ? `${seat.seatNumber} - Double-click to deselect`
              : `${seat.seatNumber} - Click to select`
          }
        >
          {/* pillow notch */}
          <div className={`w-4 h-1 md:w-5 md:h-1.5 rounded-full mt-1 ${pillowClass}`} />
          <div className="flex-1 flex items-center justify-center gap-0.5">
            {isBooked && <User className="w-3 h-3 text-slate-400" />}
            {isLocked && <Lock className="w-3 h-3 text-amber-500" />}
            {isSelectedSeat && <Check className="w-3 h-3 text-white" />}
            <span>{seat.seatNumber}</span>
          </div>
          {genderIcon}
        </button>
      </div>
    );
  };

  // Header badge for a deck column
  const renderDeckHeader = (deckLabel) => (
    <div className="flex items-center justify-center mb-2">
      <DeckBadge deck={deckLabel} />
    </div>
  );

  // Single berth row: left seat + aisle + right seats + window.
  // `row` can be null to render an invisible placeholder row (keeps
  // upper/lower columns aligned when deck seat counts differ).
  const renderBerthRow = (row, size, key) => {
    const placeholderClass =
      size === "sm" ? "w-11 h-8" : "w-14 h-9 md:w-16 md:h-10";

    return (
      <div key={key} className="flex items-center justify-center gap-1 md:gap-1.5">
        {/* Left Side - 1 berth */}
        <div className="flex items-center gap-1">
          {row ? (
            row.left.map((seat) => renderSeat(seat, size))
          ) : (
            <div className={placeholderClass} />
          )}
        </div>

        {/* Aisle */}
        <div className="w-4 md:w-6 h-1 border-t-2 border-dashed border-blue-100 opacity-50" />

        {/* Right Side - 2 berths */}
        <div className="flex items-center gap-1">
          {row ? (
            row.right.map((seat) => renderSeat(seat, size))
          ) : (
            <>
              <div className={placeholderClass} />
              <div className={placeholderClass} />
            </>
          )}
        </div>

        {/* Window indicator */}
        <div className="w-3 md:w-4 flex justify-end">
          <div className="w-2.5 h-3 md:w-3 md:h-4 rounded-b-md bg-blue-100 border-l border-t border-blue-200" />
        </div>
      </div>
    );
  };

  // Row-wise layout: upper deck column and lower deck column side by side,
  // with matching row indices aligned horizontally (instead of stacking
  // the whole upper block above the whole lower block).
  const renderDecksRowWise = () => {
    const showUpper = deckData.hasUpper && activeDeck !== "lower";
    const showLower = deckData.hasLower && activeDeck !== "upper";
    const size = deckData.hasBoth ? "sm" : "md";

    if (deckData.hasBoth && showUpper && showLower) {
      const rowCount = Math.max(
        deckData.upperRows.length,
        deckData.lowerRows.length
      );
      return (
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          <div>
            {renderDeckHeader("upper")}
            <div className="space-y-1.5 md:space-y-2">
              {Array.from({ length: rowCount }).map((_, idx) =>
                renderBerthRow(deckData.upperRows[idx] || null, size, `u-${idx}`)
              )}
            </div>
          </div>
          <div className="border-l border-blue-50 pl-3 md:pl-6">
            {renderDeckHeader("lower")}
            <div className="space-y-1.5 md:space-y-2">
              {Array.from({ length: rowCount }).map((_, idx) =>
                renderBerthRow(deckData.lowerRows[idx] || null, size, `l-${idx}`)
              )}
            </div>
          </div>
        </div>
      );
    }

    // Only one deck visible (single-deck bus, or a deck filter is active)
    const rows = showUpper ? deckData.upperRows : deckData.lowerRows;
    const label = showUpper ? "upper" : "lower";
    if (!rows || rows.length === 0) return null;

    return (
      <div>
        {renderDeckHeader(label)}
        <div className="space-y-1.5 md:space-y-2">
          {rows.map((row, idx) => renderBerthRow(row, size, idx))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* ===================== Header ===================== */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-0.5">
          <Bus className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg md:text-xl font-bold text-[#111827]">
            Sleeper Berth Selection
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-[#4B5563]">
          <span className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-blue-500" />
            {deckData.hasUpper && deckData.hasLower
              ? "Upper & Lower Deck"
              : deckData.hasUpper
              ? "Upper Deck Only"
              : "Lower Deck Only"}
          </span>
          <span>{deckData.totalSeats} Total Berths</span>
          {deckData.hasBoth && (
            <span className="flex items-center gap-1">
              <CircleDot className="w-3.5 h-3.5 text-green-500" />
              {deckData.upper.length} Upper / {deckData.lower.length} Lower
            </span>
          )}
        </div>
      </div>

      {/* Deck Toggle (only when both decks exist) */}
      {deckData.hasBoth && (
        <div className="mb-2 flex justify-center gap-1.5">
          {["all", "upper", "lower"].map((key) => (
            <button
              key={key}
              onClick={() => setActiveDeck(key)}
              className={`px-3 py-1 rounded-lg text-xs md:text-sm font-medium transition-all duration-150 ${
                activeDeck === key
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {key === "all"
                ? "All Decks"
                : key === "upper"
                ? "Upper Only"
                : "Lower Only"}
            </button>
          ))}
        </div>
      )}

      {/* ===================== Bus Body ===================== */}
      <div className="relative bg-gradient-to-b from-blue-50 to-white rounded-xl border border-blue-100 shadow-md px-2.5 py-3 md:px-6 md:py-4">
        {/* Driver Area */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-blue-50">
          <DriverWheel className="w-6 h-6 md:w-7 md:h-7 text-slate-600" />
          <span className="text-[11px] md:text-xs font-semibold text-slate-500 tracking-wide">
            DRIVER
          </span>
        </div>

        {renderDecksRowWise()}
      </div>

      {/* ===================== Legend ===================== */}
      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="flex items-center gap-2 justify-center">
          <div className="w-6 h-6 rounded-md bg-green-50 border-2 border-green-200" />
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
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-[#111827]">
              Selected:{" "}
              <span className="text-blue-600">
                {statusCounts.selected}/{deckData.totalSeats}
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

export default SleeperSeats;