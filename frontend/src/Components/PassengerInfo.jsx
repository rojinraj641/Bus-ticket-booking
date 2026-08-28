import Select from "react-dropdown-select";
import { useState } from "react";
import { upsertPassenger } from "../Features/Passengers/passengerSlice.js"
import { useDispatch } from "react-redux";
import { setToast } from "../Features/Error/toastSlice.js";
import { State } from "country-state-city"
import { User, Hash, Users, MapPin, Save } from "lucide-react"

const PassengerInfo = ({ index, seatNumber, seatId }) => {
  const states = State.getStatesOfCountry("IN");
  const stateOptions = states.map((s) => ({
    label: s.name,
    value: s.name
  }));
  const [saved, setSaved] = useState(false);

  const [place, setPlace] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const dispatch = useDispatch();

  const handleAgeChange = (value) => {
    if (value === "") {
      setAge("");
      return;
    }

    const num = Number(value);
    if (Number.isNaN(num)) return;

    const clamped = Math.min(100, Math.max(1, num));
    setAge(clamped);
  };

  const handleAgeBlur = () => {
    if (age === "") return; // let your form validation handle empty required fields
    const num = Number(age);
    const clamped = Math.min(100, Math.max(1, isNaN(num) ? 1 : num));
    setAge(clamped);
  };

  const handleSave = (seatId) => {
    try {
      dispatch(upsertPassenger({ seatId, name, age, gender, place }))
      dispatch(setToast({ message: "Passenger added successfully", success: true }));
      setSaved(true);
    } catch (error) {
      dispatch(setToast({ message: error.message, success: false }));
    }
  };

  const isValid = name && age && gender && place;

  const genderOptions = ["Male", "Female", "Other"];

  return (
    <div className="w-full mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-lg text-white">
              Passenger {index + 1}
            </h2>
            <p className="text-xs text-blue-100">Enter your details below</p>
          </div>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm">
          <span className="text-sm font-bold text-white">Seat {seatNumber}</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
              <User className="w-4 h-4 text-[#2563EB]" />
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSaved(false)
              }}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label htmlFor="age" className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
              <Hash className="w-4 h-4 text-[#2563EB]" />
              Age
            </label>
            <input
              id="age"
              type="number"
              value={age}
              min={1}
              max={100}
              onChange={(e) => {
                handleAgeChange(e.target.value);
                setSaved(false)
              }}
              onBlur={handleAgeBlur}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="Age"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-3">
            <Users className="w-4 h-4 text-[#2563EB]" />
            Gender
          </label>
          <div className="flex flex-wrap gap-3">
            {genderOptions.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => {
                  setGender(g);
                  setSaved(false)
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${gender === g
                  ? "border-[#2563EB] bg-blue-50 text-[#2563EB] shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
              >
                <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${gender === g ? "border-[#2563EB]" : "border-slate-300"
                  }`}>
                  {gender === g && (
                    <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                  )}
                </span>
                {g}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
            <MapPin className="w-4 h-4 text-[#2563EB]" />
            State
          </label>
          <Select
            options={stateOptions}
            labelField="label"
            valueField="value"
            values={place ? [place] : []}
            onChange={(selected) => {
              setPlace(selected[0]);
              setSaved(false)
            }}
            className="border border-slate-200 rounded-xl shadow-sm bg-white"
            dropdownHandle={true}
            searchable={true}
            placeholder="Select state"
          />
        </div>

        <button
          onClick={() => handleSave(seatId)}
          disabled={!isValid}
          className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 ${isValid
            ? "bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:shadow-[0_8px_25px_rgba(37,99,235,0.35)] hover:scale-[1.01]"
            : "bg-slate-300 cursor-not-allowed"
            }`}
        >
          <Save className="w-4 h-4" />
          {saved?"Saved":"Save Passenger"}
        </button>
      </div>
    </div>
  );
};

export default PassengerInfo;
