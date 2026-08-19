import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SortAndFilter from "../Components/SortAndFilter";
import BusInfo from "../Components/BusInfo";
import { useState } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSliders, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const FilteredResult = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm">
        <Navbar />
        <Header />
      </div>

      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-3 top-[360px] z-40 flex items-center gap-2 rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-[0_16px_30px_rgba(15,23,42,0.12)] transition hover:scale-[1.01] hover:border-blue-200 hover:text-blue-600 md:hidden"
      >
        <FontAwesomeIcon icon={faFilter} className="text-xs" />
        Filters
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={clsx(
          "fixed left-0 top-0 z-50 h-full w-[300px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.22)] transition-transform duration-300 ease-in-out md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
          <div className="flex items-center gap-2 text-slate-800">
            <FontAwesomeIcon icon={faSliders} className="text-blue-600" />
            <span className="text-sm font-semibold">Filters</span>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600"
            aria-label="Close filters"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
          </button>
        </div>
        <SortAndFilter />
      </div>

      <div
        className={clsx(
          "grid h-screen overflow-hidden pt-[380px] md:pt-[165px]",
          "grid-cols-1 md:grid-cols-[auto_1fr]"
        )}
      >
        <aside
          className={clsx(
            "hidden overflow-hidden border-r border-slate-200 bg-white shadow-sm md:block",
            desktopCollapsed ? "w-24" : "w-[300px]",
            "transition-all duration-300 ease-in-out"
          )}
        >
          <div className="flex h-full flex-col bg-gradient-to-b from-slate-50 to-white">
            <div className="flex items-end justify-between border-b border-slate-200 px-3 py-3">
              {!desktopCollapsed && (
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200">
                    <FontAwesomeIcon icon={faSliders} className="text-sm" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">Filters</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => setDesktopCollapsed((prev) => !prev)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
                aria-label={desktopCollapsed ? "Expand filters" : "Collapse filters"}
              >
                <FontAwesomeIcon
                  icon={desktopCollapsed ? faChevronRight : faChevronRight}
                  className={clsx("text-xs", !desktopCollapsed && "rotate-180")}
                />
              </button>
            </div>

            <SortAndFilter
              collapsed={desktopCollapsed}
              onToggleCollapse={() => setDesktopCollapsed((prev) => !prev)}
            />
          </div>
        </aside>

        <main className="grid grid-rows-[auto_1fr] overflow-y-auto px-3 py-10 sm:px-4 lg:px-6">
          <div className="mb-4">
            <h2 className="mb-1 text-xl font-semibold text-slate-800">Search Results</h2>
            <p className="text-sm text-slate-600">Find the best bus options for your journey</p>
          </div>

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

