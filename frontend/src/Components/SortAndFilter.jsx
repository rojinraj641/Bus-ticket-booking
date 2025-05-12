import React from 'react'

const SortAndFilter = () => {
    const filterGroups = [
        {
            title: "DEPARTURE TIME",
            options: ["Before 6am", "6am to 12pm", "12pm to 6pm", "After 6pm"]
        },
        {
            title: "BUS TYPE",
            options: ["Seater", "Sleeper", "AC", "Non AC"]
        },
        {
            title: "ARRIVAL TIME",
            options: ["Before 6am", "6am to 12pm", "12pm to 6pm", "After 6pm"]
        },
    ];

    const amenities = ["Water Bottle", "Blanket", "Charging Point", "Bedsheet"];

    return (
        <aside className="w-full sm:w-72 md:w-64 lg:w-60 p-5 bg-gray-50 border-r shadow-md">
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
                                        <input type="checkbox" id={id} className="accent-blue-600" />
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
                                    <input type="checkbox" id={id} className="accent-green-600" />
                                    <span className="text-sm">{amenity}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SortAndFilter;
