import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFilter } from "../Features/Search/filterSlice.js";
import clsx from "clsx";

const FILTER_GROUPS = [
  {
    title: "DEPARTURE TIME",
    type: "departureTime",
    options: ["Before 6am", "6am to 12pm", "12pm to 6pm", "After 6pm"],
  },
  {
    title: "BUS TYPE",
    type: "busType",
    options: ["Seater", "Sleeper","Hybrid","AC","Non AC"],
  },
  {
    title: "ARRIVAL TIME",
    type: "arrivalTime",
    options: ["Before 6am", "6am to 12pm", "12pm to 6pm", "After 6pm"],
  },
  
];

const AMENITIES = ["Water Bottle", "Blanket", "Charging Point", "Bedsheet"];

const SortAndFilter = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const filters = useSelector((state) => state.filters);

  const handleCheckboxChange = (type, value) => {
    dispatch(
      toggleFilter({
        filterKey: type,
        value: value
      })
    );
  };

  const FilterCheckbox = ({
    id,
    label,
    checked,
    onChange,
    color = "blue",
  }) => (
    <label htmlFor={id} className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className={clsx("accent-blue-600", {
          "accent-green-600": color === "green",
        })}
      />
      <span className="text-sm">{label}</span>
    </label>
  );

  return (
    <>
        <div className="p-4">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h2 className="text-lg font-bold">FILTERS</h2>
            <button onClick={() => setOpen(false)} className="text-xl">
              ✕
            </button>
          </div>

          {/* DESKTOP HEADER */}
          <h2 className="hidden md:block text-lg font-bold mb-4">FILTERS</h2>

          <div className="flex flex-col gap-2">
            {FILTER_GROUPS.map((group, idx) => (
              <div key={idx}>
                {group.title &&
                <h3 className="text-sm font-semibold mb-2">{group.title}</h3>}
                <div className="flex flex-col gap-2">
                  {group.options.map((option, i) => {
                    const id = `${group.type}-${i}`;
                    return (
                      <FilterCheckbox
                        key={id}
                        id={id}
                        label={option}
                        checked={filters[group.type]?.includes(option)}
                        onChange={() =>
                          handleCheckboxChange(group.type, option)
                        }
                      />
                    );
                  })}
                </div>
              </div>
            ))}

            {/* AMENITIES */}
            <div>
              <h3 className="text-sm font-semibold mb-2">AMENITIES</h3>
              <div className="flex flex-col gap-2">
                {AMENITIES.map((amenity, i) => {
                  const id = `amenity-${i}`;
                  return (
                    <FilterCheckbox
                      key={id}
                      id={id}
                      label={amenity}
                      checked={filters.amenities?.includes(amenity)}
                      onChange={() =>
                        handleCheckboxChange("amenities", amenity)
                      }
                      color="green"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default SortAndFilter;
