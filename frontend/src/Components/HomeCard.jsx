import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';

const HomeCard = ({ routeFrom = "Kochi", routeTo = "Coimbatore", imgId = 'mahadev-ittina-0FXjIXhHSkA-unsplash_ifhrvt' }) => {
    // Cloudinary instance
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dkvrddf9n'
        }
    });

    // Image object
    const myImage = cld.image(imgId);

    return (
        <div className="w-64 sm:w-72 md:w-80 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 shadow-lg rounded-lg overflow-hidden">
            <AdvancedImage
                className="h-48 sm:h-56 w-full object-cover object-center"
                cldImg={myImage}
                alt="Bus Route Image"
            />
            <div className="bg-sky-800 p-3 text-white">
                <p className="font-bold text-sm sm:text-base">Buses From</p>
                <p className="text-sm sm:text-base">{routeFrom} To {routeTo}</p>
            </div>
        </div>
    );
}

export default HomeCard;
