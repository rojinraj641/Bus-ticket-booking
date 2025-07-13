import { useDispatch, useSelector } from 'react-redux';
import {
  setDepartureTime,
  setArrivalTime,
  setBusType,
  setAmenities
} from '../Features/Search/filterSlice.js';

const SortAndFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  console.log(filters);

  // Generic handler for all checkbox changes
  const handleCheckboxChange = (type, value) => {
    const current = filters[type];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];

    switch (type) {
      case 'departureTime':
        dispatch(setDepartureTime(updated));
        break;
      case 'arrivalTime':
        dispatch(setArrivalTime(updated));
        break;
      case 'busType':
        dispatch(setBusType(updated));
        break;
      case 'amenities':
        dispatch(setAmenities(updated));
        break;
      default:
        break;
    }
  };

  const filterGroups = [
    {
      title: "DEPARTURE TIME",
      type: "departureTime",
      options: ["Before 6am", "6am to 12pm", "12pm to 6pm", "After 6pm"]
    },
    {
      title: "BUS TYPE",
      type: "busType",
      options: ["Seater", "Sleeper", "AC", "Non AC"]
    },
    {
      title: "ARRIVAL TIME",
      type: "arrivalTime",
      options: ["Before 6am", "6am to 12pm", "12pm to 6pm", "After 6pm"]
    },
  ];

  const amenities = ["Water Bottle", "Blanket", "Charging Point", "Bedsheet"];

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-bold mb-4">FILTERS</h2>
      <div className="flex flex-col gap-6">
        {filterGroups.map((group, idx) => (
          <div key={idx}>
            <h3 className="text-sm font-semibold mb-2">{group.title}</h3>
            <div className="flex flex-col gap-2">
              {group.options.map((option, i) => {
                const id = `${group.title}-${i}`;
                return (
                  <label key={id} htmlFor={id} className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={id}
                      checked={filters[group.type].includes(option)}
                      onChange={() => handleCheckboxChange(group.type, option)}
                      className="accent-blue-600"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        <div>
          <h3 className="text-sm font-semibold mb-2">AMENITIES</h3>
          <div className="flex flex-col gap-2">
            {amenities.map((amenity, i) => {
              const id = `amenity-${i}`;
              return (
                <label key={id} htmlFor={id} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={id}
                    checked={filters.amenities.includes(amenity)}
                    onChange={() => handleCheckboxChange("amenities", amenity)}
                    className="accent-green-600"
                  />
                  <span className="text-sm">{amenity}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortAndFilter;