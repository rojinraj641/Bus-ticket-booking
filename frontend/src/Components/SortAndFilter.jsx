import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faClock,
  faFilter,
  faSnowflake,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleFilter } from "../Features/Search/filterSlice.js";
import clsx from "clsx";

const FILTER_GROUPS = [
  {
    title: "Departure Time",
    type: "departureTime",
    icon: faClock,
    options: ["Before 6am", "6am to 12pm", "12pm to 6pm", "After 6pm"],
  },
  {
    title: "Bus Type",
    type: "busType",
    icon: faBus,
    options: ["Seater", "Sleeper", "Hybrid", "AC", "Non AC"],
  },
  {
    title: "Arrival Time",
    type: "arrivalTime",
    icon: faClock,
    options: ["Before 6am", "6am to 12pm", "12pm to 6pm", "After 6pm"],
  },
];

const AMENITIES = [
  { label: "Water Bottle", icon: faCheck },
  { label: "Blanket", icon: faSnowflake },
  { label: "Charging Point", icon: faWifi },
  { label: "Bedsheet", icon: faCheck },
];

const SortAndFilter = ({ collapsed = false, onToggleCollapse }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleCheckboxChange = (type, value) => {
    dispatch(
      toggleFilter({
        filterKey: type,
        value,
      })
    );
  };

  const FilterCheckbox = ({ id, label, checked, onChange, color = "blue" }) => (
    <label
      htmlFor={id}
      className="group flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 transition hover:border-blue-200 hover:bg-blue-50/50"
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className={clsx("h-4 w-4 rounded border-slate-300 focus:ring-2 focus:ring-blue-500", {
          "accent-green-600": color === "green",
          "accent-blue-600": color === "blue",
        })}
      />
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </label>
  );

  if (collapsed) {
    return (
        <div className="flex flex-col items-center gap-3 pt-2">
          {FILTER_GROUPS.map((group, idx) => (
            <div
              key={group.type}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm"
              title={group.title}
              onClick={() => onToggleCollapse(false)}
            >
              <FontAwesomeIcon icon={group.icon} className="text-base text-blue-600" />
            </div>
          ))}
        </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-white via-slate-50 to-white p-4 md:p-5">
      <div className="flex-1 space-y-5 overflow-y-auto pr-1">
        {FILTER_GROUPS.map((group, idx) => (
          <div key={group.type} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <FontAwesomeIcon icon={group.icon} className="text-xs" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-600">
                {group.title}
              </h3>
            </div>

            <div className="flex flex-col gap-2">
              {group.options.map((option, i) => {
                const id = `${group.type}-${i}`;
                return (
                  <FilterCheckbox
                    key={id}
                    id={id}
                    label={option}
                    checked={filters[group.type]?.includes(option)}
                    onChange={() => handleCheckboxChange(group.type, option)}
                  />
                );
              })}
            </div>
          </div>
        ))}

        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <FontAwesomeIcon icon={faCheck} className="text-xs" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-600">
              Amenities
            </h3>
          </div>

          <div className="flex flex-col gap-2">
            {AMENITIES.map((amenity, i) => {
              const id = `amenity-${i}`;
              return (
                <FilterCheckbox
                  key={id}
                  id={id}
                  label={amenity.label}
                  checked={filters.amenities?.includes(amenity.label)}
                  onChange={() => handleCheckboxChange("amenities", amenity.label)}
                  color="green"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortAndFilter;
