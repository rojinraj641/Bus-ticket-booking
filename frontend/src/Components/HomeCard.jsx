import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';

const HomeCard = () => {
    // Create a Cloudinary instance 
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dkvrddf9n'
        }
    });
    // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
    const myImage = cld.image('mahadev-ittina-0FXjIXhHSkA-unsplash_ifhrvt');

    return (
        <div className='transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110'>
            <AdvancedImage className="h-48 w-64 rounded-t-lg object-cover object-center" cldImg={myImage} />
            <div className='bg-red-500 rounded-b-lg p-2 text-white' >
                <p className='font-bold'>Buses From</p>
                <p>Kochi To Coimbatore</p>
            </div>
        </div>
    )
}

export default HomeCard