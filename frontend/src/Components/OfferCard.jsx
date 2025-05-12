import React from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';

const OfferCard = () => {
    // Cloudinary setup
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dkvrddf9n'
        }
    });

    const myImage = cld.image('cpq9d50oik6fcrdynzs3');

    return (
        <div className="w-full max-w-xs sm:max-w-sm transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
            {/* Image */}
            <AdvancedImage
                className="h-40 sm:h-48 w-full rounded-t-lg object-cover object-center"
                cldImg={myImage}
            />

            {/* Content Box */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-2 sm:gap-0 border border-gray-200 shadow-md rounded-b-lg p-4 bg-white">
                <p className="text-md pt-1 font-semibold text-gray-700 text-center sm:text-left leading-snug">
                    Get 20% discount on first booking
                </p>
                <button className="text-sm font-semibold border-2 border-red-500 px-3 py-1 rounded-md text-red-500 hover:bg-red-500 hover:text-white transition">
                    Copy Code
                </button>
            </div>
        </div>
    );
};

export default OfferCard;
