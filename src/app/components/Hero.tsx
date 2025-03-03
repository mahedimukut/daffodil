import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center py-24 text-center leading-snug md:px-16">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/home-daffodil.jpg")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-70"></div>
      </div>

      {/* Text and Content */}
      <MaxWidthWrapper>
        <div className="text-white relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight flex flex-col gap-2 tracking-wide">
            <span>Your Trusted Partner for</span>
            <span>HMO Solutions</span>
          </h1>
          <p className="mt-6 text-lg tracking-wide max-w-3xl mx-auto font-inter font-light">
            At Daffodil HMO Solutions, we specialize in comprehensive property
            management services tailored for HMO landlords and supported living
            businesses.
          </p>
        </div>

        <div className="flex gap-6 items-center justify-center mt-14 relative z-10">
          <button className="bg-daffodilYellow py-3 px-6 rounded-lg text-base md:text-lg font-semibold hover:bg-softGreen transition-all duration-300">
            <Link href={"/available-rooms"}>Find Available Rooms</Link>
          </button>
          <button className="bg-charcoalGray text-white py-3 px-6 rounded-lg text-base md:text-lg font-semibold hover:bg-softGreen hover:text-charcoalGray transition-all duration-300">
            <Link href={"/our-services"}>Our Service</Link>
          </button>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Hero;
