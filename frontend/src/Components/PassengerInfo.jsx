import Select from "react-dropdown-select";
import { useState,useEffect } from "react";
import { addPassenger } from "../Features/Passengers/passengerSlice.js";
import { useDispatch } from "react-redux";
import { Toaster, toast} from 'sonner';

const PassengerInfo = ({ index, seat }) => {
  const [place, setPlace] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const dispatch = useDispatch();
  
  const handleSave = () => {
    try{
      dispatch(addPassenger({
        name: name,
        place: place?place.place: '',
        age: age,
        gender: gender
      }))
      toast.success('Passenger added successfully')
    }
    catch(error){
      console.log(error)
    }
  };

  const options = [
    { id: 1, place: "Kerala" },
    { id: 2, place: "TamilNadu" },
    { id: 3, place: "Karnataka" },
    { id: 4, place: "Goa" },
    { id: 5, place: "Maharashtra" },
  ];

  const isValid = name && age && gender && place;

  return (
    <div className="w-full mx-auto border rounded-xl p-6 mt-6 bg-white shadow-md">
      <Toaster richColors/>
      <h2 className="font-semibold text-xl text-gray-800 mb-4">
        Passenger {index + 1}{" "}
        <span className="text-sm text-gray-500">| Seat {seat}</span>
      </h2>

      <div className="space-y-6">
        {/* Name & Age */}
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-col w-full sm:w-2/3">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
            />
          </div>

          <div className="flex flex-col w-full sm:w-1/3">
            <label htmlFor="age" className="text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter age"
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <div className="flex flex-wrap gap-6">
            {["Male", "Female", "Other"].map((g) => (
              <label
                key={g}
                className="flex items-center gap-2 text-gray-700 cursor-pointer"
              >
                <input
                  type="radio"
                  name={`gender-${index}`}
                  value={g}
                  checked={gender === g}
                  onChange={(e) => setGender(e.target.value)}
                  className="accent-blue-600"
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        {/* State */}
        <div className="w-full sm:w-2/3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <Select
            options={options}
            labelField="place"
            valueField="id"
            values={place ? [place] : []}
            onChange={(selected) => setPlace(selected[0])}
            className="border border-gray-300 rounded-md shadow-sm"
            dropdownHandle={true}
            searchable={true}
            placeholder="Select state"
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={!isValid}
        className={`mt-4 px-4 py-2 rounded-md text-white ${
          isValid
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Save
      </button>
    </div>
  );
};

export default PassengerInfo;
