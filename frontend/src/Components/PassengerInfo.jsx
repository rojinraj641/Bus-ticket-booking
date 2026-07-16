import Select from "react-dropdown-select";
import { useState } from "react";
import {upsertPassenger} from "../Features/Passengers/passengerSlice.js"
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast} from 'sonner';
import { State } from "country-state-city"

const PassengerInfo = ({ index, seatNumber, seatId}) => {
  const states =  State.getStatesOfCountry("IN");
  const stateOptions = states.map((s) => ({
    label: s.name,
    value: s.name
  }));

  const [place, setPlace] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const dispatch = useDispatch();
  
  const handleSave = (seatId) => {
    try{
      dispatch(upsertPassenger({seatId, name, age, gender, place}))
      toast.success('Passenger added successfully')
    }
    catch(error){
      console.log(error)
    }
  };


  const isValid = name && age && gender && place;

  return (
    <div className="w-full mx-auto border rounded-xl p-6 mt-6 bg-white shadow-md">
      <Toaster richColors/>
      <h2 className="font-semibold text-xl text-gray-800 mb-4">
        Passenger {index + 1}{" "}
        <span className="text-sm text-gray-500">| Seat {seatNumber}</span>
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
            options={stateOptions}
             labelField="label"
             valueField="value"
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
        onClick={()=>handleSave(seatId)}
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
