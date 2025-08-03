import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {setDepartureTime,setArrivalTime,setBusType,setAmenities} from '../Features/Search/filterSlice.js';
import { setBusList, removeBusList } from '../Features/Search/busSlice.js';
import buildQueryParams from '../utils/buildQueryParams.js';
import clsx from 'clsx';

const FILTER_GROUPS = [
  {
    title: 'DEPARTURE TIME',
    type: 'departureTime',
    options: ['Before 6am', '6am to 12pm', '12pm to 6pm', 'After 6pm']
  },
  {
    title: 'BUS TYPE',
    type: 'busType',
    options: ['Seater', 'Sleeper', 'AC', 'Non AC']
  },
  {
    title: 'ARRIVAL TIME',
    type: 'arrivalTime',
    options: ['Before 6am', '6am to 12pm', '12pm to 6pm', 'After 6pm']
  }
];

const AMENITIES = ['Water Bottle', 'Blanket', 'Charging Point', 'Bedsheet'];

const SortAndFilter = () => {
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.filters);
  const boarding = useSelector((state) => state.search.boarding);
  const destination = useSelector((state) => state.search.destination);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(removeBusList());
        const query = buildQueryParams(filters);
        console.log(query);
        const date = new Date().toISOString().split('T')[0];
        const res = await axios.get(
          `/api/v1/filtered?boarding=${boarding}&destination=${destination}&date=${date}&${query}`
        );
        const { busList } = res.data.data;
        dispatch(setBusList(busList));
      } catch (error) {
        console.error('Fetch Error:', error.message);
      }
    };

    if (boarding && destination) fetchData();
  }, [filters, boarding, destination, dispatch]);

  const handleCheckboxChange = (type, value) => {
    const current = filters[type];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
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

  const FilterCheckbox = ({ id, label, checked, onChange, color = 'blue' }) => (
    <label htmlFor={id} className="inline-flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className={clsx('accent-blue-600', {
          'accent-green-600': color === 'green'
        })}
      />
      <span className="text-sm">{label}</span>
    </label>
  );

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-bold mb-4">FILTERS</h2>
      <div className="flex flex-col gap-6">
        {FILTER_GROUPS.map((group, idx) => (
          <div key={idx}>
            <h3 className="text-sm font-semibold mb-2">{group.title}</h3>
            <div className="flex flex-col gap-2">
              {group.options.map((option, i) => {
                const id = `${group.type}-${i}`;
                return (
                  <FilterCheckbox
                    key={id}
                    id={id}
                    label={option}
                    checked={filters[group.type].includes(option)}
                    onChange={() => handleCheckboxChange(group.type, option)}
                  />
                );
              })}
            </div>
          </div>
        ))}

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
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => handleCheckboxChange('amenities', amenity)}
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
