import Select from "react-dropdown-select";
import { useState } from 'react';

const PassengerInfo = () => {
    const [place, setPlace] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');

    const options = [
        { id: 1, place: 'Kerala' },
        { id: 2, place: 'TamilNadu' },
        { id: 3, place: 'Karnataka' },
        { id: 4, place: 'Goa' },
        { id: 5, place: 'Maharashtra' }
    ];

    return (
        <div className="w-full border rounded-md p-5 mt-5">
            <p className="font-semibold">Passenger 1 | Seat L4</p>
            <div className="flex flex-col pt-7 gap-4">
                {/* Name & Age */}
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex flex-col w-full md:w-1/2">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border rounded-md mt-2 p-1"
                            placeholder="Enter name"
                        />
                    </div>
                    <div className="flex flex-col w-full md:w-1/4">
                        <label htmlFor="age">Age</label>
                        <input
                            id="age"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="border rounded-md mt-2 p-1"
                            placeholder="Enter age"
                        />
                    </div>
                </div>

                {/* Gender */}
                <div>
                    <p className="pb-2">Gender</p>
                    <div className="flex gap-5">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={gender === "Male"}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            Male
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={gender === "Female"}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            Female
                        </label>
                    </div>
                </div>

                {/* State */}
                <div>
                    <p className="pb-2">State</p>
                    <Select
                        options={options}
                        labelField="place"
                        valueField="id"
                        values={place ? [place] : []}
                        onChange={(selected) => setPlace(selected[0])}
                        className="border rounded-lg max-w-64"
                    />
                </div>
            </div>
        </div>
    );
};

export default PassengerInfo;
