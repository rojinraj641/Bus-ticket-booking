import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SortAndFilter from "../Components/SortAndFilter";
import BusInfo from "../Components/BusInfo";
import { useState } from "react";
import clsx from "clsx";

const FilteredResult = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= FIXED HEADER ================= */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <Navbar />
        <Header />
      </div>

      {/* ================= MOBILE FILTER BUTTON ================= */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-[340px] z-40
                   flex items-center gap-2 px-5 py-3 ml-3
                   border rounded-lg bg-white text-black shadow-xl"
      >
        ☰ Filters
      </button>

      {/* ================= MOBILE OVERLAY ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= MOBILE FILTER DRAWER ================= */}
      <div
        className={clsx(
          "fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg",
          "transform transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          "md:hidden"
        )}
      >
        <SortAndFilter />
      </div>

      {/* ================= MAIN GRID ================= */}
      <div
        className="
          pt-[380px]             /* mobile header offset */
          md:pt-[165px]          /* keep same if header height is same */
          h-screen
          grid
          grid-cols-1
          md:grid-cols-[320px_1fr]
          overflow-hidden
        "
      >
        {/* ===== DESKTOP FILTER ===== */}
        <aside className="hidden md:block border-r p-6 overflow-y-auto">
          <SortAndFilter />
        </aside>

        {/* ===== CONTENT GRID ===== */}
        <main
          className="
            grid
            grid-rows-[auto_1fr]
            overflow-y-auto no-scrollbar
            px-3 sm:px-4 lg:px-6 py-4
          "
        >
          {/* RESULTS HEADER (NON-SCROLLING) */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Search Results
            </h2>
            <p className="text-gray-600 text-sm">
              Find the best bus options for your journey
            </p>
          </div>

          {/* BUS LIST (ONLY THIS SCROLLS ON MOBILE) */}
          <div className="overflow-y-auto no-scrollbar">
            <BusInfo />
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default FilteredResult;

