import React from 'react';
import heroImage from '../assets/Rectangle 1312.png';

const Hero = () => {
    return (
        <div className="relative h-[600px] flex flex-col justify-center items-center overflow-hidden pt-20 pb-20">
            <img src={heroImage} alt="Hero" className="absolute w-full h-full object-cover z-0" />
            <div className="absolute w-full h-full bg-black opacity-50 z-10"></div>
            <div className="relative z-20 text-center">
                <h1 className="text-5xl mb-10 mt-10 font-semibold text-white">Bienvenido a BlogWhatEver</h1>
                <p className="text-white">Sitio web creado para crear tu propio blog y comentar sobre otros</p>
            </div>
        </div>
    );
}

export default Hero;
